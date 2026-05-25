import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { galleryImages } from '../data/menuData';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = ''; // Unlock background scrolling
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="section">
      <div className="ambient-glow" style={{ top: '30%', left: '-15%' }}></div>
      <div className="warm-light-top"></div>

      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Visual Experience</span>
          <h2 className="section-title">Resort <span className="text-gold">Ambience Gallery</span></h2>
          <div className="section-title-divider"></div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
            >
              <img src={image.src} alt={image.title} className="gallery-item-img" />
              
              <div className="gallery-item-overlay">
                <span className="gallery-item-cat">{image.category}</span>
                <h3 className="gallery-item-title">{image.title}</h3>
                <p className="gallery-item-desc">{image.description}</p>
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '1.5rem', 
                    right: '1.5rem', 
                    color: 'var(--primary-gold)',
                    opacity: 0.8
                  }}
                >
                  <Maximize2 size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={36} />
            </button>

            {/* Navigation Buttons */}
            <button className="lightbox-nav-btn prev" onClick={prevImage} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            
            <button className="lightbox-nav-btn next" onClick={nextImage} aria-label="Next image">
              <ChevronRight size={28} />
            </button>

            {/* Lightbox Content */}
            <div className="lightbox-content-wrapper" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                className="lightbox-img"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />

              {/* Caption */}
              <div className="lightbox-caption-wrapper">
                <span className="gallery-item-cat" style={{ display: 'block', marginBottom: '0.25rem' }}>
                  {galleryImages[lightboxIndex].category}
                </span>
                <h3 className="lightbox-caption-title text-gold">
                  {galleryImages[lightboxIndex].title}
                </h3>
                <p className="lightbox-caption-desc">
                  {galleryImages[lightboxIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
