import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const contactDetails = [
    {
      id: 'loc',
      icon: <MapPin size={22} />,
      label: 'Locate Us',
      value: 'The Gilded Fork, Near Lalitha Mahal Palace Road, Siddharth Layout, Mysuru, Karnataka 570011'
    },
    {
      id: 'phone',
      icon: <Phone size={22} />,
      label: 'Reservations & Events',
      value: '+91 821 244 9999 \n +91 98860 12345'
    },
    {
      id: 'mail',
      icon: <Mail size={22} />,
      label: 'Write to Us',
      value: 'concierge@thegildedfork.com'
    }
  ];

  const openingHours = [
    { day: 'Monday - Thursday', hours: '12:00 PM - 11:00 PM' },
    { day: 'Friday - Saturday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Sunday & Holidays', hours: '11:30 AM - 12:00 AM' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Message Submitted:', formData);
    setIsSent(true);
  };

  return (
    <section id="contact" className="section contact-section-luxury">
      <div className="ambient-glow" style={{ top: '15%', right: '-10%' }}></div>
      <div className="ambient-glow" style={{ bottom: '10%', left: '-10%' }}></div>
      <div className="warm-light-top"></div>

      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper text-center">
          <span className="section-subtitle">Reach Out</span>
          <h2 className="section-title">Contact & <span className="text-gold">Hours</span></h2>
          <div className="section-title-divider"></div>
        </div>

        <div className="contact-premium-grid">
          {/* Column 1: Info Cards & Opening Hours */}
          <motion.div
            className="contact-details-column"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-cards-container">
              {contactDetails.map((detail) => (
                <motion.div
                  key={detail.id}
                  className="contact-card-premium glass-panel"
                  whileHover={{ y: -5, borderColor: 'var(--primary-gold)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="contact-card-icon-wrapper">
                    {detail.icon}
                  </div>
                  <div className="contact-card-content">
                    <h4 className="contact-card-label">{detail.label}</h4>
                    <p className="contact-card-value" style={{ whiteSpace: 'pre-line' }}>
                      {detail.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Opening Hours Widget */}
            <div className="contact-hours-container-luxury glass-panel">
              <div className="hours-header-luxury">
                <Clock size={20} className="text-gold" />
                <h4>Opening Hours</h4>
              </div>
              <table className="contact-hours-table">
                <tbody>
                  {openingHours.map((row, index) => (
                    <tr key={index} className="contact-hours-row">
                      <td className="contact-hours-day">{row.day}</td>
                      <td className="contact-hours-time">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Column 2: Stylish Contact Form */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="contact-form-card glass-panel">
              <div className="form-warm-glow"></div>
              
              {!isSent ? (
                <form onSubmit={handleSubmit} className="contact-form-flow">
                  <h3 className="contact-form-card-title">Send a Message</h3>
                  <p className="contact-form-card-sub">
                    Drop us a line and our guest relations concierge will get back to you shortly.
                  </p>

                  <div className="contact-field-group">
                    <label className="contact-field-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-field-input"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="contact-row-2col">
                    <div className="contact-field-group">
                      <label className="contact-field-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="contact-field-input"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="contact-field-group">
                      <label className="contact-field-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="contact-field-input"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-field-label">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="contact-field-input"
                      placeholder="e.g. Reservation Query, Feedback"
                    />
                  </div>

                  <div className="contact-field-group">
                    <label className="contact-field-label">Your Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact-field-textarea"
                      placeholder="Write your message here..."
                      rows={4}
                    />
                  </div>

                  <button type="submit" className="btn-gold contact-submit-btn-premium">
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <motion.div
                  className="contact-success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="success-check-icon" size={60} />
                  <h3 className="success-title">Message Sent!</h3>
                  <p className="success-text">
                    Thank you, <strong>{formData.name}</strong>. Your message has been sent successfully. Our guest relations concierge will get back to you at <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="btn-outline"
                    style={{ marginTop: '2rem', padding: '0.75rem 2rem' }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}
