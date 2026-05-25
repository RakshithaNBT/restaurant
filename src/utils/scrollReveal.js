// scrollReveal.js – adds 'visible' class to elements with .scroll-reveal when they enter viewport

export function initScrollReveal() {
  if (typeof window === 'undefined' || !window.IntersectionObserver) return;
  const elements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  });
  elements.forEach(el => observer.observe(el));
}

// Optional: call automatically on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
