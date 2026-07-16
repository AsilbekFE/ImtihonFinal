import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Section = ({ number, title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-[#1E1E3A] rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#13132A] hover:bg-[#1a1a35] transition-colors text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-black flex items-center justify-center flex-shrink-0">
            {number}
          </span>
          <h2 className="text-white font-bold text-sm sm:text-base">{title}</h2>
        </div>
        <span className={`text-gray-500 text-lg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-[#0D0D1A]/60 text-gray-400 text-sm leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

const TermsPage = () => {
  const { t } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* BG glows */}
      <div className="fixed top-1/4 left-0 w-[500px] h-[500px] bg-purple-700/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto fade-up">
        {/* Header */}
        <div className="text-center mb-12 mt-4">
          <span className="inline-block text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-600/10 px-3 py-1 rounded-full border border-purple-500/20 mb-4">
            Huquqiy hujjat
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Foydalanish <span className="text-gradient">Shartlari</span>
          </h1>
          <p className="text-gray-500 text-sm">
            So'nggi yangilanish: <span className="text-gray-400">1-yanvar 2024-yil</span>
          </p>
        </div>

        {/* Intro banner */}
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <span className="text-2xl mt-0.5">📋</span>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Muhim eslatma</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              LuminaEdu platformasidan foydalanishni boshlash orqali siz quyida keltirilgan barcha foydalanish
              shartlariga rozi bo'ldingiz. Iltimos, ularni diqqat bilan o'qib chiqing.
            </p>
          </div>
        </div>

        {/* Sections */}
        <Section number="1" title="Umumiy qoidalar">
          <p>
            LuminaEdu — onlayn ta'lim platformasi bo'lib, foydalanuvchilarga HTML, CSS, JavaScript va React kabi
            zamonaviy web texnologiyalarni o'rganish imkoniyatini taqdim etadi.
          </p>
          <p>
            Ushbu shartlar LuminaEdu va foydalanuvchi o'rtasidagi barcha munosabatlarni tartibga soladi. Platforma
            xizmatlaridan foydalanish uchun siz kamida 13 yoshda bo'lishingiz shart.
          </p>
        </Section>

        <Section number="2" title="Ro'yxatdan o'tish va hisob">
          <p>Platformadan foydalanish uchun <strong className="text-white">@gmail.com</strong> email manzili orqali ro'yxatdan o'tishingiz shart.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Hisob ma'lumotlaringiz maxfiyligini saqlash mas'uliyati sizda.</li>
            <li>Bir foydalanuvchi uchun faqat bitta hisob yaratilishi mumkin.</li>
            <li>Soxta ma'lumotlar bilan ro'yxatdan o'tish taqiqlanadi.</li>
            <li>Hisobingizni boshqalarga topshirish mumkin emas.</li>
          </ul>
        </Section>

        <Section number="3" title="Intellektual mulk huquqlari">
          <p>
            Platformadagi barcha kurs materiallari, rasmlar, kodlar, videolar va matnlar LuminaEdu'ga tegishli
            va mualliflik huquqi bilan himoyalangan.
          </p>
          <p>
            Foydalanuvchilar materiallarni shaxsiy o'rganish maqsadida foydalanishi mumkin. Tijoriy maqsadlarda
            nusxalash, tarqatish yoki o'zgartirish qat'iyan <strong className="text-red-400">taqiqlanadi</strong>.
          </p>
        </Section>

        <Section number="4" title="To'lov va qaytarish siyosati">
          <p>Premium kurslar uchun to'lov amalga oshirilgandan so'ng:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>To'lovdan keyingi <strong className="text-white">7 kun</strong> ichida to'liq qaytarish imkoni mavjud.</li>
            <li>Kursning 30% yoki undan ko'pi ko'rilganda qaytarish qilinmaydi.</li>
            <li>Texnik nosozlik sababli kurs ishlamagan taqdirda to'liq qaytarish amalga oshiriladi.</li>
          </ul>
        </Section>

        <Section number="5" title="Foydalanuvchi majburiyatlari">
          <p>Platforma foydalanuvchilari quyidagilarni <strong className="text-red-400">amalga oshirmasligi</strong> shart:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Platformaga zarar yetkazuvchi harakatlar (hacking, spam va h.k.)</li>
            <li>Boshqa foydalanuvchilarni bezovta qilish yoki haqorat qilish</li>
            <li>Platformani noto'g'ri maqsadlarda ishlatish</li>
            <li>Qonunga xilof materiallar joylashtirish</li>
          </ul>
        </Section>

        <Section number="6" title="Maxfiylik siyosati">
          <p>
            LuminaEdu foydalanuvchi ma'lumotlarini uchinchi shaxslarga bermaydi. Sizning ma'lumotlaringiz
            faqat platformaning ishlashi va takomillashtirilishi uchun ishlatiladi.
          </p>
          <p>
            Cookie fayllar faqat sessiyani saqlash va statistika yig'ish uchun ishlatiladi.
            Batafsil ma'lumot uchun <a href="#" className="text-purple-400 hover:underline">Maxfiylik siyosatimiz</a> bilan tanishing.
          </p>
        </Section>

        <Section number="7" title="Shartlarning o'zgarishi">
          <p>
            LuminaEdu ushbu shartlarni istalgan vaqt o'zgartirish huquqini o'zida saqlab qoladi.
            Muhim o'zgarishlar haqida foydalanuvchilarga email orqali xabar beriladi.
          </p>
          <p>O'zgartirishlardan keyin platformadan foydalanishni davom ettirish yangi shartlarni qabul qilish hisoblanadi.</p>
        </Section>

        {/* Contact box */}
        <div className="mt-8 bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Savollaringiz bormi?</h3>
          <p className="text-gray-500 text-sm mb-4">Huquqiy masalalar bo'yicha bizga murojaat qiling.</p>
          <a
            href="mailto:damiovanvar475@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-400 text-sm font-semibold hover:bg-purple-600/25 transition-all"
          >
            📧 damiovanvar475@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
