import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const searchItems = [
  { title: "Advanced UI/UX Principles Kursi", path: "/learning" },
  { title: "AI & Modern Automation Kursi", path: "/learning" },
  { title: "Full-stack Web Development", path: "/learning" },
  { title: "Counter (Hisoblagich) Arena", path: "/tasks" },
  { title: "Level Test: Upper-Int", path: "/test" },
  { title: "UX Designer Entry Test", path: "/test" },
  { title: "Faktorial hisoblash (JS)", path: "/tasks" },
  { title: "Palindrom tekshirish (JS)", path: "/tasks" },
  { title: "API orqali user yuklash (React)", path: "/tasks" },
  { title: "Mening Sertifikatlarim", path: "/certificates" },
  { title: "Foydalanuvchi Profili", path: "/profile" },
  { title: "Biz haqimizda ma'lumot", path: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { 
    isLoggedIn, 
    user, 
    setShowAuthModal, 
    theme, 
    toggleTheme, 
    lang, 
    changeLang, 
    t 
  } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const delay = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = searchItems.filter(item => 
        item.title.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 450);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { translationKey: 'explore', path: '/' },
    { translationKey: 'myLearning', path: '/learning' },
    { translationKey: 'test', path: '/test' },
    { translationKey: 'tasks', path: '/tasks' },
    { translationKey: 'certificates', path: '/certificates' },
    { translationKey: 'about', path: '/about' },
  ];

  const isActive = (path) => pathname === path;

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn && (path === '/learning' || path === '/certificates' || path === '/profile' || path === '/tasks')) {
      e.preventDefault();
      setShowAuthModal(true);
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070F]/95 backdrop-blur-xl border-b border-[#1E1E3A] shadow-lg shadow-purple-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <img src="/favicon.svg" alt="LuminaEdu Logo" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
            <span className="text-white font-bold text-lg">LuminaEdu</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-purple-600/20 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {t(link.translationKey)}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="bg-[#13132A] border border-[#1E1E3A] rounded-lg px-2.5 py-1.5 pl-8 text-xs xl:text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-purple-500 w-24 xl:w-32 transition-all focus:w-32 xl:focus:w-44"
              />
              <svg className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              {/* Search results & Loader Dropdown */}
              {(isSearching || searchQuery.trim().length > 0) && (
                <div className="absolute right-0 top-12 w-64 bg-[#13132A]/95 border border-[#1E1E3A] rounded-xl shadow-2xl overflow-hidden z-50 p-2 backdrop-blur-xl">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-4 gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                      <span className="text-gray-400 text-xs font-semibold">Qidirilmoqda...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {searchResults.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setSearchQuery('')}
                          className="block px-3 py-2 rounded-lg text-left text-xs font-semibold text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all border border-transparent hover:border-purple-500/20"
                        >
                          🔍 {item.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-xs py-3 text-center">Natija topilmadi</div>
                  )}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center bg-[#13132A] border border-[#1E1E3A] rounded-lg px-1.5 py-1">
              <span className="text-xs text-gray-500 mr-1 pl-1">🌐</span>
              <select
                value={lang}
                onChange={(e) => changeLang(e.target.value)}
                className="bg-transparent text-gray-300 text-xs font-semibold focus:outline-none cursor-pointer pr-1 uppercase"
              >
                <option value="uz" className="bg-[#13132A]">UZ</option>
                <option value="ru" className="bg-[#13132A]">RU</option>
                <option value="en" className="bg-[#13132A]">EN</option>
              </select>
            </div>

            {/* Theme Toggle (colorless/ransiz SVG) */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="w-9 h-9 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all"
            >
              {theme === 'dark' ? (
                // Moon icon (to switch to light)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                // Sun icon (to switch to dark)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Bell icon */}
            <Link
              to="/notifications"
              onClick={(e) => {
                if (!isLoggedIn) {
                  e.preventDefault();
                  setShowAuthModal(true);
                }
              }}
              className="w-9 h-9 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all relative group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse border border-[#07070F]" />
            </Link>

            {/* Login / Profile logic */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white border border-[#1E1E3A] hover:border-purple-500/50 bg-[#13132A] transition-all"
              >
                {t('login')}
              </Link>
            ) : (
              <Link
                to="/profile"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform"
                style={{ boxShadow: '0 0 15px rgba(124,58,237,0.4)' }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </Link>
            )}
          </div>

          {/* Mobile controls & toggle button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Small theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Small lang selector */}
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value)}
              className="bg-[#13132A] border border-[#1E1E3A] text-gray-300 text-xs px-2 py-1.5 rounded-lg focus:outline-none uppercase"
            >
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>

            <button
              id="mobile-menu-btn"
              className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#07070F]/98 backdrop-blur-xl border-b border-[#1E1E3A] px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => {
                handleLinkClick(e, link.path);
                if (isLoggedIn || link.path === '/' || link.path === '/test') {
                  setMobileOpen(false);
                }
              }}
              className={`block px-4 py-3 rounded-lg text-sm font-medium mt-1 transition-all ${
                isActive(link.path)
                  ? 'text-white bg-purple-600/20 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t(link.translationKey)}
            </Link>
          ))}
          <div className="flex gap-2 mt-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm border border-[#1E1E3A] text-gray-300 bg-[#13132A]"
                >
                  {t('login')}
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setShowAuthModal(true);
                  }}
                  className="flex-1 text-center px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold"
                >
                  {t('registerNow')}
                </button>
              </>
            ) : (
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl border border-purple-500/30 text-purple-400 bg-purple-600/10 font-semibold"
              >
                {t('profile')} ({user.name})
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
