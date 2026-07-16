import React from 'react';

const LogoSVGs = {
  react: <svg viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>,
  javascript: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>,
  python: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.806v.828H3.5S0 5.789 0 11.968c0 6.18 3.352 5.96 3.352 5.96h1.99v-2.864s-.106-3.352 3.298-3.352h5.758s3.19.052 3.19-3.09V3.649S18.314 0 11.914 0zM8.708 1.84a1.06 1.06 0 110 2.12 1.06 1.06 0 010-2.12z"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.806v-.828H20.5S24 18.211 24 12.032c0-6.18-3.352-5.96-3.352-5.96h-1.99v2.864s.106 3.352-3.298 3.352H9.096s-3.19-.052-3.19 3.09v5.961S5.686 24 12.086 24zm3.206-1.84a1.06 1.06 0 110-2.12 1.06 1.06 0 010 2.12z"/></svg>,
  nodejs: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.636-.084-.918-.243l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 00.272 0l8.795-5.076a.277.277 0 00.134-.238V6.921a.28.28 0 00-.137-.242l-8.791-5.072a.278.278 0 00-.271 0L3.075 6.68a.284.284 0 00-.139.241v10.15a.27.27 0 00.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675A1.857 1.857 0 011.2 17.07V6.921c0-.681.363-1.317.953-1.658L10.946.188a1.929 1.929 0 011.807 0l8.794 5.075c.59.34.953.976.953 1.658v10.15c0 .679-.364 1.314-.953 1.656l-8.794 5.076c-.281.159-.596.243-.913.243h-.247z"/></svg>,
  html: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.997 24l-8.59-2.438L1.5 0zm7.031 9.75l-.232-2.713 10.059.003.323-3.105H7.531l.19 2.424 5.531.001-.41 4.564-3.11.856-3.115-.86-.195-2.274H5.642l.345 4.126L12 19.031l6.03-5.31.725-7.756H8.531z"/></svg>,
  css: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.997 24l-8.59-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.358-1.14.744-8.146z"/></svg>,
  marketing: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 17v-2.42c1.18.88 3.47 1.42 6 1.42s4.82-.54 6-1.42V17c0 .5-2.13 2-6 2s-6-1.5-6-2zm0-5v-2.42c1.18.88 3.47 1.42 6 1.42s4.82-.54 6-1.42V12c0 .5-2.13 2-6 2s-6-1.5-6-2zm0-5V4.58c1.18.88 3.47 1.42 6 1.42s4.82-.54 6-1.42V7c0 .5-2.13 2-6 2s-6-1.5-6-2z"/></svg>,
  ai: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.18V9l-1.25-.61-1.16-2.76L17.17 5h-2.36l-.98-2.34L12.5 1.5h-.01L11.18 3 10.2 5.34 7.84 6.3 6.59 9.06 5.34 9.67v2.36l1.25.61 1.16 2.76 1.42.95h2.36l.98 2.34L12.5 20.5h.01l1.32-1.5 1.04-2.34 2.36-.95 1.25-2.76L19.83 12h2.36l.98-2.34L24.5 9h-.01L21 11.18zM8.5 11c-1.38 0-2.5-1.12-2.5-2.5S7.12 6 8.5 6 11 7.12 11 8.5 9.88 11 8.5 11zm7 0c-1.38 0-2.5-1.12-2.5-2.5S14.12 6 15.5 6 18 7.12 18 8.5 16.88 11 15.5 11zM12 22c-1.38 0-2.5-1.12-2.5-2.5S10.62 17 12 17s2.5 1.12 2.5 2.5S13.38 22 12 22z"/></svg>,
  design: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67A2.5 2.5 0 0112 22zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5a.54.54 0 00-.14-.35c-.41-.46-.63-1.05-.63-1.65a2.5 2.5 0 012.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7zm-5.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
  certificate: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
};

const colorMap = {
  react: 'text-cyan-400',
  javascript: 'text-yellow-300',
  python: 'text-yellow-400',
  nodejs: 'text-green-500',
  html: 'text-orange-500',
  css: 'text-blue-400',
  marketing: 'text-green-400',
  database: 'text-blue-300',
  ai: 'text-purple-400',
  design: 'text-pink-400',
  certificate: 'text-white',
};

export const getLogoType = (title = '', tag = '', category = '') => {
  const text = `${title} ${tag} ${category}`.toLowerCase();
  if (text.includes('react')) return 'react';
  if (text.includes('python') || text.includes('django')) return 'python';
  if (text.includes('javascript') || text.includes('es6')) return 'javascript';
  if (text.includes('node')) return 'nodejs';
  if (text.includes('html')) return 'html';
  if (text.includes('css')) return 'css';
  if (text.includes('sql') || text.includes('database') || text.includes('postgresql')) return 'database';
  if (text.includes('marketing') || text.includes('smm')) return 'marketing';
  if (text.includes('ai') || text.includes('intellekt') || text.includes('machine') || text.includes('data')) return 'ai';
  if (text.includes('ui') || text.includes('ux') || text.includes('figma') || text.includes('dizayn')) return 'design';
  return 'design';
};

const TechLogo = ({ type, size = 'w-6 h-6', className = '' }) => {
  const logo = LogoSVGs[type] || LogoSVGs.design;
  const color = colorMap[type] || 'text-white';
  return (
    <div className={`${size} ${color} ${className} flex items-center justify-center`}>
      {logo}
    </div>
  );
};

export default TechLogo;
