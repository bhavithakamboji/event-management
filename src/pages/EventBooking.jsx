import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventBooking.css";

export default function EventBooking() {
  const navigate = useNavigate();
  const { eventType } = useParams();

  const eventTypeNames = {
    wedding: "Wedding",
    birthday: "Birthday",
    festivals: "Festival",
    corporate: "Corporate Event"
  };

  const [formData, setFormData] = useState({
    eventType: eventTypeNames[eventType] || eventType,
    totalAttendees: "",
    cateringAttendees: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    services: {
      catering: false,
      decoration: false,
      photography: false,
      videography: false,
      music: false,
      lighting: false,
      transportation: false,
      accommodation: false
    },
    specialRequirements: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleServiceChange = (service) => {
    setFormData({
      ...formData,
      services: {
        ...formData.services,
        [service]: !formData.services[service]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store booking data (you can integrate with backend later)
    const bookingData = {
      ...formData,
      bookingId: `BK-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage for now (replace with API call later)
    const existingBookings = JSON.parse(localStorage.getItem('eventBookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('eventBookings', JSON.stringify(existingBookings));
    
    alert(`Booking submitted successfully! Your booking ID is: ${bookingData.bookingId}`);
    navigate("/");
  };

  const serviceOptions = [
    { key: "catering", label: "Catering", icon: "🍽️" },
    { key: "decoration", label: "Decoration", icon: "🎨" },
    { key: "photography", label: "Photography", icon: "📸" },
    { key: "videography", label: "Videography", icon: "🎥" },
    { key: "music", label: "Music & Sound", icon: "🎵" },
    { key: "lighting", label: "Lighting", icon: "💡" },
    { key: "transportation", label: "Transportation", icon: "🚗" },
    { key: "accommodation", label: "Accommodation", icon: "🏨" }
  ];

  return (
    <div className="event-booking-page">
      <div className="event-booking-container">
        <div className="booking-header">
          <button className="back-button" onClick={() => navigate("/booking")}>
            ← Back to Event Selection
          </button>
          <h1>Book Your {eventTypeNames[eventType] || eventType}</h1>
          <p className="booking-description">
            Fill in the details below to plan your perfect event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {/* Event Details Section */}
          <div className="form-section">
            <h2 className="section-title">Event Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Total Number of Attendees *</label>
                <input
                  type="number"
                  name="totalAttendees"
                  value={formData.totalAttendees}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of People for Catering *</label>
                <input
                  type="number"
                  name="cateringAttendees"
                  value={formData.cateringAttendees}
                  onChange={handleChange}
                  placeholder="e.g. 80"
                  min="1"
                  required
                />
                <small className="form-hint">
                  This may be different from total attendees
                </small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>Event Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Event Duration *</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select duration</option>
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="6">6 hours</option>
                  <option value="8">8 hours</option>
                  <option value="full-day">Full Day</option>
                  <option value="multi-day">Multi-Day</option>
                </select>
              </div>

              <div className="form-group">
                <label>Event Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event venue address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="form-section">
            <h2 className="section-title">Additional Services</h2>
            <p className="section-description">
              Select the services you need for your event
            </p>
            <div className="services-grid">
              {serviceOptions.map((service) => (
                <div
                  key={service.key}
                  className={`service-option ${formData.services[service.key] ? 'selected' : ''}`}
                  onClick={() => handleServiceChange(service.key)}
                >
                  <input
                    type="checkbox"
                    checked={formData.services[service.key]}
                    onChange={() => handleServiceChange(service.key)}
                    className="service-checkbox"
                  />
                  <span className="service-icon">{service.icon}</span>
                  <span className="service-label">{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h2 className="section-title">Contact Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Special Requirements Section */}
          <div className="form-section">
            <h2 className="section-title">Special Requirements</h2>
            <div className="form-group">
              <label>Additional Notes or Special Requirements</label>
              <textarea
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                placeholder="Any special requests, dietary restrictions, or additional information..."
                rows="4"
                className="textarea-field"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/booking")}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

