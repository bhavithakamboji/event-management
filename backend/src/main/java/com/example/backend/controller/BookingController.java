package com.example.backend.controller;

import com.example.backend.model.Booking;
import com.example.backend.model.User;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> bookingData) {
        try {
            Booking booking = new Booking();

            // Event Details
            booking.setEventType((String) bookingData.get("eventType"));
            if (bookingData.get("totalAttendees") != null) {
                booking.setTotalAttendees(Integer.parseInt(bookingData.get("totalAttendees").toString()));
            }
            if (bookingData.get("cateringAttendees") != null) {
                booking.setCateringAttendees(Integer.parseInt(bookingData.get("cateringAttendees").toString()));
            }
            booking.setEventDate((String) bookingData.get("date"));
            booking.setEventTime((String) bookingData.get("time"));
            booking.setLocation((String) bookingData.get("location"));
            booking.setDuration((String) bookingData.get("duration"));

            // Budget Planning
            if (bookingData.get("budgetMin") != null && !bookingData.get("budgetMin").toString().isEmpty()) {
                booking.setBudgetMin(Double.parseDouble(bookingData.get("budgetMin").toString()));
            }
            if (bookingData.get("budgetMax") != null && !bookingData.get("budgetMax").toString().isEmpty()) {
                booking.setBudgetMax(Double.parseDouble(bookingData.get("budgetMax").toString()));
            }

            // Menu Selection (convert array to JSON string)
            if (bookingData.get("selectedMenuItems") != null) {
                booking.setSelectedMenuItems(objectMapper.writeValueAsString(bookingData.get("selectedMenuItems")));
            }

            // Services (convert object to JSON string)
            if (bookingData.get("services") != null) {
                booking.setServices(objectMapper.writeValueAsString(bookingData.get("services")));
            }

            // Contact Information
            booking.setContactName((String) bookingData.get("contactName"));
            booking.setContactEmail((String) bookingData.get("contactEmail"));
            booking.setContactPhone((String) bookingData.get("contactPhone"));

            // Special Requirements
            booking.setSpecialRequirements((String) bookingData.get("specialRequirements"));

            // Pricing Information
            if (bookingData.get("pricing") != null) {
                booking.setPricing(objectMapper.writeValueAsString(bookingData.get("pricing")));
                Map<String, Object> pricing = (Map<String, Object>) bookingData.get("pricing");
                if (pricing.get("total") != null) {
                    booking.setTotalPrice(Double.parseDouble(pricing.get("total").toString()));
                }
            }

            // Booking ID
            if (bookingData.get("bookingId") != null) {
                booking.setBookingId((String) bookingData.get("bookingId"));
            } else {
                booking.setBookingId("BK-" + System.currentTimeMillis());
            }

            // Try to get user from authentication if available
            try {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
                    Optional<User> userOpt = userRepository.findByEmail(authentication.getName());
                    userOpt.ifPresent(booking::setUser);
                }
            } catch (Exception e) {
                // User not authenticated, booking can still be created without user
            }

            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "Error creating booking: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/booking-id/{bookingId}")
    public ResponseEntity<?> getBookingByBookingId(@PathVariable String bookingId) {
        Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);
        return booking.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Booking deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }
}


