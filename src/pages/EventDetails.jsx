// src/pages/EventDetails.jsx
import { Link } from 'react-router-dom';

export default function EventDetails() {
  // Get the event ID from the URL
  const eventId = parseInt(window.location.pathname.split('/')[2]);
  
  // Sample events data (same as in Events.jsx)
  const events = [
    { 
      id: 1, 
      name: 'Tech Conference', 
      date: '2025-08-15', 
      location: 'Virtual',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge technologies.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 2, 
      name: 'Music Festival', 
      date: '2025-01-20', 
      location: 'Central Park',
      description: 'Experience a weekend of amazing music performances from top artists around the world.',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 3, 
      name: 'Fun Fiesta 2.0', 
      date: '2025-02-10', 
      location: 'Convention Center',
      description: 'A day full of fun activities, games, and entertainment for the whole family.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 4, 
      name: 'Birthday Party', 
      date: '2025-04-25', 
      location: 'Star convention',
      description: 'Celebrate a special birthday with great food, music, and entertainment.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 5, 
      name: 'Wedding Party', 
      date: '2025-09-19', 
      location: 'IRA conventions',
      description: 'Join us for a beautiful wedding celebration with dinner and dancing.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    }
  ];

  // Find the event with the matching ID
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return <div className="event-details-container">Event not found</div>;
  }

  return (
    <div className="event-details-container">
      <div className="event-details-card">
        <div className="event-details-image-container">
          <img 
            src={event.image} 
            alt={event.name}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
            }}
          />
        </div>
        <div className="event-details-content">
          <h1>{event.name}</h1>
          <p className="event-date"><strong>Date:</strong> {event.date}</p>
          <p className="event-location"><strong>Location:</strong> {event.location}</p>
          <p className="event-description">{event.description}</p>
          <Link to="/events" className="back-button">Back to Events</Link>
        </div>
      </div>
    </div>
  );
}