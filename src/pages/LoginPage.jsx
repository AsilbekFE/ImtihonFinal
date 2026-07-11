import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { navigate } from '../router/hashRouter';

const LoginPage = () => {
  const { login, register, t } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');

  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: 'text-gray-500', barColor: 'bg-transparent', width: 'w-0' };
    if (pass.length < 6) {
      return { label: 'Oson', color: 'text-red-400', barColor: 'bg-red-500', width: 'w-1/3' };
    }
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasDigit = /\d/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);

    if (pass.length >= 8 && hasLetter && hasDigit && hasSpecial) {
      return { label: 'Qiyin', color: 'text-green-400', barColor: 'bg-green-500', width: 'w-full' };
    }
    if (hasLetter && hasDigit) {
      return { label: 'Orta', color: 'text-yellow-400', barColor: 'bg-yellow-500', width: 'w-2/3' };
    }
    return { label: 'Oson', color: 'text-red-400', barColor: 'bg-red-500', width: 'w-1/3' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError("Faqat @gmail.com manzili orqali tizimga kirish yoki ro'yxatdan o'tish mumkin!");
      return;
    }
    if (activeTab === 'login') {
      login(email, password);
    } else {
      register(email, name, surname);
    }
  };

  const handleDemoLogin = () => {
    login('alisher@gmail.com', 'password123');
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D1A] flex flex-col justify-between py-12 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mt-6">
        <h2 className="text-2xl font-black text-white tracking-wide">LuminaEdu</h2>
        <p className="text-gray-500 text-xs mt-1">Clarity through Depth</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto my-8 relative z-10">
        <div className="bg-[#13132A]/90 border border-purple-500/10 rounded-3xl p-8 shadow-2xl relative">
          
          {/* Tabs */}
          <div className="flex border-b border-[#1E1E3A] mb-8">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'login' ? 'text-white' : 'text-gray-500'
              }`}
            >
              {t('tabLogin')}
              {activeTab === 'login' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${
                activeTab === 'register' ? 'text-white' : 'text-gray-500'
              }`}
            >
              {t('tabRegister')}
              {activeTab === 'register' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">{t('nameLabel')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Ism"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">{t('surnameLabel')}</label>
                  <input
                    type="text"
                    required
                    placeholder="Familiya"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                  />
                </div>
              </>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-xs text-center font-medium animate-pulse">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-xs font-semibold mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-600 text-sm">📧</span>
                <input
                  type="email"
                  required
                  placeholder="ism@gmail.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-400 text-xs font-semibold">Parol</label>
                {activeTab === 'login' && (
                  <a href="#" className="text-purple-400 text-xs hover:underline">Forgot?</a>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-gray-600 text-sm">🔒</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-semibold">Parol mustahkamligi:</span>
                    <span className={`font-black uppercase tracking-wider ${strength.color}`}>{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0D0D1A] rounded-full overflow-hidden border border-[#1E1E3A]">
                    <div className={`h-full transition-all duration-300 ${strength.barColor} ${strength.width}`} />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-all glow-purple"
            >
              {activeTab === 'login' ? t('welcome') : t('tabRegister')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-[#1E1E3A]"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">{t('orContinue')}</span>
            <div className="flex-grow border-t border-[#1E1E3A]"></div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleDemoLogin}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E1E3A]/40 border border-[#1E1E3A] hover:border-purple-500/30 transition-all text-white text-sm font-semibold"
            >
              <span className="text-base">🌐</span>
              Google
            </button>
            <button 
              onClick={handleDemoLogin}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1E1E3A]/40 border border-[#1E1E3A] hover:border-purple-500/30 transition-all text-white text-sm font-semibold"
            >
              <span className="text-base">🐙</span>
              GitHub
            </button>
          </div>

          {/* Demo test login button specifically requested */}
          <div className="mt-6 pt-5 border-t border-[#1E1E3A]/80 text-center">
            <button
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl border border-purple-500/40 text-purple-400 text-xs font-bold hover:bg-purple-500/10 hover:text-white transition-all bg-purple-600/5 text-white-force"
            >
              ⚡ {t('demoBtn')}
            </button>
            <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">
              {t('demoDesc')}
            </p>
          </div>

          {/* Privacy note */}
          <p className="text-[#565675] text-[10px] text-center mt-6 leading-relaxed">
            {t('termsText')}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-xs mt-6">
        © 2024 LuminaEdu. All rights reserved.
      </div>
    </div>
  );
};

export default LoginPage;
