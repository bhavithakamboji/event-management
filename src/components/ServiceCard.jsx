import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <img src={service.imageUrl} alt={service.name} />
      <h3>{service.name}</h3>
      <p>{service.price} / day</p>
      <button>View Details</button>
    </div>
  );
}
