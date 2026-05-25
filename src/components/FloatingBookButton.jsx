import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function FloatingBookButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="floating-book-btn-wrapper"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1.1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      style={{
        position: 'absolute',
        bottom: isMobile ? '2rem' : '3.5rem',
        right: isMobile ? '50%' : '7.8rem',
        marginRight: isMobile ? '-32px' : '0',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* Pulse effect */}
      <motion.div
        className="floating-book-pulse"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50px',
          background: 'rgba(var(--primary-gold-rgb), 0.4)',
          zIndex: -1,
        }}
      />

      <motion.button
        className="floating-book-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Scroll to contact section
          const el = document.getElementById('contact');
          if (el) {
            window.scrollTo({
              top: el.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isHovered ? '0.75rem' : '0',
          background: 'rgba(var(--bg-black-rgb), 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(var(--primary-gold-rgb), 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(var(--primary-gold-rgb), 0.2)',
          borderRadius: '50px',
          height: '64px',
          width: isHovered ? 'auto' : '64px',
          padding: isHovered ? '0 1.5rem' : '0',
          color: 'var(--primary-gold)',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Calendar size={24} style={{ flexShrink: 0 }} />
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 'auto', opacity: 1, marginLeft: '0.2rem' }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-cream)',
                whiteSpace: 'nowrap',
              }}
            >
              Book Now
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
