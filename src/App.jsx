import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Celebration from './components/Celebration';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import FloatingCart from './components/FloatingCart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import './App.css';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('luxury-theme') || 'obsidian';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('luxury-theme', theme);
  }, [theme]);

  return (
    <CartProvider>
      {/* Cinematic Preloader */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Main Site — fades in after preloader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ pointerEvents: preloaderDone ? 'all' : 'none' }}
      >
        {/* Golden Ceiling Warm Light Ambient Overlay */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 100px rgba(var(--accent-orange-rgb), 0.05)',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        />

        <Navbar currentTheme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <About />
          <Menu />
          <Celebration />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />

        {/* Cart & Order System */}
        <CartDrawer />
        <FloatingCart />
        <Checkout />
        <OrderSuccess />
      </motion.div>
    </CartProvider>
  );
}
