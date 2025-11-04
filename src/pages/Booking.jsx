import React, { useState } from "react";
import axios from "axios";
import "./Booking.css";

export default function Booking() {
  const [form, setForm] = useState({
    eventType: "",
    guests: "",
    date: "",
    location: "",
    services: [],
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
      await axios.post("http://localhost:8080/api/bookings", form);
      alert("Booking Successful!");
    } catch (err) {
      console.error(err);
      alert("Booking Failed!");
    }
  };

  return (
    <div className="booking-form">
      <h2>Book Your Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Type:</label>
        <select name="eventType" onChange={handleChange}>
          <option value="">Select</option>
          <option value="Birthday">Birthday</option>
          <option value="Wedding">Wedding</option>
          <option value="Corporate">Corporate</option>
        </select>

        <label>Number of Guests:</label>
        <input
          type="number"
          name="guests"
          placeholder="e.g. 50"
          onChange={handleChange}
        />

        <label>Date:</label>
        <input type="date" name="date" onChange={handleChange} />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Enter event location"
          onChange={handleChange}
        />

        <label>Select Services:</label>
        <div className="service-options">
          {["Catering", "Decoration", "Photography", "Music"].map((service) => (
            <div key={service}>
              <input
                type="checkbox"
                id={service}
                onChange={() => handleServiceSelect(service)}
              />
              <label htmlFor={service}>{service}</label>
            </div>
          ))}
        </div>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}
