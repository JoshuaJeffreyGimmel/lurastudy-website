/* ============================================================
   LuraStudy — GitHub Pages Website JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. THEME TOGGLE (Dark/Light)
  // =========================================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('lurastudy-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('lurastudy-theme', next);
  });

  // =========================================================
  // 2. MOBILE NAVBAR HAMBURGER
  // =========================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // =========================================================
  // 3. NAVBAR BACKGROUND ON SCROLL
  // =========================================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'var(--color-border)';
      navbar.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.2)';
    } else {
      navbar.style.borderBottomColor = 'var(--color-border)';
      navbar.style.boxShadow = 'none';
    }
  });

  // =========================================================
  // 4. INSTALL TABS
  // =========================================================
  const installTabs = document.querySelectorAll('.install-tab');
  const tabContents = {
    linux: document.getElementById('tab-linux'),
    windows: document.getElementById('tab-windows'),
    docker: document.getElementById('tab-docker'),
    cloud: document.getElementById('tab-cloud'),
  };

  installTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      installTabs.forEach(t => t.classList.remove('active'));
      Object.values(tabContents).forEach(tc => tc.classList.remove('active'));

      // Activate clicked tab
      tab.classList.add('active');
      const target = tabContents[tab.dataset.tab];
      if (target) target.classList.add('active');
    });
  });

  // =========================================================
  // 5. CODE BLOCK COPY TO CLIPBOARD
  // =========================================================
  document.querySelectorAll('.code-block__copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        `;
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
      }
    });
  });

  // =========================================================
  // 6. INTERSECTION OBSERVER — FADE-IN ANIMATIONS
  // =========================================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // =========================================================
  // 7. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // =========================================================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navbar__link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.style.color = '';
      anchor.style.background = '';
      if (anchor.getAttribute('href') === `#${current}`) {
        anchor.style.color = 'var(--color-primary)';
        anchor.style.background = 'rgba(108, 99, 255, 0.08)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // =========================================================
  // 8. SMOOTH SCROLL FOR ANCHOR LINKS (safari fallback)
  // =========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================
  // 9. LIGHTBOX — click image to view fullscreen
  // =========================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open lightbox on image click
  document.querySelectorAll('.media__image, .hero__screenshot').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src, img.alt);
    });
  });

  // Close on close button click
  lightboxClose.addEventListener('click', closeLightbox);

  // Close on overlay click (click outside image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // =========================================================
  // 10. SCROLL INDICATOR CLICK — scroll to features
  // =========================================================
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    });
  }

  console.log('🚀 LuraStudy — website loaded successfully!');
});