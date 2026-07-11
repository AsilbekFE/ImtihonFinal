import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from '../router/hashRouter';

const partners = [
  {
    category: 'Texnologiya Hamkorlari',
    icon: '💻',
    gradient: 'from-purple-600/20 to-blue-600/20',
    border: 'border-purple-500/20',
    items: [
      { name: 'Google for Developers', emoji: '🌐', desc: 'Web texnologiyalari va Cloud xizmatlari bo\'yicha kurs materiallari hamkor.' },
      { name: 'Microsoft Learn', emoji: '🪟', desc: 'Azure va TypeScript bo\'yicha sertifikat dasturlari hamkori.' },
      { name: 'Vercel', emoji: '▲', desc: 'Talabalar proyektlarini deploy qilish uchun bepul hosting hamkori.' },
    ]
  },
  {
    category: 'Ta\'lim Tashkilotlari',
    icon: '🎓',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    border: 'border-cyan-500/20',
    items: [
      { name: 'INHA University', emoji: '🏛️', desc: 'IT fakulteti talabalari uchun qo\'shimcha o\'quv manba hamkori.' },
      { name: 'NAJOT TA\'LIM', emoji: '🚀', desc: 'Front-end yo\'nalishi bitiruvchilariga yo\'llama hamkori.' },
      { name: 'Zero To Mastery', emoji: '⚡', desc: 'Xalqaro kurs materiallari va mentor hamkori.' },
    ]
  },
  {
    category: 'Media va Jamoat',
    icon: '📡',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-500/20',
    items: [
      { name: 'IT Press UZ', emoji: '📰', desc: 'IT yangiliklarini tarqatish va platforma reklamasi hamkori.' },
      { name: 'DevTalk Podcast', emoji: '🎙️', desc: 'LuminaEdu o\'quvchilari uchun mahsus epizodlar hamkori.' },
    ]
  },
];

const benefits = [
  { icon: '💰', title: 'Moliyaviy rag\'bat', desc: 'Har bir jalb qilingan foydalanuvchidan 15% komission to\'lovi.' },
  { icon: '🎨', title: 'Brend materiallari', desc: 'Reklama bannerlari, logotipler va tayyor marketing materiallari.' },
  { icon: '📊', title: 'Real-time dashboard', desc: 'O\'z havolangiz orqali jalb qilingan foydalanuvchilar statistikasi.' },
  { icon: '🤝', title: 'Shaxsiy menejer', desc: 'Hamkorlik jarayonida yordam beradigan shaxsiy menejeringiz.' },
  { icon: '🏆', title: 'Top hamkor unvoni', desc: 'Oylik eng faol hamkorlar alohida mukofotlanadi.' },
  { icon: '🔗', title: 'Co-branding imkoni', desc: 'Sizning logotipingiz LuminaEdu sahifasida ko\'rsatiladi.' },
];

const steps = [
  { num: '1', title: 'Ariza yuboring', desc: 'Quyidagi shaklni to\'ldiring yoki email orqali murojaat qiling.' },
  { num: '2', title: 'Ko\'rib chiqiladi', desc: 'Arizangiz 2-3 ish kuni ichida ko\'rib chiqiladi va javob beriladi.' },
  { num: '3', title: 'Shartnoma imzolanadi', desc: 'Kelishilgandan so\'ng elektron shartnoma imzolanadi.' },
  { num: '4', title: 'Boshladingiz!', desc: 'Hamkorlik havolangiz va dashboard kirish ma\'lumotlaringiz yuboriladi.' },
];

const PartnersPage = () => {
  const { t } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto fade-up">
        {/* Hero */}
        <div className="text-center mb-16 mt-4">
          <span className="inline-block text-xs font-bold tracking-widest text-green-400 uppercase bg-green-600/10 px-3 py-1 rounded-full border border-green-500/20 mb-4">
            Hamkorlik dasturi
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Birgalikda <span className="text-gradient">Kuchliroqmiz</span>
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            LuminaEdu hamkorlik dasturiga qo'shiling va o'zaro manfaatli munosabatlar orqali
            ta'lim sohasida birgalikda o'sib boring.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href="mailto:damiovanvar475@gmail.com?subject=Hamkorlik+arizasi"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-600/20"
            >
              🤝 Hamkor bo'ling
            </a>
            <a
              href="https://t.me/asl_o_1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-[#1E1E3A] text-gray-300 font-semibold text-sm hover:border-purple-500/50 hover:text-white transition-all"
            >
              ✈️ Telegram orqali murojaat
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { val: '12,000+', label: 'Faol talaba' },
            { val: '50+', label: 'Hamkor tashkilot' },
            { val: '85+', label: 'Kurs va modul' },
            { val: '98%', label: 'Mamnuniyat darajasi' },
          ].map(s => (
            <div key={s.label} className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 text-center hover:border-purple-500/30 transition-all">
              <div className="text-2xl font-black text-white mb-1">{s.val}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white text-center mb-8">
            Hozirgi <span className="text-gradient">Hamkorlarimiz</span>
          </h2>
          <div className="space-y-6">
            {partners.map(cat => (
              <div key={cat.category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{cat.icon}</span>
                  <h3 className="text-white font-bold text-base">{cat.category}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map(p => (
                    <div
                      key={p.name}
                      className={`bg-gradient-to-br ${cat.gradient} border ${cat.border} rounded-2xl p-5 hover:scale-[1.02] transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{p.emoji}</span>
                        <span className="text-white font-bold text-sm">{p.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white text-center mb-3">
            Hamkorlik <span className="text-gradient">afzalliklari</span>
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            LuminaEdu hamkor bo'lish sizga nima beradi?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map(b => (
              <div key={b.title} className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 hover:border-purple-500/30 transition-all group">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-purple-400 transition-colors">{b.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to become a partner */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white text-center mb-10">
            Qanday hamkor <span className="text-gradient">bo'lish mumkin?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(s => (
              <div key={s.num} className="text-center relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-black text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-600/30">
                  {s.num}
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{s.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/30 border border-purple-500/20 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Tayyor ekansiz? 🚀
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Bizning hamkorlik dasturimizga qo'shiling va ta'lim sohasida o'z o'rningizni egallang.
            Arizangizni bugun yuboring!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:damiovanvar475@gmail.com?subject=Hamkorlik+arizasi"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-600/20"
            >
              📧 Ariza yuborish
            </a>
            <a
              href="https://t.me/asl_o_1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-sky-500/40 text-sky-400 font-bold text-sm hover:bg-sky-500/10 transition-all"
            >
              ✈️ @asl_o_1 Telegram
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-5">
            Yoki qo'ng'iroq qiling: <span className="text-gray-400">+998 88 032 1031</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
