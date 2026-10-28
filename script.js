// Mio AI Keyboard Website — script.js

document.addEventListener('DOMContentLoaded', () => {
  // ── Smooth Scrolling for anchor links ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Navbar scroll shadow ────────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 12) {
        navbar.style.boxShadow = '0 4px 20px rgba(30, 63, 46, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // ── Active nav link highlight based on scroll position ─────────────────────
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ── Feature Card hover entrance animations ──────────────────────────────────
  const cards = document.querySelectorAll('.feature-card');
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cardObserver.observe(card);
  });

  // ── Performance stat counter animation ─────────────────────────────────────
  const perfNumbers = document.querySelectorAll('.perf-number');
  const perfObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('counted');
        perfObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  perfNumbers.forEach(el => perfObserver.observe(el));

  // ── Mobile nav toggle (basic) ───────────────────────────────────────────────
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.style.display === 'flex';
      navLinksContainer.style.display = isOpen ? 'none' : 'flex';
      navLinksContainer.style.flexDirection = 'column';
      navLinksContainer.style.position = 'absolute';
      navLinksContainer.style.top = '76px';
      navLinksContainer.style.left = '0';
      navLinksContainer.style.right = '0';
      navLinksContainer.style.background = 'rgba(248, 250, 247, 0.97)';
      navLinksContainer.style.padding = '20px 24px';
      navLinksContainer.style.borderBottom = '1px solid #E2ECE5';
      navLinksContainer.style.backdropFilter = 'blur(16px)';
      navLinksContainer.style.zIndex = '99';
    });
  }
});
