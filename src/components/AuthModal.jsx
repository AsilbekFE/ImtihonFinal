import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { navigate } from '../router/hashRouter';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, t } = useContext(AppContext);

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowAuthModal(false)}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#13132A] border border-purple-500/30 rounded-3xl p-6 text-center shadow-2xl animate-float">
        <button 
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-2xl">
          🔒
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{t('authModalTitle')}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {t('authModalDesc')}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setShowAuthModal(false);
              navigate('/login');
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-sm hover:from-purple-500 hover:to-purple-600 transition-all glow-purple"
          >
            {t('authModalBtn')}
          </button>
          
          <button
            onClick={() => setShowAuthModal(false)}
            className="w-full py-3 rounded-xl border border-[#1E1E3A] text-gray-400 hover:text-white hover:border-purple-500/30 transition-all text-sm"
          >
            {t('authModalLater')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
