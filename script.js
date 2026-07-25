const quotes = [
  '在时间的波形里，找到真正有意义的异常。',
  '缺失的数据不是空白，而是等待被理解的信息。',
  '让模型理解时间，也让研究回应真实问题。',
  '好的算法，最终要走出实验室进入真实系统。'
];

const quote = document.querySelector('[data-quote]');
const quoteButton = document.querySelector('[data-quote-button]');
let quoteIndex = 0;

quoteButton?.addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quote.animate(
    [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 260, easing: 'ease-out' }
  );
  quote.textContent = quotes[quoteIndex];
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const navLinks = [...document.querySelectorAll('.main-nav a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}
