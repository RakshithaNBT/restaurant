import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/menuData';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ background: 'var(--dark-gradient)' }}>
      <div className="ambient-glow" style={{ bottom: '10%', right: '15%' }}></div>
      <div className="warm-light-top"></div>

      <div className="container">
        {/* Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Guest Diaries</span>
          <h2 className="section-title">Patron <span className="text-gold">Reviews</span></h2>
          <div className="section-title-divider"></div>
        </div>

        {/* Swiper Slider */}
        <div className="testimonials-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              }
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="testimonial-card-wrapper">
                  <div className="testimonial-card glass-panel">
                    {/* Quotation Icon decoration */}
                    <div 
                      style={{ 
                        position: 'absolute', 
                        top: '2rem', 
                        right: '2rem', 
                        opacity: 0.05, 
                        color: 'var(--primary-gold)'
                      }}
                    >
                      <Quote size={80} />
                    </div>

                    {/* Star Ratings */}
                    <div className="testimonial-stars">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--primary-gold)" stroke="none" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="testimonial-quote">
                      "{t.text}"
                    </p>

                    {/* Author Profile */}
                    <div className="testimonial-profile">
                      <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                      <div>
                        <h4 className="testimonial-author-name">{t.name}</h4>
                        <span className="testimonial-author-role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
