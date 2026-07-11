import React, { useContext } from 'react';
import { Link } from '../router/hashRouter';
import { AppContext } from '../context/AppContext';

const Footer = () => {
  const { t } = useContext(AppContext);

  return (
    <footer className="bg-[#07070F] border-t border-[#1E1E3A] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="LuminaEdu Logo" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold text-lg">LuminaEdu</span>
          </div>

          <p className="text-gray-500 text-sm text-center">
            {t('footerDesc')}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('terms')}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('helpCenter')}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('affiliates')}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('careers')}</a>
            <Link to="/about" className="hover:text-purple-400 transition-colors font-semibold text-purple-500/70">{t('about')}</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:damiovanvar475@gmail.com"
              title="Gmail"
              className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/40 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a
              href="https://t.me/asl_o_1"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
              className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-500/40 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.99.36-.33-.01-.97-.19-1.44-.35-.58-.2-1.04-.31-1-.66.02-.18.27-.36.75-.56 2.94-1.28 4.9-2.12 5.88-2.54 2.8-1.18 3.38-1.39 3.76-1.4.08 0 .27.02.39.12a.4.4 0 01.12.28c0 .08-.01.17-.02.26z"/>
              </svg>
            </a>
            <a
              href="tel:+998880321031"
              title="+998 88 032 1031"
              className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1E1E3A] text-center text-gray-600 text-xs">
          © 2024 LuminaEdu. Clarity through Depth.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
