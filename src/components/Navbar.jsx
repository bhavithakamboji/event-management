import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleServicesClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const eventTypesSection = document.getElementById("event-types");
        if (eventTypesSection) {
          eventTypesSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const eventTypesSection = document.getElementById("event-types");
      if (eventTypesSection) {
        eventTypesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={handleHomeClick}>EventEase</h1>
      <ul className="nav-links">
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleServicesClick}>Services</li>
        <li>Bookings</li>
        <li onClick={handleContactClick}>Contact</li>
      </ul>
    </nav>
  );
}
