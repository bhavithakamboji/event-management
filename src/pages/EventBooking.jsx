import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/config";
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
    budgetMin: "",
    budgetMax: "",
    selectedMenuItems: [],
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate budget range
    if (parseFloat(formData.budgetMax) <= parseFloat(formData.budgetMin)) {
      alert("Maximum budget must be greater than minimum budget!");
      return;
    }

    // Recalculate pricing with latest form data
    const currentPricing = calculateTotalAmount();

    const bookingId = `BK-${Date.now()}`;
    const bookingData = {
      ...formData,
      totalAttendees: Number(formData.totalAttendees),
      cateringAttendees: Number(formData.cateringAttendees),
      budgetMin: formData.budgetMin ? Number(formData.budgetMin) : null,
      budgetMax: formData.budgetMax ? Number(formData.budgetMax) : null,
      selectedMenuItems: formData.selectedMenuItems,
      services: formData.services,
      bookingId,
      createdAt: new Date().toISOString(),
      pricing: currentPricing
    };

    setIsSubmitting(true);

    try {
      console.log("Submitting booking to:", "http://localhost:8080/api/bookings");
      console.log("Booking data:", bookingData);
      
      const response = await api.post("/api/bookings", bookingData);
      const createdBooking = response?.data;
      const responseBookingId = createdBooking?.bookingId || bookingId;

      alert(`Booking submitted successfully! Your booking ID is: ${responseBookingId}`);
      navigate("/");
    } catch (error) {
      console.error("Error submitting booking:", error);
      console.error("Error details:", {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        code: error?.code
      });
      
      let errorMessage = "Failed to submit booking. ";
      
      if (error?.code === 'ERR_NETWORK' || error?.message?.includes('Network Error')) {
        errorMessage += "Network Error: Cannot connect to the server. Please ensure:\n";
        errorMessage += "1. Backend server is running on http://localhost:8080\n";
        errorMessage += "2. MySQL database is running\n";
        errorMessage += "3. Check browser console for more details";
      } else if (error?.response) {
        // Server responded with error
        errorMessage = error?.response?.data?.message || 
                      error?.response?.data?.error ||
                      `Server error (${error?.response?.status}): ${error?.response?.statusText}`;
      } else {
        errorMessage += error?.message || "Unknown error occurred";
      }
      
      setSubmitError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Menu tiers based on budget range
  const getMenuTier = () => {
    const avgBudget = (parseFloat(formData.budgetMin || 0) + parseFloat(formData.budgetMax || 0)) / 2;
    if (avgBudget <= 500000) return 'basic';
    if (avgBudget <= 1000000) return 'standard';
    if (avgBudget <= 2000000) return 'premium';
    return 'luxury';
  };

  const menuTiers = {
    basic: {
      name: "Basic Menu",
      description: "Delicious and satisfying options for budget-friendly events",
      items: [
        { id: 1, name: "Vegetable Biryani", category: "Main Course", type: "veg" },
        { id: 2, name: "Chicken Curry", category: "Main Course", type: "non-veg" },
        { id: 3, name: "Dal Tadka", category: "Main Course", type: "veg" },
        { id: 4, name: "Jeera Rice", category: "Rice", type: "veg" },
        { id: 5, name: "Roti/Naan", category: "Bread", type: "veg" },
        { id: 6, name: "Mixed Vegetable", category: "Main Course", type: "veg" },
        { id: 7, name: "Raita", category: "Side Dish", type: "veg" },
        { id: 8, name: "Pickle", category: "Side Dish", type: "veg" },
        { id: 9, name: "Gulab Jamun", category: "Dessert", type: "veg" },
        { id: 10, name: "Fresh Salad", category: "Salad", type: "veg" }
      ]
    },
    standard: {
      name: "Standard Menu",
      description: "A well-balanced selection with variety and quality",
      items: [
        { id: 1, name: "Paneer Butter Masala", category: "Main Course", type: "veg" },
        { id: 2, name: "Chicken Biryani", category: "Main Course", type: "non-veg" },
        { id: 3, name: "Dal Makhani", category: "Main Course", type: "veg" },
        { id: 4, name: "Mutton Curry", category: "Main Course", type: "non-veg" },
        { id: 5, name: "Aloo Gobi", category: "Main Course", type: "veg" },
        { id: 6, name: "Basmati Rice", category: "Rice", type: "veg" },
        { id: 7, name: "Butter Naan", category: "Bread", type: "veg" },
        { id: 8, name: "Tandoori Roti", category: "Bread", type: "veg" },
        { id: 9, name: "Raita & Papad", category: "Side Dish", type: "veg" },
        { id: 10, name: "Mix Pickle", category: "Side Dish", type: "veg" },
        { id: 11, name: "Gulab Jamun", category: "Dessert", type: "veg" },
        { id: 12, name: "Ice Cream", category: "Dessert", type: "veg" },
        { id: 13, name: "Fresh Salad", category: "Salad", type: "veg" },
        { id: 14, name: "Soup (Veg/Non-Veg)", category: "Starter", type: "both" },
        { id: 15, name: "Fried Rice", category: "Rice", type: "veg" }
      ]
    },
    premium: {
      name: "Premium Menu",
      description: "Gourmet selections with premium ingredients and flavors",
      items: [
        { id: 1, name: "Paneer Tikka Masala", category: "Main Course", type: "veg" },
        { id: 2, name: "Hyderabadi Biryani", category: "Main Course", type: "non-veg" },
        { id: 3, name: "Dal Makhani", category: "Main Course", type: "veg" },
        { id: 4, name: "Butter Chicken", category: "Main Course", type: "non-veg" },
        { id: 5, name: "Mutton Rogan Josh", category: "Main Course", type: "non-veg" },
        { id: 6, name: "Malai Kofta", category: "Main Course", type: "veg" },
        { id: 7, name: "Kadai Paneer", category: "Main Course", type: "veg" },
        { id: 8, name: "Saffron Basmati Rice", category: "Rice", type: "veg" },
        { id: 9, name: "Garlic Naan", category: "Bread", type: "veg" },
        { id: 10, name: "Laccha Paratha", category: "Bread", type: "veg" },
        { id: 11, name: "Tandoori Roti", category: "Bread", type: "veg" },
        { id: 12, name: "Biryani Raita", category: "Side Dish", type: "veg" },
        { id: 13, name: "Mix Pickle & Chutney", category: "Side Dish", type: "veg" },
        { id: 14, name: "Papad & Salad", category: "Side Dish", type: "veg" },
        { id: 15, name: "Gulab Jamun", category: "Dessert", type: "veg" },
        { id: 16, name: "Kheer", category: "Dessert", type: "veg" },
        { id: 17, name: "Ice Cream (Multiple Flavors)", category: "Dessert", type: "veg" },
        { id: 18, name: "Fresh Fruit Salad", category: "Salad", type: "veg" },
        { id: 19, name: "Soup (Veg/Non-Veg)", category: "Starter", type: "both" },
        { id: 20, name: "Spring Rolls", category: "Starter", type: "veg" }
      ]
    },
    luxury: {
      name: "Luxury Menu",
      description: "Exquisite culinary experience with finest ingredients and presentation",
      items: [
        { id: 1, name: "Paneer Tikka Masala", category: "Main Course", type: "veg" },
        { id: 2, name: "Awadhi Biryani", category: "Main Course", type: "non-veg" },
        { id: 3, name: "Dal Makhani", category: "Main Course", type: "veg" },
        { id: 4, name: "Butter Chicken", category: "Main Course", type: "non-veg" },
        { id: 5, name: "Mutton Rogan Josh", category: "Main Course", type: "non-veg" },
        { id: 6, name: "Malai Kofta", category: "Main Course", type: "veg" },
        { id: 7, name: "Kadai Paneer", category: "Main Course", type: "veg" },
        { id: 8, name: "Shahi Paneer", category: "Main Course", type: "veg" },
        { id: 9, name: "Chicken Tikka Masala", category: "Main Course", type: "non-veg" },
        { id: 10, name: "Fish Curry", category: "Main Course", type: "non-veg" },
        { id: 11, name: "Saffron Basmati Rice", category: "Rice", type: "veg" },
        { id: 12, name: "Jeera Rice", category: "Rice", type: "veg" },
        { id: 13, name: "Garlic Naan", category: "Bread", type: "veg" },
        { id: 14, name: "Butter Naan", category: "Bread", type: "veg" },
        { id: 15, name: "Laccha Paratha", category: "Bread", type: "veg" },
        { id: 16, name: "Tandoori Roti", category: "Bread", type: "veg" },
        { id: 17, name: "Biryani Raita", category: "Side Dish", type: "veg" },
        { id: 18, name: "Mix Pickle & Chutney", category: "Side Dish", type: "veg" },
        { id: 19, name: "Papad & Salad", category: "Side Dish", type: "veg" },
        { id: 20, name: "Gulab Jamun", category: "Dessert", type: "veg" },
        { id: 21, name: "Kheer", category: "Dessert", type: "veg" },
        { id: 22, name: "Rasmalai", category: "Dessert", type: "veg" },
        { id: 23, name: "Ice Cream (Premium Flavors)", category: "Dessert", type: "veg" },
        { id: 24, name: "Fresh Fruit Salad", category: "Salad", type: "veg" },
        { id: 25, name: "Soup (Veg/Non-Veg)", category: "Starter", type: "both" },
        { id: 26, name: "Spring Rolls", category: "Starter", type: "veg" },
        { id: 27, name: "Chicken Wings", category: "Starter", type: "non-veg" }
      ]
    }
  };

  const currentMenuTier = getMenuTier();
  const currentMenu = menuTiers[currentMenuTier];

  const handleMenuToggle = (itemId) => {
    setFormData({
      ...formData,
      selectedMenuItems: formData.selectedMenuItems.includes(itemId)
        ? formData.selectedMenuItems.filter(id => id !== itemId)
        : [...formData.selectedMenuItems, itemId]
    });
  };

  // Pricing structure
  const servicePricing = {
    catering: { base: 5000, perPerson: 200 },
    decoration: { base: 15000, perPerson: 50 },
    photography: { base: 20000, perEvent: true },
    videography: { base: 25000, perEvent: true },
    music: { base: 10000, perEvent: true },
    lighting: { base: 12000, perEvent: true },
    transportation: { base: 8000, perPerson: 100 },
    accommodation: { base: 0, perPerson: 1500 }
  };

  // Menu pricing based on tier
  const menuItemPricing = {
    basic: 150,      // per person per item
    standard: 250,
    premium: 400,
    luxury: 600
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    let total = 0;
    const attendees = parseFloat(formData.totalAttendees || 0);
    const cateringAttendees = parseFloat(formData.cateringAttendees || attendees);
    const duration = formData.duration;

    // Calculate individual service costs
    const individualServiceCosts = {};
    let serviceCost = 0;

    Object.entries(formData.services).forEach(([service, isSelected]) => {
      if (isSelected && servicePricing[service]) {
        const pricing = servicePricing[service];
        let cost = 0;
        if (pricing.perEvent) {
          // Fixed price per event
          cost = pricing.base;
        } else {
          // Price based on attendees
          const personCount = service === 'catering' ? cateringAttendees : attendees;
          cost = pricing.base + (pricing.perPerson * personCount);
        }
        individualServiceCosts[service] = cost;
        serviceCost += cost;
      }
    });

    // Calculate menu costs
    const menuCost = formData.selectedMenuItems.length > 0 && cateringAttendees > 0
      ? formData.selectedMenuItems.length * menuItemPricing[getMenuTier()] * cateringAttendees
      : 0;

    // Duration multiplier
    let durationMultiplier = 1;
    if (duration === 'full-day') durationMultiplier = 1.5;
    if (duration === 'multi-day') durationMultiplier = 2;
    if (duration && !isNaN(parseFloat(duration))) {
      durationMultiplier = 1 + (parseFloat(duration) / 8) * 0.3; // 30% increase per 8 hours
    }

    // Apply duration multiplier to services (not menu)
    const adjustedServiceCost = serviceCost * durationMultiplier;
    total = adjustedServiceCost + menuCost;

    // Add GST (18%)
    const gst = total * 0.18;
    const finalTotal = total + gst;

    return {
      individualServiceCosts: individualServiceCosts,
      serviceCost: serviceCost,
      adjustedServiceCost: adjustedServiceCost,
      menuCost: menuCost,
      durationMultiplier: durationMultiplier,
      subtotal: total,
      gst: gst,
      total: finalTotal
    };
  };

  const pricingBreakdown = calculateTotalAmount();

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

            {/* Budget Planning Section */}
            <div className="budget-section">
              <h3 className="budget-title">Budget Planning</h3>
              <p className="budget-description">
                Specify your budget range to help us recommend the best services for your event
              </p>
              <div className="budget-range-container">
                <div className="form-group budget-input-group">
                  <label>Minimum Budget (₹) *</label>
                  <input
                    type="number"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    min="0"
                    step="1000"
                    required
                    className="budget-input"
                  />
                </div>
                <div className="budget-separator">
                  <span>to</span>
                </div>
                <div className="form-group budget-input-group">
                  <label>Maximum Budget (₹) *</label>
                  <input
                    type="number"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    placeholder="e.g. 200000"
                    min="0"
                    step="1000"
                    required
                    className="budget-input"
                  />
                </div>
              </div>
              {formData.budgetMin && formData.budgetMax && !isNaN(formData.budgetMin) && !isNaN(formData.budgetMax) && (
                <div className="budget-summary">
                  <span className="budget-label">Your Budget Range:</span>
                  <span className="budget-value">
                    ₹{parseInt(formData.budgetMin).toLocaleString('en-IN')} - ₹{parseInt(formData.budgetMax).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Menu Selection Section */}
          {formData.budgetMin && formData.budgetMax && !isNaN(formData.budgetMin) && !isNaN(formData.budgetMax) && (
            <div className="form-section">
              <h2 className="section-title">Menu Selection</h2>
              <div className="menu-tier-info">
                <div className="menu-tier-badge">
                  <span className="tier-name">{currentMenu.name}</span>
                  <span className="tier-description">{currentMenu.description}</span>
                </div>
                <p className="menu-instruction">
                  Select your preferred food items from the menu below. You can choose multiple items.
                </p>
              </div>
              
              <div className="menu-items-container">
                {Object.entries(
                  currentMenu.items.reduce((acc, item) => {
                    if (!acc[item.category]) {
                      acc[item.category] = [];
                    }
                    acc[item.category].push(item);
                    return acc;
                  }, {})
                ).map(([category, items]) => (
                  <div key={category} className="menu-category">
                    <h3 className="menu-category-title">{category}</h3>
                    <div className="menu-items-grid">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`menu-item ${formData.selectedMenuItems.includes(item.id) ? 'selected' : ''}`}
                          onClick={() => handleMenuToggle(item.id)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.selectedMenuItems.includes(item.id)}
                            onChange={() => handleMenuToggle(item.id)}
                            className="menu-checkbox"
                          />
                          <div className="menu-item-content">
                            <span className="menu-item-name">{item.name}</span>
                            <span className={`menu-item-type ${item.type === 'veg' ? 'veg' : item.type === 'non-veg' ? 'non-veg' : 'both'}`}>
                              {item.type === 'veg' ? '🟢 Veg' : item.type === 'non-veg' ? '🔴 Non-Veg' : '🟡 Both'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {formData.selectedMenuItems.length > 0 && (
                <div className="menu-selection-summary">
                  <span className="summary-label">Selected Items:</span>
                  <span className="summary-count">{formData.selectedMenuItems.length} item(s)</span>
                </div>
              )}
            </div>
          )}

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

          {/* Pricing Summary Section */}
          <div className="form-section pricing-section">
            <h2 className="section-title">Event Cost Summary</h2>
            <div className="pricing-container">
              <div className="pricing-breakdown">
                {/* Individual Service Costs */}
                {Object.keys(pricingBreakdown.individualServiceCosts || {}).length > 0 && (
                  <>
                    <div className="pricing-section-header">
                      <span className="pricing-label">Additional Services</span>
                    </div>
                    {Object.entries(pricingBreakdown.individualServiceCosts).map(([service, cost]) => {
                      const serviceOption = serviceOptions.find(s => s.key === service);
                      const baseCost = cost;
                      const adjustedCost = cost * pricingBreakdown.durationMultiplier;
                      return (
                        <div key={service} className="pricing-row pricing-service-item">
                          <span className="pricing-label">
                            {serviceOption?.icon} {serviceOption?.label || service}
                            {pricingBreakdown.durationMultiplier > 1 && (
                              <span className="pricing-note"> (Base: ₹{baseCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })})</span>
                            )}
                          </span>
                          <span className="pricing-value">
                            ₹{adjustedCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* Duration Multiplier Info */}
                {pricingBreakdown.durationMultiplier > 1 && (
                  <div className="pricing-row pricing-info">
                    <span className="pricing-label">
                      Duration Adjustment ({formData.duration === 'full-day' ? 'Full Day' : formData.duration === 'multi-day' ? 'Multi-Day' : `${formData.duration} hours`})
                    </span>
                    <span className="pricing-value">
                      {(pricingBreakdown.durationMultiplier * 100 - 100).toFixed(0)}% extra on services
                    </span>
                  </div>
                )}

                {/* Menu Cost */}
                {pricingBreakdown.menuCost > 0 && (
                  <div className="pricing-row">
                    <span className="pricing-label">
                      Menu Cost ({formData.selectedMenuItems.length} items × {formData.cateringAttendees || formData.totalAttendees || 0} people)
                    </span>
                    <span className="pricing-value">
                      ₹{pricingBreakdown.menuCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                )}

                {/* Subtotal */}
                <div className="pricing-row pricing-subtotal">
                  <span className="pricing-label">Subtotal</span>
                  <span className="pricing-value">
                    ₹{pricingBreakdown.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {/* GST */}
                <div className="pricing-row pricing-gst">
                  <span className="pricing-label">GST (18%)</span>
                  <span className="pricing-value">
                    ₹{pricingBreakdown.gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {/* Total */}
                <div className="pricing-row pricing-total">
                  <span className="pricing-label">Total Amount</span>
                  <span className="pricing-value pricing-total-amount">
                    ₹{pricingBreakdown.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Budget Comparison */}
              {formData.budgetMin && formData.budgetMax && !isNaN(formData.budgetMin) && !isNaN(formData.budgetMax) && (
                <div className="budget-comparison">
                  <div className="comparison-header">
                    <span>Budget Range</span>
                    <span>₹{parseInt(formData.budgetMin).toLocaleString('en-IN')} - ₹{parseInt(formData.budgetMax).toLocaleString('en-IN')}</span>
                  </div>
                  {pricingBreakdown.total > parseFloat(formData.budgetMax) ? (
                    <div className="budget-warning">
                      ⚠️ Total exceeds maximum budget by ₹{(pricingBreakdown.total - parseFloat(formData.budgetMax)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  ) : pricingBreakdown.total < parseFloat(formData.budgetMin) ? (
                    <div className="budget-info">
                      ✓ Total is below minimum budget. You can add more services or menu items.
                    </div>
                  ) : (
                    <div className="budget-success">
                      ✓ Total is within your budget range!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {submitError && (
            <div className="submit-error-message">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/booking")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}





