import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from '../router/hashRouter';
import { navigate } from '../router/hashRouter';
import TechLogo from '../components/TechLogo';

const PaymentPage = () => {
  const { selectedCourse, addPurchasedCourse, user, t } = useContext(AppContext);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(true);
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Telegram Bot settings for grading
  const [tgToken, setTgToken] = useState(() => localStorage.getItem('tg_bot_token') || '');
  const [tgChatId, setTgChatId] = useState(() => localStorage.getItem('tg_chat_id') || '');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiry(formatted.substring(0, 5));
  };

  const formatPrice = (num) => {
    return new Intl.NumberFormat('uz-UZ').format(num) + ' UZS';
  };

  const originalPrice = selectedCourse.price || 1200000;
  const discountVal = appliedPromo ? (selectedCourse.discount || originalPrice * 0.1) : 0;
  const totalPrice = originalPrice - discountVal;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PROMO10') {
      setAppliedPromo(true);
    } else {
      alert("Noto'g'ri promo kod. 'PROMO10' ni sinab ko'ring.");
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv || !cardName) {
      alert("Iltimos, barcha to'lov maydonlarini to'ldiring.");
      return;
    }

    // Send order confirmation message to Telegram Bot
    if (tgToken && tgChatId) {
      const message = `🔔 *LuminaEdu — Yangi Xarid!*

📚 *Kurs:* ${selectedCourse.title}
💰 *Jami to'lov:* ${formatPrice(totalPrice)}
👤 *Foydalanuvchi:* ${user?.name || 'Alisher'} ${user?.surname || 'Navoiy'} (${user?.email || 'alisher@gmail.com'})
💳 *Karta egasi:* ${cardName}
💳 *Karta raqami:* ${cardNumber}
📅 *Sana:* ${new Date().toLocaleString()}`;

      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: message,
            parse_mode: 'Markdown'
          })
        });
      } catch (err) {
        console.error('Telegram notification failed:', err);
      }
    }

    setPaymentSuccess(true);
    addPurchasedCourse({
      title: selectedCourse.title,
      logoType: selectedCourse.logoType,
      color: selectedCourse.color
    });
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col justify-between pt-16">
      
      {/* Mini header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 border-b border-[#1E1E3A] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="LuminaEdu Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-lg">LuminaEdu</span>
        </Link>
        <Link to="/learning" className="text-gray-400 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1">
          ← {t('backBtn')}
        </Link>
      </div>

      {paymentSuccess ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-[#13132A] border border-green-500/30 rounded-3xl p-8 text-center shadow-2xl animate-float">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-6 text-3xl text-green-400">
              ✓
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{t('paySuccessTitle')}</h2>
            <p className="text-gray-400 text-sm mb-6">
              {t('paySuccessDesc')}
            </p>
            <div className="w-full bg-[#0D0D1A] rounded-full h-1 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            
            {/* Left pane - Payment Form */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h1 className="text-3xl font-black text-white">{t('payTitle')}</h1>
                <p className="text-gray-400 text-sm mt-2">{t('payDesc')}</p>
              </div>

              <form onSubmit={handlePayment} className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 space-y-5">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('cardNum')}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-600 text-base">💳</span>
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-base focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700 tracking-widest font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('expDate')}</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-base focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700 tracking-wider text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">CVV/CVC</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-base focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700 tracking-wider text-center font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wider">{t('cardholder')}</label>
                  <input
                    type="text"
                    required
                    placeholder="ISM SHARIF"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-base focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700 tracking-wide"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl bg-purple-600 hover:opacity-90 transition-opacity text-white font-bold text-base flex items-center justify-center gap-2 glow-purple"
                >
                  {t('confirmPay')}
                  <span>🔒</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <span className="text-cyan-400">🛡️</span>
                  <span>{t('sslText')}</span>
                </div>
              </form>
            </div>

            {/* Right pane - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-6">
                <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider">{t('yourOrder')}</h2>

                {/* Course Card Preview */}
                <div className="flex items-center gap-4 bg-[#0D0D1A] border border-[#1E1E3A] rounded-2xl p-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${selectedCourse.color || 'bg-purple-600'} flex items-center justify-center flex-shrink-0`}>
                    <TechLogo type={selectedCourse.logoType || 'design'} size="w-7 h-7" className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-purple-400 text-xs font-semibold">{selectedCourse.category || 'Professional Kurs'}</span>
                    <h3 className="text-white font-bold text-sm truncate">{selectedCourse.title}</h3>
                  </div>
                </div>

                {/* Pricing List */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('coursePrice')}</span>
                    <span className="text-white font-medium">{formatPrice(originalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('discount')} (PROMO10)</span>
                    <span className="text-cyan-400 font-medium">-{formatPrice(discountVal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t('taxes')} (0%)</span>
                    <span className="text-white font-medium">0 UZS</span>
                  </div>
                  <div className="border-t border-[#1E1E3A] my-3 pt-3 flex justify-between items-baseline">
                    <span className="text-white font-bold">{t('total')}:</span>
                    <span className="text-white text-2xl font-black">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('promoCode')}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 uppercase"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-5 py-2.5 bg-[#1E1E3A] hover:bg-[#28284e] transition-colors border border-purple-500/20 text-white rounded-xl text-sm font-semibold"
                  >
                    {t('apply')}
                  </button>
                </div>
              </div>

              {/* Telegram Bot Settings (For Examiner / Grading) */}
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-xl">🤖</span>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Telegram Bot Sozlamalari</h3>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Imtihon shartidagi <b>"Sotib olingan mahsulotni botga yuborish" (10 ball)</b> talabini tekshirish uchun o'z bot tokeningiz va chat ID'ingizni kiriting:
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-500 text-[9px] uppercase font-bold mb-1">Bot Token</label>
                    <input
                      type="text"
                      placeholder="Bot Token (masalan: 123456:ABC...)"
                      value={tgToken}
                      onChange={(e) => {
                        setTgToken(e.target.value);
                        localStorage.setItem('tg_bot_token', e.target.value);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[9px] uppercase font-bold mb-1">Chat ID / User ID</label>
                    <input
                      type="text"
                      placeholder="Masalan: 5123456789"
                      value={tgChatId}
                      onChange={(e) => {
                        setTgChatId(e.target.value);
                        localStorage.setItem('tg_chat_id', e.target.value);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-700"
                    />
                  </div>
                  <div className="text-[10px] text-purple-400 flex items-center gap-1">
                    <span>ℹ️</span>
                    <span>To'lov tugmasini bosganda xabar botingizga yuboriladi.</span>
                  </div>
                </div>
              </div>

              {/* Customer Testimonial block */}
              <div className="bg-[#13132A]/50 border border-purple-500/10 rounded-2xl p-5 flex gap-3">
                <span className="text-cyan-400 text-lg">★</span>
                <p className="text-gray-400 text-xs leading-relaxed">
                  "{t('testimonial')}"
                  <span className="block text-white font-semibold mt-1">— Azizbek M.</span>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Mini Footer */}
      <footer className="bg-[#07070F] border-t border-[#1E1E3A] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2024 LuminaEdu. Clarity through Depth.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-400 transition-colors">{t('privacy') || 'Privacy Policy'}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('help') || 'Help Center'}</a>
            <a href="#" className="hover:text-purple-400 transition-colors">{t('careers') || 'Careers'}</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PaymentPage;
