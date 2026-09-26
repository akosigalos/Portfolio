// Portfolio interactions: mobile menu, active navigation, current year, and reveal effects.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navigationLinks = document.querySelectorAll('.nav-links a');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navigationLinks.forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main section[id]');
const updateActiveLink = () => {
  let currentSection = 'home';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) currentSection = section.id;
  });
  navigationLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`));
};
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
