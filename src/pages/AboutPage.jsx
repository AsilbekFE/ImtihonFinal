import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from '../router/hashRouter';

// ===== SVG ICONS =====
const GmailIcon = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8h36a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" fill="#fff"/>
    <path d="M4 10l20 14L44 10" stroke="#EA4335" strokeWidth="3" strokeLinecap="round"/>
    <path d="M4 10v28" stroke="#4285F4" strokeWidth="3"/>
    <path d="M44 10v28" stroke="#34A853" strokeWidth="3"/>
    <path d="M4 38l13-12" stroke="#FBBC05" strokeWidth="3" strokeLinecap="round"/>
    <path d="M44 38L31 26" stroke="#EA4335" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#2AABEE"/>
    <path d="M10 23.5l24.5-9.5c1.1-.4 2 .3 1.6 1.7l-4.2 19.7c-.3 1.3-1.1 1.6-2.2.9l-6-4.4-2.9 2.8c-.3.3-.6.4-1.3.4l.5-6.5 12-10.8c.5-.4-.1-.7-.8-.2L14.5 28.7 10 27.4c-1.3-.4-1.3-1.3.3-2z" fill="#fff"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
  </svg>
);

// ===== STAT CARD =====
const StatCard = ({ value, label, icon }) => (
  <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-6 text-center group hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.03]">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-3xl font-black text-white mb-1">{value}</div>
    <div className="text-gray-500 text-sm">{label}</div>
  </div>
);

// ===== FEATURE CARD =====
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 flex items-start gap-4 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="w-11 h-11 rounded-xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ===== CONTACT CARD =====
const ContactCard = ({ href, icon, label, value, color, hoverColor }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
        hovered
          ? `${color} scale-[1.03] shadow-lg`
          : 'bg-[#13132A] border-[#1E1E3A] hover:border-purple-500/40'
      }`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        hovered ? 'bg-white/10 scale-110' : 'bg-[#07070F] border border-[#1E1E3A]'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
        <div className={`font-bold text-sm truncate transition-colors ${hovered ? 'text-white' : 'text-gray-200'}`}>
          {value}
        </div>
      </div>
      <div className={`flex-shrink-0 transition-all duration-300 ${hovered ? 'translate-x-1 text-white' : 'text-gray-600'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
};

