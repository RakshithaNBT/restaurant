import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';

// Theme Switcher Widget Component
const ThemeSwitcher = ({ currentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'obsidian', name: 'Classic Obsidian', bg: '#0a0604', accent: '#d4af37' },
    { id: 'emerald', name: 'Royal Emerald', bg: '#030a07', accent: '#c5a854' },
    { id: 'sapphire', name: 'Midnight Sapphire', bg: '#030611', accent: '#cbd5e1' },
    { id: 'burgundy', name: 'Velvet Burgundy', bg: '#0e0306', accent: '#dfb3a6' },
    { id: 'amethyst', name: 'Royal Amethyst', bg: '#0a0410', accent: '#e5c158' },
    { id: 'ruby', name: 'Imperial Ruby', bg: '#0f0203', accent: '#d4af37' },
    { id: 'cognac', name: 'Cognac Bronze', bg: '#0f0602', accent: '#f59e0b' },
    { id: 'platinic', name: 'Platinic Ash', bg: '#0f172a', accent: '#cbd5e1' },
    { id: 'alabaster', name: 'Alabaster Gold', bg: '#faf9f6', accent: '#c5a854' },
    { id: 'platinic-white', name: 'Platinic White', bg: '#f8fafc', accent: '#7890af' },
    { id: 'pastel-rose', name: 'Pastel Rose', bg: '#fffafa', accent: '#e05a70' },
    { id: 'pastel-sage', name: 'Pastel Sage', bg: '#fafdfb', accent: '#5f8770' },
    { id: 'pastel-lavender', name: 'Pastel Lavender', bg: '#fafaff', accent: '#8e7aba' },
    { id: 'pastel-peach', name: 'Pastel Peach', bg: '#fffcfb', accent: '#d98a6c' },
  ];

  const current = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <div className="theme-switcher-container" style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-switcher-toggle btn-outline"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          fontSize: '0.75rem',
          borderRadius: '4px',
          borderColor: 'rgba(var(--primary-gold-rgb), 0.3)',
          background: 'rgba(var(--bg-card-rgb), 0.5)',
          cursor: 'pointer',
        }}
        title="Change theme"
      >
        <Palette size={16} style={{ color: 'var(--primary-gold)' }} />
        <span className="theme-switcher-name" style={{ color: 'var(--text-cream)', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
          {current.name.split(' ')[1]}
        </span>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${current.accent} 50%, ${current.bg} 50%)`,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'inline-block'
          }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 998,
              }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '180px',
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '0.5rem',
                borderRadius: '4px',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                border: '1px solid rgba(var(--primary-gold-rgb), 0.2)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    background: currentTheme === theme.id ? 'rgba(var(--primary-gold-rgb), 0.15)' : 'transparent',
                    border: 'none',
                    borderRadius: '2px',
                    color: currentTheme === theme.id ? 'var(--primary-gold)' : 'var(--text-cream-muted)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: currentTheme === theme.id ? '600' : '400',
                    transition: 'all 0.2s ease',
                  }}
                  className="theme-option-btn"
                >
                  <span>{theme.name}</span>
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.accent} 50%, ${theme.bg} 50%)`,
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar({ currentTheme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'menu', 'celebrations', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Celebrations', href: '#celebrations', id: 'celebrations' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // height of navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="logo-link">
          <img src="/images/logo.jpg" alt="The Gilded Fork" className="logo-img" />
        </a>

        {/* Desktop Menu */}
        <nav className="nav-menu-desktop">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section (Desktop) */}
        <div className="nav-right-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
          
          <div className="nav-booking-btn-desktop">
            <a
              href="#celebrations"
              onClick={(e) => handleLinkClick(e, 'celebrations')}
              className="btn-outline"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}
            >
              Book Celebration
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="nav-menu-mobile-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.ul
                className="nav-menu open"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ alignSelf: 'flex-end', padding: '1rem 2rem 0 0' }}>
                  <button
                    className="mobile-nav-toggle"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={28} />
                  </button>
                </div>
                
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.id)}
                      className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                      style={{ fontSize: '1.2rem' }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-cream-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Theme:</span>
                    <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
                  </div>
                  
                  <a
                    href="#celebrations"
                    onClick={(e) => handleLinkClick(e, 'celebrations')}
                    className="btn-gold"
                    style={{ width: '100%', maxWidth: '280px', textAlign: 'center' }}
                  >
                    Book Celebration
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
