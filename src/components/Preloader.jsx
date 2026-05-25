import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Spoon SVG ── */
const SpoonSVG = ({ uid, mirrored, type, utensil = 'spoon' }) => {
  const isGold = type === 'gold';
  const isSpork = utensil === 'spork';
  const isFork = utensil === 'fork';
  return (
    <svg
      width="70" height="240" viewBox="0 0 70 240"
      style={{ transform: mirrored ? 'scaleX(-1)' : 'none', overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {isSpork && (
          <mask id={`spork-mask-${uid}`}>
            {/* White base to keep the whole handle and outer area */}
            <rect x="-30" y="-30" width="130" height="300" fill="#ffffff" />
            
            {/* Left outer cut to straighten the outer edge */}
            <path
              d="M 0 10 L 19 10 L 14 50 L 0 50 Z"
              fill="#000000"
            />
            {/* Right outer cut to straighten the outer edge */}
            <path
              d="M 70 10 L 51 10 L 56 50 L 70 50 Z"
              fill="#000000"
            />
            
            {/* Center slot cutout */}
            <path
              d="M 31 10 L 33.75 48 Q 35 54, 36.25 48 L 39 10 Z"
              fill="#000000"
            />
            {/* Left slot cutout */}
            <path
              d="M 21 10 L 23.75 45 Q 25 51, 26.25 45 L 29 10 Z"
              fill="#000000"
            />
            {/* Right slot cutout */}
            <path
              d="M 41 10 L 43.75 45 Q 45 51, 46.25 45 L 49 10 Z"
              fill="#000000"
            />
          </mask>
        )}
        {isGold ? (
          <>
            <linearGradient id={`mg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#503f13" />
              <stop offset="15%"  stopColor="#b39036" />
              <stop offset="35%"  stopColor="#f3d078" />
              <stop offset="50%"  stopColor="#fffae6" />
              <stop offset="65%"  stopColor="#f3d078" />
              <stop offset="85%"  stopColor="#b39036" />
              <stop offset="100%" stopColor="#503f13" />
            </linearGradient>
            <radialGradient id={`bg-${uid}`} cx="38%" cy="32%" r="62%" fx="30%" fy="25%">
              <stop offset="0%"   stopColor="#fffae6" stopOpacity="1" />
              <stop offset="35%"  stopColor="#f3d078" stopOpacity="0.95" />
              <stop offset="70%"  stopColor="#b39036" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#503f13" stopOpacity="1" />
            </radialGradient>
            <filter id={`sf-${uid}`}>
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(212,175,55,0.4)" />
            </filter>
          </>
        ) : (
          <>
            <linearGradient id={`mg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#262626" />
              <stop offset="15%"  stopColor="#737373" />
              <stop offset="30%"  stopColor="#dddddd" />
              <stop offset="50%"  stopColor="#ffffff" />
              <stop offset="70%"  stopColor="#e5e5e5" />
              <stop offset="85%"  stopColor="#8a8a8a" />
              <stop offset="100%" stopColor="#262626" />
            </linearGradient>
            <radialGradient id={`bg-${uid}`} cx="38%" cy="32%" r="62%" fx="30%" fy="25%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%"  stopColor="#e8e8e8" stopOpacity="0.95" />
              <stop offset="70%"  stopColor="#a3a3a3" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#404040" stopOpacity="1" />
            </radialGradient>
            <filter id={`sf-${uid}`}>
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(255,255,255,0.22)" />
            </filter>
          </>
        )}
        <filter id={`gf-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Glow aura around head */}
      <ellipse cx="35" cy="45" rx={isFork ? 22 : 26} ry={isFork ? 30 : 32} fill={isGold ? "rgba(212,175,55,0.18)" : "rgba(255,255,255,0.08)"} />

      {isFork ? (
        <g>
          {/* Elegant Fork Head */}
          <path
            d="M 33 74 C 23 74, 15 65, 15 50 L 18.5 15 L 20.5 15 L 23.5 48 C 24 51, 26 51, 26.5 48 L 28.5 15 L 30.5 15 L 33.5 49 C 34 52, 36 52, 36.5 49 L 38.5 15 L 40.5 15 L 43.5 48 C 44 51, 46 51, 46.5 48 L 48.5 15 L 50.5 15 L 54 50 C 54 65, 46 74, 37 74 Z"
            fill={`url(#bg-${uid})`}
            filter={`url(#sf-${uid})`}
          />

          {/* Fork Rim highlight line (inner reflection) */}
          <path
            d="M 33 70 C 23 70, 17 60, 17 48 L 19 16"
            stroke={isGold ? "rgba(255,245,210,0.6)" : "rgba(255,255,255,0.45)"}
            strokeWidth="1.2"
            fill="none"
          />

          {/* Tine specular highlights */}
          <path d="M 19 25 L 19 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M 29 25 L 29 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M 39 25 L 39 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M 49 25 L 49 16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        </g>
      ) : (
        /* Bowl Group (masked if spork) */
        <g mask={isSpork ? `url(#spork-mask-${uid})` : undefined}>
          {/* Elegant Teardrop Bowl */}
          <path
            d="M 35 15 C 21 15, 13 28, 13 46 C 13 65, 23 75, 35 75 C 47 75, 57 65, 57 46 C 57 28, 49 15, 35 15 Z"
            fill={`url(#bg-${uid})`}
            filter={`url(#sf-${uid})`}
          />

          {/* Bowl Rim highlight line (inner reflection) */}
          <path
            d="M 35 20 C 24 20, 17 30, 17 46 C 17 60, 25 69, 35 69"
            stroke={isGold ? "rgba(255,245,210,0.6)" : "rgba(255,255,255,0.45)"}
            strokeWidth="1.2"
            fill="none"
          />

          {/* Bowl primary specular highlight */}
          <ellipse cx="25" cy="34" rx="8" ry="12" fill="rgba(255,255,255,0.5)" transform="rotate(-12,25,34)" />
          {/* Bowl specular dot */}
          <ellipse cx="21" cy="28" rx="3" ry="4.5" fill="rgba(255,255,255,0.85)" transform="rotate(-12,21,28)" />
        </g>
      )}

      {/* Slender Tapered Neck */}
      <path
        d="M 31 74 Q 35 88 33 102 L 37 102 Q 35 88 39 74 Z"
        fill={`url(#mg-${uid})`}
      />

      {/* Slender Handle Shaft */}
      <path
        d="M 33 102 L 33 190 L 37 190 L 37 102 Z"
        fill={`url(#mg-${uid})`}
      />

      {/* Slender Shaft Highlight Line */}
      <path
        d="M 35 102 L 35 190"
        stroke={isGold ? "rgba(255,245,210,0.7)" : "rgba(255,255,255,0.65)"}
        strokeWidth="1.2"
        fill="none"
      />

      {/* Ornate Base / Finial */}
      <path
        d="M 33 190 Q 25 210 25 224 C 25 234, 30 239, 35 239 C 40 239, 45 234, 45 224 Q 45 210 37 190 Z"
        fill={`url(#mg-${uid})`}
        filter={`url(#gf-${uid})`}
      />

      {/* Ornate Base Highlight Outline */}
      <path
        d="M 35 195 Q 28 212 28 224 C 28 230, 31 234, 35 234 C 39 234, 42 230, 42 224 Q 42 212 35 195 Z"
        stroke={isGold ? "rgba(255,245,210,0.6)" : "rgba(255,255,255,0.5)"}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

/* ── Chef Hat SVG ── */
const ChefHatSVG = () => (
  <svg
    width="160"
    height="160"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    <defs>
      <linearGradient id="hat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#f7f7f7" />
        <stop offset="100%" stopColor="#e2e2e2" />
      </linearGradient>
      <linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c5a03d" />
        <stop offset="50%" stopColor="#f3d078" />
        <stop offset="100%" stopColor="#966d12" />
      </linearGradient>
      <filter id="hat-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.4)" />
      </filter>
    </defs>
    {/* Crown (Bulbous top) */}
    <path
      d="M 25 65 
         C 12 65, 5 48, 14 36 
         C 8 22, 23 8, 38 16 
         C 48 2, 70 5, 75 20 
         C 88 15, 96 30, 88 43 
         C 93 56, 82 65, 75 65 
         Z"
      fill="url(#hat-grad)"
      filter="url(#hat-shadow)"
    />
    {/* Crown creases/lines */}
    <path d="M 38 20 C 36 34, 38 48, 42 61" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 52 22 C 52 36, 50 50, 49 61" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 66 22 C 67 34, 64 48, 58 61" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" strokeLinecap="round" />

    {/* Base Band */}
    <path
      d="M 24 63 
         C 24 61, 76 61, 76 63 
         L 73 80 
         C 73 82, 27 82, 27 80 
         Z"
      fill="url(#hat-grad)"
      filter="url(#hat-shadow)"
    />
    {/* Gold trim line on band */}
    <path
      d="M 27 75 Q 50 77, 73 75"
      stroke="url(#gold-trim)"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Particle canvas hook ── */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const ctx = canvas.getContext('2d');

    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8 + 0.2,
      vy: -(Math.random() * 0.35 + 0.1),
      vx: (Math.random() - 0.5) * 0.25,
      base: Math.random() * 0.45 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.phase += 0.018;
        const op = p.base * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${op})`;
        ctx.fill();
        p.y += p.vy; p.x += p.vx;
        if (p.y < -5) { p.y = window.innerHeight + 5; p.x = Math.random() * window.innerWidth; }
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
}

/* ══════════════════════════════════════
   Main Preloader Component
   ══════════════════════════════════════ */
export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('hat-enter'); // hat-enter | utensils-enter | split | hat-disappear | reveal
  const canvasRef = useRef(null);
  useParticles(canvasRef);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('utensils-enter'), 1500),
      setTimeout(() => setPhase('split'),          3300),
      setTimeout(() => setPhase('hat-disappear'),   4800),
      setTimeout(() => setPhase('reveal'),         5800),
      setTimeout(() => onComplete(),                7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  /* ── Per-phase animations ── */
  const chefHatAnim = {
    'hat-enter': {
      x: '-50%',
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 80 }
    },
    'utensils-enter': {
      x: '-50%',
      y: 0,
      opacity: 1,
      scale: 1
    },
    'split': {
      x: '-50%',
      y: 0,
      opacity: 1,
      scale: 1
    },
    'hat-disappear': {
      x: '-50%',
      y: -20,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    'reveal': {
      x: '-50%',
      y: -20,
      opacity: 0,
      scale: 0.85
    }
  };

  const spoon1Anim = {
    'hat-enter': {
      opacity: 0,
      x: 0,
      y: 350,
      rotate: 0,
      scale: 0.9,
    },
    'utensils-enter': {
      opacity: 1,
      x: -45,
      y: 70,
      rotate: -30,
      scale: 0.9,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 70,
      }
    },
    'split': {
      opacity: 1,
      x: -240,
      y: 70,
      rotate: 0,
      scale: 0.9,
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    'hat-disappear': {
      opacity: 1,
      x: -240,
      y: 70,
      rotate: 0,
      scale: 0.9,
    },
    'reveal': {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  };

  const spoon2Anim = {
    'hat-enter': {
      opacity: 0,
      x: 0,
      y: 350,
      rotate: 0,
      scale: 0.9,
    },
    'utensils-enter': {
      opacity: 1,
      x: 45,
      y: 70,
      rotate: 30,
      scale: 0.9,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 70,
      }
    },
    'split': {
      opacity: 1,
      x: 240,
      y: 70,
      rotate: 0,
      scale: 0.9,
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1]
      }
    },
    'hat-disappear': {
      opacity: 1,
      x: 240,
      y: 70,
      rotate: 0,
      scale: 0.9,
    },
    'reveal': {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  };

  const glowRingAnim = {
    'hat-enter': { opacity: 0, scale: 0.6 },
    'utensils-enter': { opacity: 0.25, scale: 1, transition: { duration: 1.5 } },
    'split': { opacity: 0.15, scale: 1.3, transition: { duration: 1.5 } },
    'hat-disappear': { opacity: 0.05, scale: 1.3, transition: { duration: 0.8 } },
    'reveal': { opacity: 0, scale: 1.3, transition: { duration: 0.8 } }
  };

  return (
    <motion.div
      className="preloader-root"
      animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
      transition={phase === 'reveal' ? { duration: 1.2, ease: 'easeInOut' } : {}}
      style={{ pointerEvents: phase === 'reveal' ? 'none' : 'all' }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="preloader-canvas" />

      {/* Cinematic top/bottom bars */}
      <div className="preloader-bar-top" />
      <div className="preloader-bar-bottom" />

      {/* Central radial light */}
      <div className="preloader-radial-light" />

      {/* Vertical beam */}
      <div className="preloader-beam" />

      {/* ── Stage: Spoons ── */}
      <div className="preloader-stage">

        {/* Glow ring behind spoons */}
        <motion.div
          className="spoon-glow-ring"
          animate={glowRingAnim[phase]}
        />

        {/* Spoon 1 (left - Gold) */}
        <motion.div
          className="spoon-wrapper"
          initial={{ opacity: 0, x: 0, y: 350, rotate: 0, scale: 0.9 }}
          animate={spoon1Anim[phase]}
        >
          <SpoonSVG uid="s1" type="gold" utensil="fork" mirrored={false} />
        </motion.div>

        {/* Spoon 2 (right - Silver) */}
        <motion.div
          className="spoon-wrapper"
          initial={{ opacity: 0, x: 0, y: 350, rotate: 0, scale: 0.9 }}
          animate={spoon2Anim[phase]}
        >
          <SpoonSVG uid="s2" type="silver" mirrored={true} />
        </motion.div>

        {/* Chef Hat */}
        <motion.div
          className="chef-hat-wrapper"
          initial={{ x: '-50%', y: '-100vh', opacity: 0, scale: 0.7 }}
          animate={chefHatAnim[phase]}
        >
          <ChefHatSVG />
        </motion.div>
      </div>

      {/* Loading bar */}
      <div className="preloader-loading-bar-track">
        <motion.div
          className="preloader-loading-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
