import React from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Booking() {
  const navigate = useNavigate();

  const eventTypes = [
    {
      id: "wedding",
      title: "Wedding",
      icon: "",
      description: "Plan your dream wedding celebration",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "birthday",
      title: "Birthday",
      icon: "",
      description: "Celebrate special moments with style",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "festivals",
      title: "Festivals",
      icon: "",
      description: "Vibrant festivals and cultural celebrations",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "corporate",
      title: "Corporate",
      icon: "",
      description: "Professional corporate events and meetings",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleEventSelect = (eventType) => {
    navigate(`/booking/${eventType}`);
  };

  return (
    <div className="booking-selection-page">
      <div className="booking-selection-container">
        <h1 className="booking-main-title">Plan Your Event</h1>
        <p className="booking-subtitle">Select the type of event you'd like to plan</p>
        <div className="event-types-grid">
          {eventTypes.map((event) => (
            <div
              key={event.id}
              className="event-type-card"
              onClick={() => handleEventSelect(event.id)}
            >
              <div className="event-type-image-wrapper">
                <img
                  src={event.image}
                  alt={event.title}
                  className="event-type-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
                  }}
                />
                <div className="event-type-overlay"></div>
              </div>
              <div className="event-type-content">
                {event.icon && <div className="event-icon">{event.icon}</div>}
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <button className="select-event-btn">Select Event</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
