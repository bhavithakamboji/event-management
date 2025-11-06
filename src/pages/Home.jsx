import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const eventTypes = [
    {
      id: 1,
      title: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Elegant and romantic wedding celebrations"
    },
    {
      id: 2,
      title: "Birthdays",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Memorable birthday parties for all ages"
    },
    {
      id: 3,
      title: "Corporate",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Professional corporate events and meetings"
    },
    {
      id: 4,
      title: "Festivals",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Vibrant festivals and cultural celebrations"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Plan Your Perfect Event</h1>
          <p className="hero-subtitle">From birthdays to weddings — we've got you covered!</p>
          <button className="hero-button" onClick={() => navigate("/booking")}>
            Start Booking
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-choose-us" className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Expert Planning</h3>
              <p>Professional event planners with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality services and vendors for your event</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick & Easy</h3>
              <p>Simple booking process with instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section id="event-types" className="event-types-section">
        <div className="event-types-container">
          <h2 className="section-title">Event Types</h2>
          <p className="section-subtitle">We specialize in creating unforgettable experiences</p>
          <div className="event-types-grid">
            {eventTypes.map((event) => {
              const eventTypeMap = {
                "Weddings": "wedding",
                "Birthdays": "birthday",
                "Corporate": "corporate",
                "Festivals": "festivals"
              };
              const eventTypeId = eventTypeMap[event.title] || event.title.toLowerCase();
              
              return (
                <div 
                  key={event.id} 
                  className="event-type-card"
                  onClick={() => navigate(`/booking/${eventTypeId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="event-type-image-container">
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
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
