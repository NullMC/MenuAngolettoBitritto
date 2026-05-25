/* ============================================================
   L'ANGOLETTO PIZZERIA — Script v2.0
   ============================================================ */

/* ---- Accordion ---- */
function toggleAccordion(id) {
  const body  = document.getElementById('body-' + id);
  const arrow = document.getElementById('arrow-' + id);
  if (!body || !arrow) return;

  const isOpen = body.classList.contains('open');

  // Close all others
  document.querySelectorAll('.acc-body.open').forEach(el => {
    el.style.maxHeight = '0px';
    el.classList.remove('open');
  });
  document.querySelectorAll('.acc-arrow.open').forEach(el => {
    el.classList.remove('open');
  });

  if (!isOpen) {
    // Calculate real height then animate
    body.style.maxHeight = 'none';
    const h = body.scrollHeight;
    body.style.maxHeight = '0px';
    body.offsetHeight; // reflow
    body.style.maxHeight = h + 'px';
    body.classList.add('open');
    arrow.classList.add('open');

    // After animation ends, release height clamp so content can grow freely
    setTimeout(() => {
      if (body.classList.contains('open')) {
        body.style.maxHeight = 'none';
        body.style.overflow = 'visible';
      }
    }, 520);
  } else {
    // Recollapse: first clamp back to scrollHeight, then animate to 0
    body.style.overflow = 'hidden';
    body.style.maxHeight = body.scrollHeight + 'px';
    body.offsetHeight;
    body.style.maxHeight = '0px';
    body.classList.remove('open');
    arrow.classList.remove('open');
  }
}

/* ---- Smooth scroll ---- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- Navbar scroll behaviour ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Hero entrance ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Navbar already transparent – just ensure it shows
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});