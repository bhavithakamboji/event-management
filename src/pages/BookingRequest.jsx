import React, { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import "./BookingRequest.css"; // This line links the external CSS file

export default function BookingRequest() {
  const [form, setForm] = useState({
    eventType: "",
    guests: "",
    date: "",
    location: "",
    services: [],
    // User Info fields
    fullName: "", 
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleServiceSelect = (service) => {
    const selected = form.services.includes(service)
      ? form.services.filter((s) => s !== service)
      : [...form.services, service];
    setForm({ ...form, services: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to your backend
      await axios.post("http://localhost:8080/api/bookings", form);
      alert("Booking Request Submitted Successfully! We will contact you soon.");
      
      // Clear form fields on successful submission
      setForm({
          eventType: "", guests: "", date: "", location: "", services: [],
          fullName: "", email: "", phone: "" 
      });

    } catch (err) {
      console.error("Booking submission error:", err);
      // Enhanced error message for the user
      alert("Booking Failed! There was an issue connecting to the server or processing your request.");
    }
  };

  return (
    <>
      <Navbar /> 
      
      <div className="booking-request-container">
        <div className="booking-form-card">
          <h2><span role="img" aria-label="calendar">🗓️</span> Request a Custom Event Booking</h2>
          <form onSubmit={handleSubmit}>
            
            {/* --- Event Details Section --- */}
            <div className="form-section">
              <h3>Event Details</h3>
              
              <label>Event Type:</label>
              <select name="eventType" value={form.eventType} onChange={handleChange} required>
                <option value="" disabled>Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Festival">Festival</option>
                <option value="Other">Other</option>
              </select>

              <label>Number of Guests:</label>
              <input
                type="number"
                name="guests"
                value={form.guests}
                placeholder="e.g. 50"
                onChange={handleChange}
                min="1"
                required
              />

              <label>Date:</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />

              <label>Location / City:</label>
              <input
                type="text"
                name="location"
                value={form.location}
                placeholder="Enter event location or city"
                onChange={handleChange}
                required
              />
            </div>

            {/* --- User Contact Section (Matching Sign Up page fields) --- */}
            <div className="form-section">
                <h3>Contact Information</h3>

                <label>Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    placeholder="Your Full Name"
                    onChange={handleChange}
                    required
                />
                
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Your Email"
                    onChange={handleChange}
                    required
                />
                
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    placeholder="Your Phone Number"
                    onChange={handleChange}
                    required
                />
            </div>

            {/* --- Services Section --- */}
            <div className="form-section service-selection-section">
              <h3>Select Required Services</h3>
              <div className="service-options">
                {["Catering", "Decoration", "Photography", "Music/DJ", "Venue Scouting", "Transport"].map((service) => (
                  <div key={service} className="service-checkbox">
                    <input
                      type="checkbox"
                      id={service}
                      checked={form.services.includes(service)}
                      onChange={() => handleServiceSelect(service)}
                    />
                    <label htmlFor={service}>{service}</label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="submit-button">Send Booking Request</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}