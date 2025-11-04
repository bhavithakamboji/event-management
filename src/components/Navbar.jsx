import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">EventEase</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>Services</li>
        <li>Bookings</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
