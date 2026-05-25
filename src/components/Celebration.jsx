import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Users, IndianRupee, CheckCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { celebrationPackages } from '../data/menuData';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Celebration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Birthday Party',
    guests: '',
    date: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Booking submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <section id="celebrations" className="section" style={{ background: 'var(--dark-gradient)' }}>
      <div className="ambient-glow" style={{ top: '10%', left: '10%' }}></div>
      <div className="warm-light-top"></div>

      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Exquisite Events</span>
          <h2 className="section-title">Luxury <span className="text-gold">Celebrations</span></h2>
          <div className="section-title-divider"></div>
        </div>

        <div className="celebration-grid">
          {/* Slider Column */}
          <div className="celebration-slider-wrapper">
            {/* Custom Header for Slider */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem' 
              }}
            >
              <h3 className="font-serif text-gold" style={{ fontSize: '1.8rem', letterSpacing: '0.05em' }}>
                Exclusive Packages
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="celebration-prev-btn glass-panel" 
                  style={{ 
                    cursor: 'pointer', 
                    border: '1px solid var(--glass-border)', 
                    color: 'var(--primary-gold)', 
                    background: 'transparent', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'var(--transition-smooth)'
                  }}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="celebration-next-btn glass-panel" 
                  style={{ 
                    cursor: 'pointer', 
                    border: '1px solid var(--glass-border)', 
                    color: 'var(--primary-gold)', 
                    background: 'transparent', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'var(--transition-smooth)'
                  }}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.celebration-prev-btn',
                nextEl: '.celebration-next-btn',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="celebration-swiper"
            >
              {celebrationPackages.map((pkg) => (
                <SwiperSlide key={pkg.id}>
                  <div className="celebration-card-custom">
                    <img src={pkg.image} alt={pkg.title} className="celebration-card-img" />
                    
                    <div className="celebration-card-body">
                      <h3 className="celebration-card-title">{pkg.title}</h3>
                      <p className="celebration-card-desc">{pkg.description}</p>
                      
                      <div className="celebration-card-meta">
                        <div className="celebration-meta-item">
                          <Users size={18} />
                          <span>{pkg.capacity}</span>
                        </div>
                        <div className="celebration-meta-item">
                          <IndianRupee size={18} />
                          <span>{pkg.price}</span>
                        </div>
                      </div>

                      <div className="celebration-features-list">
                        {pkg.features.map((feat, idx) => (
                          <div key={idx} className="celebration-feature-bullet">
                            <Sparkles size={14} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Form Column */}
          <div className="booking-form-wrapper">
            <div className="booking-form-container glass-panel">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="booking-form-title">Plan Your Event</h3>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your contact number"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="eventType">Celebration</label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Anniversary dinner">Anniversary Event</option>
                        <option value="Family Gathering">Family Gathering</option>
                        <option value="Couples Dinner">Couples Dinner</option>
                        <option value="Friends Gathering">Friends Gathering</option>
                        <option value="Other Event">Other Celebration</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="guests">No. of Guests</label>
                      <input
                        type="number"
                        id="guests"
                        name="guests"
                        required
                        min="2"
                        max="200"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g. 25"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="date">Event Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="notes">Special Requirements</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Describe decors, customized catering preferences, acoustic expectations, etc."
                    />
                  </div>

                  <button type="submit" className="btn-gold booking-submit-btn">
                    Submit Proposal
                  </button>
                </form>
              ) : (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="success-icon" size={60} />
                  <h3 className="success-title">Proposal Submitted</h3>
                  <p className="success-text">
                    Thank you, <strong>{formData.name}</strong>. Our luxury events concierge will review your requirements for <strong>{formData.eventType}</strong> on <strong>{formData.date}</strong> and contact you within 24 hours with a custom layout and menu plan.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        eventType: 'Birthday Party',
                        guests: '',
                        date: '',
                        notes: ''
                      });
                    }}
                    className="btn-outline"
                    style={{ marginTop: '2rem', padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
