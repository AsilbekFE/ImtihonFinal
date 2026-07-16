import React from 'react';
import { Link } from '../router/hashRouter';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0D0D1A] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-md" data-aos="fade-up">
        {/* 404 */}
        <div className="text-[120px] font-black leading-none text-gradient mb-4 select-none animate-float">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3" data-aos="fade-up" data-aos-delay="100">
          Sahifa topilmadi
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
          Siz izlayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>

        <Link
          to="/"
          data-aos="fade-up"
          data-aos-delay="300"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-600/20"
        >
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
