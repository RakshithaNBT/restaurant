import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { menuData } from '../data/menuData';

const categories = [
  { id: 'south-indian', name: 'South Indian'        },
  { id: 'north-indian', name: 'North Indian'         },
  { id: 'veg',          name: 'Veg Foods'            },
  { id: 'non-veg',      name: 'Non-Veg Foods'        },
  { id: 'hot-drinks',   name: 'Hot Drinks & Spirits' },
  { id: 'soft-drinks',  name: 'Soft Drinks'          },
  { id: 'mexican',      name: 'Mexican'              },
  { id: 'italian',      name: 'Italian'              },
];

// Each card has its OWN unique entrance animation
const perCardVariants = [
  // Card 0 — slides in from LEFT with a tilt
  {
    hidden:  { opacity: 0, x: -80, y: 20, rotate: -10, scale: 0.85 },
    visible: {
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 16, delay: 0 },
    },
    exit: { opacity: 0, x: -60, rotate: -8, scale: 0.8, transition: { duration: 0.2 } },
  },
  // Card 1 — drops from TOP, big scale pop (like a stamp)
  {
    hidden:  { opacity: 0, y: -70, scale: 1.25, rotate: 4 },
    visible: {
      opacity: 1, y: 0, scale: 1, rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 14, delay: 0.12 },
    },
    exit: { opacity: 0, y: -50, scale: 1.15, rotate: -4, transition: { duration: 0.2 } },
  },
  // Card 2 — slides in from RIGHT with opposite tilt
  {
    hidden:  { opacity: 0, x: 80, y: 20, rotate: 10, scale: 0.85 },
    visible: {
      opacity: 1, x: 0, y: 0, rotate: 0, scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 16, delay: 0.22 },
    },
    exit: { opacity: 0, x: 60, rotate: 8, scale: 0.8, transition: { duration: 0.2 } },
  },
];

// Each image has its own unique entrance too
const perImgVariants = [
  // Card 0 image — zooms in from left-rotated
  {
    hidden:  { scale: 1.4, rotate: -12, opacity: 0, x: -20 },
    visible: { scale: 1, rotate: 0, opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 180, damping: 14, delay: 0.1 } },
  },
  // Card 1 image — flips up from below (scale + y)
  {
    hidden:  { scale: 0.6, y: 30, opacity: 0, rotate: 6 },
    visible: { scale: 1, y: 0, opacity: 1, rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.2 } },
  },
  // Card 2 image — zooms in from right-rotated
  {
    hidden:  { scale: 1.4, rotate: 12, opacity: 0, x: 20 },
    visible: { scale: 1, rotate: 0, opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 180, damping: 14, delay: 0.3 } },
  },
];


export default function Menu() {
  const [activeTab, setActiveTab] = useState('south-indian');
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTab(prev => {
        const idx = categories.findIndex(c => c.id === prev);
        return categories[(idx + 1) % categories.length].id;
      });
    }, 2000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    startTimer(); // reset timer on manual click
  };

  const activeCat   = categories.find(c => c.id === activeTab);
  const activeItems = menuData.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="section menu-section">
      <div className="ambient-glow" style={{ bottom: '15%', left: '-10%' }}></div>
      <div className="ambient-glow" style={{ top: '25%', right: '-10%' }}></div>

      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Exquisite Gastronomy</span>
          <h2 className="section-title">Explore Our <span className="text-gold">Menu</span></h2>
          <div className="section-title-divider"></div>
        </div>

        {/* ── Category Tab Bar ── */}
        <div className="menu-tab-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`menu-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabClick(cat.id)}
            >
              {activeTab === cat.id && (
                <motion.div
                  className="menu-tab-pill"
                  layoutId="tab-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="menu-tab-label">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* ── Active Category Label ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-header'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.35 }}
            className="menu-active-label"
          >
            <h3 className="menu-active-name">{activeCat?.name}</h3>
            <div className="menu-active-line"></div>
          </motion.div>
        </AnimatePresence>

        {/* ── Cards Grid ── */}
        <AnimatePresence mode="wait">
          <div key={activeTab} className="menu-cards-grid">
            {activeItems.map((item, i) => {
              const cv = perCardVariants[i % 3];
              const iv = perImgVariants[i % 3];
              return (
                <motion.div
                  key={item.id}
                  className="menu-card-premium"
                  initial={cv.hidden}
                  animate={cv.visible}
                  exit={cv.exit}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(var(--primary-gold-rgb), 0.2)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  {/* Image — unique entrance per card */}
                  <div className="menu-card-img-wrapper">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="menu-card-img"
                      initial={iv.hidden}
                      animate={iv.visible}
                      whileHover={{ scale: 1.1, rotate: 2, transition: { duration: 0.4 } }}
                    />
                    {item.tag && <span className="menu-card-badge">{item.tag}</span>}
                    <div className="menu-card-img-overlay"></div>
                  </div>

                  {/* Info */}
                  <div className="menu-card-info">
                    <div className="menu-card-header-row">
                      <h4 className="menu-card-title">{item.name}</h4>
                      <div className="menu-card-rating">
                        <Star size={14} className="star-icon" />
                        <span>{item.rating || '4.8'}</span>
                      </div>
                    </div>
                    <p className="menu-card-description">{item.description}</p>
                    <div className="menu-card-footer">
                      <span className="menu-card-price">₹{item.price}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
