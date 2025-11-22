package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    // Event Details
    private String eventType;
    private Integer totalAttendees;
    private Integer cateringAttendees;
    private String eventDate;
    private String eventTime;
    private String location;
    private String duration;

    // Budget Planning
    private Double budgetMin;
    private Double budgetMax;

    // Menu Selection (stored as JSON string)
    @Column(columnDefinition = "TEXT")
    private String selectedMenuItems;

    // Services (stored as JSON string)
    @Column(columnDefinition = "TEXT")
    private String services;

    // Contact Information
    private String contactName;
    private String contactEmail;
    private String contactPhone;

    // Special Requirements
    @Column(columnDefinition = "TEXT")
    private String specialRequirements;

    // Pricing Information (stored as JSON string)
    @Column(columnDefinition = "TEXT")
    private String pricing;

    // Booking Metadata
    private String bookingId;
    private Double totalPrice;
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    
    public Integer getTotalAttendees() { return totalAttendees; }
    public void setTotalAttendees(Integer totalAttendees) { this.totalAttendees = totalAttendees; }
    
    public Integer getCateringAttendees() { return cateringAttendees; }
    public void setCateringAttendees(Integer cateringAttendees) { this.cateringAttendees = cateringAttendees; }
    
    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
    
    public String getEventTime() { return eventTime; }
    public void setEventTime(String eventTime) { this.eventTime = eventTime; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
    
    public Double getBudgetMin() { return budgetMin; }
    public void setBudgetMin(Double budgetMin) { this.budgetMin = budgetMin; }
    
    public Double getBudgetMax() { return budgetMax; }
    public void setBudgetMax(Double budgetMax) { this.budgetMax = budgetMax; }
    
    public String getSelectedMenuItems() { return selectedMenuItems; }
    public void setSelectedMenuItems(String selectedMenuItems) { this.selectedMenuItems = selectedMenuItems; }
    
    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
    
    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }
    
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    
    public String getSpecialRequirements() { return specialRequirements; }
    public void setSpecialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; }
    
    public String getPricing() { return pricing; }
    public void setPricing(String pricing) { this.pricing = pricing; }
    
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }
    
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
