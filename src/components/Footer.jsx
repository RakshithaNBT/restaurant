import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Compass } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Panel */}
          <div className="footer-logo-panel">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="logo-link" style={{ width: 'fit-content' }}>
              <img src="/images/logo.jpg" alt="The Gilded Fork" className="logo-img" style={{ height: '60px' }} />
            </a>
            <p className="footer-tagline">
              An immersive resort-style dining destination in Mysuru, dedicated to heritage gastronomy, premium hot brews, and elegant celebrations under golden-lit pavilions.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="TripAdvisor">
                <Compass size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-section-title">Navigation</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a>
              </li>
              <li className="footer-link-item">
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
              </li>
              <li className="footer-link-item">
                <a href="#menu" onClick={(e) => handleLinkClick(e, 'menu')}>Our Menu</a>
              </li>
              <li className="footer-link-item">
                <a href="#celebrations" onClick={(e) => handleLinkClick(e, 'celebrations')}>Celebrations</a>
              </li>
              <li className="footer-link-item">
                <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Ambience Gallery</a>
              </li>
              <li className="footer-link-item">
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact & Hours</a>
              </li>
            </ul>
          </div>

          {/* Contact Recap */}
          <div>
            <h4 className="footer-section-title">Contact</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={18} />
                <span>Siddharth Layout, Mysuru, KA 570011</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} />
                <span>+91 821 244 9999</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} />
                <span>concierge@thegildedfork.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter Panel */}
          <div>
            <h4 className="footer-section-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe to receive exclusive invitations to our seasonal food festivals and luxury dining events.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? "Thank you!" : "Your email address"}
                className="footer-newsletter-input"
                disabled={subscribed}
              />
              <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe" disabled={subscribed}>
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)', marginTop: '0.5rem', display: 'block' }}>
                Successfully subscribed! Keep an eye on your inbox.
              </span>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} The Gilded Fork. All Rights Reserved. Designed for Luxury Dining.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
