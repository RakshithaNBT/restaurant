import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Star, Flame, Sparkles } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="section">
      {/* Background elements */}
      <div className="ambient-glow" style={{ top: '20%', left: '-10%' }}></div>
      <div className="warm-light-top"></div>

      <div className="container">
        <div className="about-grid">
          {/* Text Content Column */}
          <motion.div 
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span className="section-subtitle" variants={itemVariants}>
              Our Heritage
            </motion.span>
            
            <motion.h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }} variants={itemVariants}>
              Where Resort Ambience <br />
              <span className="text-gold">Meets Fine Dining</span>
            </motion.h2>

            <motion.p className="about-highlight" variants={itemVariants}>
              "Step into a sanctuary of taste, surrounded by high-vaulted wooden ceilings, lush tropical foliage, and the warm glow of golden lantern lights."
            </motion.p>

            <motion.p className="about-text" variants={itemVariants}>
              At The Gilded Fork, we have reimagined high-end dining. Inspired by the premium resort-style spaces of Mysuru, our open-air wooden pavilion offers an immersive family dining experience. Focused purely on gourmet cuisine, hot premium brews, and unforgettable life celebrations, we welcome you to escape the ordinary.
            </motion.p>

            {/* Feature Highlights Grid */}
            <motion.div className="about-features" variants={itemVariants}>
              <div className="about-feature-item">
                <Utensils className="about-feature-icon" size={20} />
                <span className="about-feature-text">Gourmet Legacy</span>
              </div>
              <div className="about-feature-item">
                <Flame className="about-feature-icon" size={20} />
                <span className="about-feature-text">Resort-Style Pavilions</span>
              </div>
              <div className="about-feature-item">
                <Sparkles className="about-feature-icon" size={20} />
                <span className="about-feature-text">Celebration Hub</span>
              </div>
              <div className="about-feature-item">
                <Star className="about-feature-icon" size={20} />
                <span className="about-feature-text">Golden Ambient Lighting</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a href="#menu" className="btn-gold">Explore Our Menu</a>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-image-container">
              <img 
                src="./images/about_img.png" 
                alt="The Gilded Fork Ambience" 
                className="about-image"
              />
              <div className="about-image-overlay"></div>
              
              {/* Experience Badge */}
              <motion.div 
                className="about-experience-badge"
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.5, stiffness: 100 }}
              >
                <span className="years">15+</span>
                <span className="text">Years of Gastronomy</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
