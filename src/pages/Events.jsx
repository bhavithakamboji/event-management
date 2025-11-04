import { Link } from 'react-router-dom'

export default function Events() {
  const events = [
    { 
      id: 1, 
      name: 'Tech Conference', 
      date: '2025-08-15', 
      location: 'Virtual',
      description: 'Join the biggest tech conference of the year with industry leaders and cutting-edge innovations.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 2, 
      name: 'Music Festival', 
      date: '2025-01-20', 
      location: 'Central Park',
      description: 'Experience world-class musical performances in the heart of the city.',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 3, 
      name: 'Fun Fiesta 2.0', 
      date: '2025-02-10', 
      location: 'Convention Center',
      description: 'A day full of exciting activities and entertainment for all ages.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 4, 
      name: 'Birthday Party', 
      date: '2025-04-25', 
      location: 'Star convention',
      description: 'Celebrate in style with gourmet food and premium entertainment.',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 5, 
      name: 'Wedding Party', 
      date: '2025-09-19', 
      location: 'IRA conventions',
      description: 'Elegant wedding celebration with fine dining and dancing.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' 
    }
  ];

  return (
    <div className="events-page">
      <div className="events-container">
       <h1 className="main-heading">Event Management</h1>
      <h2 className="sub-heading">Upcoming Events</h2>
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="event-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x200?text=Event+Image';
                  }}
                />
              </div>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <Link to={`/event/${event.id}`} className="event-button">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}