/* ============================================
   MAIN JAVASCRIPT - FINAL
   Fresh Graduate Portfolio
   ============================================ */

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = htmlElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 500);
});

/* ===== Navbar Scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== Active Nav on Scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
});

/* ===== Cursor Glow ===== */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

/* ===== Typewriter Effect ===== */
const typewriterEl = document.getElementById('typewriter');
const texts = [
  'Fresh Graduate S1 Manajemen',
  'Siap Berkontribusi, Berkembang',
  'Cepat Belajar, Mudah Beradaptasi',
  'Terbuka Peluang Kerja'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    // Menghapus teks
    typewriterEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Mengetik teks
    typewriterEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  // KECEPATAN: 150ms saat mengetik, 50ms saat menghapus
  let typeSpeed = isDeleting ? 50 : 90;

  // Jika teks sudah selesai diketik semua
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1500; // Tahan selama 2 detik sebelum mulai menghapus
    isDeleting = true;
  } 
  // Jika teks sudah habis dihapus
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500; // Jeda 0.5 detik sebelum mulai kalimat baru
  }

  setTimeout(typewriter, typeSpeed);
}

// Jalankan animasi
if (typewriterEl) {
  typewriter();
}

/* ===== Reveal on Scroll ===== */
const revealElements = document.querySelectorAll(
  '.section-header, .about-content, .about-illustration, .exp-card, .cert-card, .skills-overview, .skills-panel, .contact-card, .contact-form, .tools-section-header, .tool-chip'
);
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => observer.observe(el));

/* ===== Skill Bars Animation ===== */
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

/* ===== EXPERIENCE: Collapse ===== */
document.querySelectorAll('.exp-card').forEach(card => {
  const header = card.querySelector('.exp-header');
  const toggleBtn = card.querySelector('.exp-toggle-btn');

  const toggle = (e) => {
    if (e) e.stopPropagation();
    card.classList.toggle('open');
  };

  header.addEventListener('click', toggle);
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(e);
    });
  }
});

/* ===== CERTIFICATES: Collapse ===== */
document.querySelectorAll('.cert-card').forEach(card => {
  const header = card.querySelector('.cert-header');
  const collapseBtn = card.querySelector('.collapse-btn');
  const toggle = () => card.classList.toggle('open');

  header.addEventListener('click', toggle);
  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
});

/* ===== MODAL SERTIFIKAT ===== */
const certModal = document.getElementById('certModal');
const certModalImage = document.getElementById('certModalImage');
const certModalTitle = document.getElementById('certModalTitle');
const certModalDownload = document.getElementById('certModalDownload');

function openModal(imgSrc, title) {
  certModalImage.src = imgSrc;
  certModalImage.alt = title;
  certModalTitle.textContent = title;
  certModalDownload.href = imgSrc;
  certModal.classList.add('open');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('open');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.image, btn.dataset.title);
  });
});

document.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closeCertModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) {
    closeCertModal();
  }
});

certModalImage.addEventListener('error', () => {
  certModalImage.style.display = 'none';
  const wrap = certModalImage.parentElement;
  if (!wrap.querySelector('.img-fallback')) {
    const fb = document.createElement('div');
    fb.className = 'img-fallback';
    fb.style.cssText = 'padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;';
    fb.innerHTML = '⚠️ Gambar sertifikat belum tersedia.<br>Taruh file di <code>assets/certificates/</code>.';
    wrap.appendChild(fb);
  }
});
certModalImage.addEventListener('load', () => {
  certModalImage.style.display = '';
  const fb = certModalImage.parentElement.querySelector('.img-fallback');
  if (fb) fb.remove();
});

/* ===== SKILLS: Panel Collapse ===== */
document.querySelectorAll('[data-panel-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.skills-panel');
    panel.classList.toggle('open');

    if (panel.classList.contains('open')) {
      panel.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
      });
    }
  });
});

/* ===== SKILLS: Sub-collapse per item ===== */
document.querySelectorAll('[data-skill-toggle]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const item = btn.closest('.skill-item-collapse');
    item.classList.toggle('open');

    if (item.classList.contains('open')) {
      item.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
      });
    }
  });
});

/* ===== Default: Buka Hard Skills ===== */
const firstPanel = document.querySelector('.skills-panel');
if (firstPanel) {
  firstPanel.classList.add('open');
  setTimeout(() => {
    firstPanel.querySelectorAll('.skill-progress').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, 400);
}

/* ===== TOOLS POP-UP ===== */
const toolsModal = document.getElementById('toolsModal');
const toolsModalTitle = document.getElementById('toolsModalTitle');
const toolsModalDesc = document.getElementById('toolsModalDesc');
const toolsModalBar = document.getElementById('toolsModalBar');
const toolsModalPercent = document.getElementById('toolsModalPercent');
const toolsModalIcon = document.getElementById('toolsModalIcon');

function openToolsModal(name, desc, percent, iconSvg) {
  toolsModalTitle.textContent = name;
  toolsModalDesc.textContent = desc;
  toolsModalIcon.innerHTML = iconSvg;
  
  // Reset bar
  toolsModalBar.style.transition = 'none';
  toolsModalBar.style.width = '0';
  toolsModalPercent.textContent = '0%';

  // Buka modal
  toolsModal.classList.add('open');
  toolsModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Animasi bar
  setTimeout(() => {
    toolsModalBar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    toolsModalBar.style.width = percent + '%';
    
    // Animasi persentase
    let count = 0;
    const interval = setInterval(() => {
      count++;
      toolsModalPercent.textContent = count + '%';
      if (count >= parseInt(percent)) clearInterval(interval);
    }, 1000 / parseInt(percent));
  }, 100);
}

function closeToolsModal() {
  toolsModal.classList.remove('open');
  toolsModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.tool-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const name = chip.dataset.name || 'Tools';
    const desc = chip.dataset.desc || 'Deskripsi belum ditambahkan.';
    const percent = chip.dataset.percent || '0';
    const iconSvg = chip.querySelector('.tool-chip-icon').innerHTML;
    openToolsModal(name, desc, percent, iconSvg);
  });
});

document.querySelectorAll('[data-tools-close]').forEach(el => {
  el.addEventListener('click', closeToolsModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toolsModal.classList.contains('open')) {
    closeToolsModal();
  }
});

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 3500);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = 'Mengirim...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.disabled = false;
    contactForm.reset();
    showToast('✅ Pesan berhasil dikirim! Saya akan segera membalas.');
  }, 1200);
});

  /* ===== 18. Download CV ===== */
  // const downloadCV = document.getElementById('downloadCV');
  // if (downloadCV) {
  //   downloadCV.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     showToast('📄 Ganti link ini dengan file CV Anda di folder assets/');
  //   });
  // }

/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();