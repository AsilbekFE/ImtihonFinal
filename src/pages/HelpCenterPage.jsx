import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const faqs = [
  {
    category: 'Hisob va Kirish',
    icon: '🔐',
    color: 'purple',
    items: [
      {
        q: 'Ro\'yxatdan o\'tish uchun nima kerak?',
        a: 'Faqat @gmail.com elektron pochta manzili kerak. Ro\'yxatdan o\'tish 1 daqiqadan kam vaqt oladi va bepul.'
      },
      {
        q: 'Parolimni unutib qo\'ydim. Nima qilaman?',
        a: 'Kirish sahifasidagi "Forgot?" tugmasini bosing. Email manzilingizga parolni tiklash havolasi yuboriladi.'
      },
      {
        q: 'Hisobimni o\'chirib yuborish mumkinmi?',
        a: 'Ha. Profil sozlamalaridan yoki damiovanvar475@gmail.com ga xat orqali hisobingizni o\'chirishingiz mumkin.'
      },
    ]
  },
  {
    category: 'Kurslar va O\'qish',
    icon: '📚',
    color: 'cyan',
    items: [
      {
        q: 'Bepul kurslar bormi?',
        a: 'Ha! Boshlang\'ich darajadagi HTML, CSS va JavaScript kurslari to\'liq bepul. Premium kurslar uchun to\'lov talab qilinadi.'
      },
      {
        q: 'Kursni qancha vaqtda tugatish mumkin?',
        a: 'Kurslarni o\'z sur\'atingizda tugatasiz. Hech qanday muddatli shart yo\'q. Har bir kursning taxminiy davomiyligi kurs sahifasida ko\'rsatilgan.'
      },
      {
        q: 'Sertifikat olish uchun nima qilish kerak?',
        a: 'Kursni 100% tugatib, yakuniy testdan o\'tganingizdan so\'ng avtomatik ravishda sertifikat beriladi. Sertifikatni PDF formatida yuklab olishingiz mumkin.'
      },
    ]
  },
  {
    category: 'To\'lov va Narxlar',
    icon: '💳',
    color: 'green',
    items: [
      {
        q: 'Qanday to\'lov usullari qabul qilinadi?',
        a: 'Click, Payme, Uzcard, Humo va xalqaro karta (Visa, MasterCard) orqali to\'lov qilishingiz mumkin.'
      },
      {
        q: 'To\'lovni qaytarish mumkinmi?',
        a: 'To\'lovdan keyin 7 kun ichida qaytarish mumkin. Lekin kursning 30% yoki undan ko\'pi ko\'rilgan bo\'lsa, qaytarish amalga oshirilmaydi.'
      },
    ]
  },
  {
    category: 'Texnik Masalalar',
    icon: '🛠️',
    color: 'yellow',
    items: [
      {
        q: 'Kurs video ishlamayapti. Nima qilaman?',
        a: 'Brauzeringizni yangilang, kesh va cookie ni tozalang. Agar muammo davom etsa, Telegram kanali @asl_o_1 orqali murojaat qiling.'
      },
      {
        q: 'Qaysi brauzerlar qo\'llab-quvvatlanadi?',
        a: 'Chrome (tavsiya etiladi), Firefox, Edge va Safari zamonaviy versiyalari to\'liq qo\'llab-quvvatlanadi.'
      },
      {
        q: 'Mobil qurilmadan o\'qish mumkinmi?',
        a: 'Ha, platforma to\'liq moslashtirilgan (responsive). Har qanday qurilmadan — telefon, planshet yoki kompyuterdan foydalanishingiz mumkin.'
      },
    ]
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#1E1E3A] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
      >
        <span className="text-white text-sm font-semibold pr-4">{q}</span>
        <span className={`text-gray-500 flex-shrink-0 text-base transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-[#1E1E3A] pt-3 bg-[#0D0D1A]/40">
          {a}
        </div>
      )}
    </div>
  );
};

const colorMap = {
  purple: 'text-purple-400 bg-purple-600/10 border-purple-500/20',
  cyan: 'text-cyan-400 bg-cyan-600/10 border-cyan-500/20',
  green: 'text-green-400 bg-green-600/10 border-green-500/20',
  yellow: 'text-yellow-400 bg-yellow-600/10 border-yellow-500/20',
};

const HelpCenterPage = () => {
  const { t } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filtered = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto fade-up">
        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <span className="inline-block text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-600/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-4">
            Qo'llab-quvvatlash
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Yordam <span className="text-gradient">Markazi</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Ko'p so'raladigan savollarga javoblarni toping. Javob topa olmadingizmi? Biz bilan bog'laning!
          </p>
        </div>

        {/* Search box */}
        <div className="relative mb-10">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Savolni izlang..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#13132A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xl"
            >×</button>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {faqs.map(cat => (
            <div
              key={cat.category}
              className={`p-3 rounded-xl border text-center cursor-pointer hover:scale-105 transition-all duration-200 ${colorMap[cat.color]}`}
              onClick={() => setSearch(cat.category.split(' ')[0])}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-xs font-bold leading-tight">{cat.category}</div>
            </div>
          ))}
        </div>

        {/* FAQ sections */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🤔</div>
            <p className="font-semibold">Hech narsa topilmadi</p>
            <p className="text-sm mt-1">Boshqa kalit so'z bilan izlang yoki biz bilan bog'laning.</p>
          </div>
        ) : (
          filtered.map(cat => (
            <div key={cat.category} className="mb-8">
              <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-xl border text-xs font-bold ${colorMap[cat.color]}`}>
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </div>
              <div className="space-y-2 bg-[#13132A] rounded-2xl p-4 border border-[#1E1E3A]">
                {cat.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))
        )}

        {/* Contact Section */}
        <div className="mt-10 bg-#13132A border border-[#1E1E3A] rounded-3xl p-8">
          <h2 className="text-white font-bold text-xl text-center mb-2">Hali ham yordam kerakmi?</h2>
          <p className="text-gray-500 text-sm text-center mb-8">Ushbu kanallar orqali biz bilan bog'laning:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="mailto:damiovanvar475@gmail.com"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1E1E3A] bg-red-600/5 hover:bg-red-600/10 hover:border-red-500/30 transition-all text-center group"
            >
              <span className="text-3xl">📧</span>
              <div>
                <div className="text-white text-sm font-bold group-hover:text-red-400 transition-colors">Email</div>
                <div className="text-gray-500 text-xs mt-0.5">damiovanvar475@gmail.com</div>
              </div>
            </a>
            <a
              href="https://t.me/asl_o_1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1E1E3A] bg-sky-600/5 hover:bg-sky-600/10 hover:border-sky-500/30 transition-all text-center group"
            >
              <span className="text-3xl">✈️</span>
              <div>
                <div className="text-white text-sm font-bold group-hover:text-sky-400 transition-colors">Telegram</div>
                <div className="text-gray-500 text-xs mt-0.5">@asl_o_1</div>
              </div>
            </a>
            <a
              href="tel:+998880321031"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1E1E3A] bg-green-600/5 hover:bg-green-600/10 hover:border-green-500/30 transition-all text-center group"
            >
              <span className="text-3xl">📞</span>
              <div>
                <div className="text-white text-sm font-bold group-hover:text-green-400 transition-colors">Telefon</div>
                <div className="text-gray-500 text-xs mt-0.5">+998 88 032 1031</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
