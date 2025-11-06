import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

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

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="logo" onClick={handleHomeClick}>EventEase</h1>
      <ul className="nav-links">
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleServicesClick}>About Us</li>
        <li>Bookings</li>
        <li onClick={handleContactClick}>Contact</li>
        {currentUser ? (
          <>
            <li style={{ cursor: 'default' }}>Hi, {currentUser.name.split(' ')[0]}</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={handleLoginClick}>Login</li>
            <li onClick={handleSignupClick}>Sign Up</li>
          </>
        )}
      </ul>
    </nav>
  );
}
