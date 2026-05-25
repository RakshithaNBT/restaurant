import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingBookButton from './FloatingBookButton';

export default function Hero() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [initialAnimDone, setInitialAnimDone] = useState(false);

  // The video has burned-in decorative text at the beginning and end.
  // Only show our hero text during the clean middle portion.
  // Video is ~10s. Burned-in text occupies roughly first 3.5s and last 3.5s.
  const TEXT_SHOW_START = 3.5;
  const TEXT_SHOW_END_BUFFER = 3.5;

  useEffect(() => {
    // Wait for the initial framer-motion entrance animation to complete
    const timer = setTimeout(() => setInitialAnimDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (video.duration && video.duration > 0) {
        const t = video.currentTime;
        const hideEnd = video.duration - TEXT_SHOW_END_BUFFER;
        setShowText(t >= TEXT_SHOW_START && t <= hideEnd);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleScrollTo = (e, targetId) => {
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

  // After the initial entrance animation is done, we control opacity
  // entirely based on video playback time.
  const textOpacity = initialAnimDone ? (showText ? 1 : 0) : undefined;

  return (
    <section id="home" className="hero" style={{ backgroundImage: `url('/images/hero_bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <source src="/hero_bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" style={{ zIndex: 1 }}></div>
      
      <div
        className="container hero-content"
        style={{
          zIndex: 2,
          opacity: textOpacity,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <motion.span 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Taste Tradition with Luxury
        </motion.span>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          THE GILDED <br />
          <span className="text-gold">FORK</span>
        </motion.h1>
      </div>

      {/* Decorative Warm Light Bottom Transition */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'linear-gradient(to top, var(--bg-black) 0%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      ></div>

      {/* Floating Book Button positioned over the diamond logo */}
      <FloatingBookButton />
    </section>
  );
}
