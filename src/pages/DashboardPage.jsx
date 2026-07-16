import React, { useContext } from 'react';
import { Link } from '../router/hashRouter';
import { AppContext } from '../context/AppContext';

const DashboardPage = () => {
  const { user, t } = useContext(AppContext);

  const totalCourses = user?.purchasedCourses?.length || 0;
  const completedCourses = user?.purchasedCourses?.filter(c => c.status === 'COMPLETED').length || 0;
  const testResults = user?.testResults || [];
  const avgScore = testResults.length > 0
    ? Math.round(testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length)
    : 0;

  const stats = [
    { label: "Kurslar", value: totalCourses, icon: '📚', color: 'bg-purple-600' },
    { label: "Tugallangan", value: completedCourses, icon: '✅', color: 'bg-cyan-600' },
    { label: "Testlar", value: testResults.length, icon: '📝', color: 'bg-orange-600' },
    { label: "O'rtacha ball", value: avgScore + '%', icon: '⭐', color: 'bg-green-600' },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto fade-up">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-600/10 px-3 py-1 rounded-full border border-purple-500/20">
            Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-2">
            Xush kelibsiz, <span className="text-gradient">{user?.name || 'Foydalanuvchi'}</span> 👋
          </h1>
          <p className="text-gray-400 text-sm">Bu yerda o'z rivojlanishingizni kuzatib boring.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 flex flex-col gap-3">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-xs font-semibold mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Kurslarim", desc: "Sotib olingan kurslarga o'ting", icon: '📖', to: '/learning', color: 'bg-purple-600' },
            { title: "Testlar", desc: "Bilimingizni sinab ko'ring", icon: '🧪', to: '/test', color: 'bg-cyan-600' },
            { title: "Topshiriqlar", desc: "Kod yozib ko'nikma oshiring", icon: '💻', to: '/tasks', color: 'bg-orange-600' },
            { title: "Sertifikatlar", desc: "Muvaffaqiyatlaringizni ko'ring", icon: '🏆', to: '/certificates', color: 'bg-green-600' },
            { title: "Profil", desc: "Ma'lumotlaringizni tahrirlang", icon: '👤', to: '/profile', color: 'bg-pink-600' },
            { title: "To'lov", desc: "Yangi kurs sotib oling", icon: '💳', to: '/learning', color: 'bg-indigo-600' },
          ].map((item) => (
            <Link
              key={item.to + item.title}
              to={item.to}
              className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 flex items-center gap-4 hover:border-purple-500/50 hover:scale-[1.02] transition-all group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <div className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">{item.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
