const root = document.documentElement;
const themeButton = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  if (themeButton) {
    themeButton.querySelector('span').textContent = theme === 'dark' ? '☾' : '☼';
    themeButton.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
  }
}

setTheme(savedTheme || preferredTheme);
themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const toast = document.querySelector('[data-toast]');
      toast?.classList.add('show');
      window.setTimeout(() => toast?.classList.remove('show'), 1600);
    } catch {
      window.location.href = `mailto:${button.dataset.copy}`;
    }
  });
});