// ===== MAIN COMPONENT =====
const AboutPage = () => {
  const { t } = useContext(AppContext);

  const features = [
    { icon: '🎓', title: "Jonli & Interaktiv Darslar", desc: "O'qituvchilar bilan real vaqtda muloqot qiling, savollaringizga tezda javob oling." },
    { icon: '🏆', title: "Sertifikatsiya Tizimi", desc: "Kursni yakunlab, professional sertifikat oling va karyerangizni oshiring." },
    { icon: '🧑‍💻', title: "Amaliy Topshiriqlar", desc: "LeetCode uslubidagi kodlash topshiriqlari orqali bilimingizni mustahkamlang." },
    { icon: '📊', title: "Progress Kuzatuvi", desc: "O'quv jarayoningizni real vaqtda kuzating, natijalarni tahlil qiling." },
    { icon: '🌍', title: "Ko'p Tilli Qo'llab-quvvatlash", desc: "O'zbek, Rus va Ingliz tillarida o'qing — istalgan tilda qulay ta'lim oling." },
    { icon: '🔒', title: "Xavfsiz Platforma", desc: "Ma'lumotlaringiz SSL shifrlangan muhitda saqlangan bo'ladi." },
  ];

  const stats = [
    { value: '12,000+', label: "Faol Talabalar", icon: '👨‍🎓' },
    { value: '85+',     label: "Professional Kurslar", icon: '📚' },
    { value: '40+',     label: "Tajribali Mentorlar", icon: '👨‍🏫' },
    { value: '98%',     label: "Mamnuniyat Darajasi", icon: '⭐' },
  ];

  const techStack = ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript ES6+', 'REST API', 'HTML5', 'CSS3'];

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-16">

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block"></span>
          Platforma haqida
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
          Biz kim biz va nima{' '}
          <span className="text-gradient">uchun yaratilganmiz?</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
          <strong className="text-purple-300">LuminaEdu</strong> — zamonaviy o'quv platformasi. Maqsadimiz: har bir o'quvchiga sifatli, qulay va zamonga mos ta'limni yetkazib berish. Biz web dasturlash, UI/UX dizayn va AI sohasidagi bilimlarni amaliy topshiriqlar, jonli darslar va sertifikatlar orqali taqdim etamiz.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/learning"
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 text-sm"
          >
            Kurslarni Ko'rish →
          </Link>
          <Link
            to="/tasks"
            className="px-6 py-3 border border-purple-500/30 text-purple-400 hover:bg-purple-600/10 font-bold rounded-xl transition-all text-sm"
          >
            Topshiriqlarni Sinab Ko'ring
          </Link>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-#13132A border border-purple-500/15 rounded-3xl p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Bizning Missiya</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3 mb-5 leading-snug">
                Har kimga sifatli ta'lim — istalgan joydan, istalgan vaqtda
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                LuminaEdu 2023-yilda o'zbekistonlik yosh dasturchilar va dizaynerlar guruhida tashkil etilgan. Biz ishonchimiz komilki: bilim faqat shahar markazidagi qimmat kurslarda emas, balki internetda ham sifatli bo'lishi mumkin.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Mutaxassis yo'naltirishidagi ta'lim dasturlari",
                  "Real loyihalar ustida ishlash imkoniyati",
                  "Karyera qo'llab-quvvatlash va mentorlik",
                  "24/7 yordamchi chatbot va jamoa",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5 flex-shrink-0"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right decorative block */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Platforma tili', value: 'O\'zbek / Rus / Ingliz', icon: '🌐' },
                { label: 'Darslar formati', value: 'Video + Amaliy + Test', icon: '📹' },
                { label: 'Sertifikat', value: 'Raqamli & Chop etish', icon: '🏅' },
                { label: 'Qurilma', value: 'Mobil & Desktop', icon: '📱' },
              ].map((item, i) => (
                <div key={i} className="bg-[#07070F]/60 border border-[#1E1E3A] rounded-2xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-gray-500 text-[10px] uppercase font-semibold mb-1">{item.label}</div>
                  <div className="text-white text-xs font-bold leading-snug">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">Imkoniyatlar</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">Platformaning Asosiy Xususiyatlari</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 text-center">
          <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase">Texnologiyalar</span>
          <h2 className="text-xl font-black text-white mt-2 mb-6">Platforma Qaysi Texnologiyalarda Ishlaydi?</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-[#07070F] border border-[#1E1E3A] text-gray-300 text-xs font-semibold rounded-xl hover:border-purple-500/40 hover:text-purple-300 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Bog'lanish</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-2">Biz Bilan Muloqot Qiling</h2>
          <p className="text-gray-500 text-sm">Savollaringiz bormi? Quyidagi kanallar orqali bog'laning!</p>
        </div>

        <div className="space-y-4">
          {/* Gmail */}
          <ContactCard
            href="mailto:damiovanvar475@gmail.com"
            icon={<GmailIcon />}
            label="Elektron Pochta"
            value="damiovanvar475@gmail.com"
            color="bg-red-600/10 border-red-500/30"
            hoverColor="red"
          />

          {/* Telegram */}
          <ContactCard
            href="https://t.me/asl_o_1"
            icon={<TelegramIcon />}
            label="Telegram Kanal"
            value="@asl_o_1"
            color="bg-sky-600/10 border-sky-500/30"
            hoverColor="sky"
          />

          {/* Phone */}
          <ContactCard
            href="tel:+998880321031"
            icon={
              <div className="text-green-400">
                <PhoneIcon />
              </div>
            }
            label="Telefon Raqam"
            value="+998 88 032 1031"
            color="bg-green-600/10 border-green-500/30"
            hoverColor="green"
          />
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 text-xs">
            © 2024 LuminaEdu. Barcha huquqlar himoyalangan.{' '}
            <span className="text-purple-400 font-semibold">Anvar Damiov</span> tomonidan ishlab chiqilgan.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
