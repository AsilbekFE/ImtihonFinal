import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const initialNotifications = [
  {
    id: 1,
    type: 'course', // course, system, payment, achievement
    icon: '📚',
    title: {
      uz: 'Yangi dars qo\'shildi!',
      ru: 'Добавлен новый урок!',
      en: 'New lesson added!'
    },
    message: {
      uz: '"Modern React.js" kursiga "Suspense & Error Boundaries" darsi joylandi.',
      ru: 'В курс "Modern React.js" добавлен урок "Suspense & Error Boundaries".',
      en: 'The lesson "Suspense & Error Boundaries" has been added to "Modern React.js".'
    },
    time: {
      uz: 'Hozirgi o\'zida',
      ru: 'Только что',
      en: 'Just now'
    },
    read: false,
    color: 'from-purple-600 to-indigo-600'
  },
  {
    id: 2,
    type: 'achievement',
    icon: '🏆',
    title: {
      uz: 'Sertifikat taqdim etildi!',
      ru: 'Сертификат готов!',
      en: 'Certificate Issued!'
    },
    message: {
      uz: '"Zamonaviy UI/UX Dizayn: Figma Pro" kursini yakunlaganingiz munosabati bilan sertifikat berildi.',
      ru: 'Выдан сертификат за окончание курса "Zamonaviy UI/UX Dizayn: Figma Pro".',
      en: 'Certificate issued for completing the course "Zamonaviy UI/UX Dizayn: Figma Pro".'
    },
    time: {
      uz: '2 soat avval',
      ru: '2 часа назад',
      en: '2 hours ago'
    },
    read: false,
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 3,
    type: 'payment',
    icon: '💳',
    title: {
      uz: 'To\'lov muvaffaqiyatli bajarildi!',
      ru: 'Оплата прошла успешно!',
      en: 'Payment Successful!'
    },
    message: {
      uz: '"Modern React.js: From Zero to Mastery" kursi uchun to\'lovingiz tasdiqlandi. Kurs faollashtirildi!',
      ru: 'Ваш платеж за курс "Modern React.js" подтвержден. Доступ открыт!',
      en: 'Your payment for "Modern React.js" course has been confirmed. Access unlocked!'
    },
    time: {
      uz: 'Kecha, 18:30',
      ru: 'Вчера, 18:30',
      en: 'Yesterday, 18:30'
    },
    read: true,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 4,
    type: 'system',
    icon: '⚡',
    title: {
      uz: 'Profil sozlandi!',
      ru: 'Профиль настроен!',
      en: 'Profile Updated!'
    },
    message: {
      uz: 'Siz muvaffaqiyatli ro\'yxatdan o\'tdingiz va profilingiz tizimda faollashtirildi.',
      ru: 'Вы успешно зарегистрировались и активировали свой профиль.',
      en: 'You have successfully registered and activated your profile.'
    },
    time: {
      uz: '3 kun avval',
      ru: '3 дня назад',
      en: '3 days ago'
    },
    read: true,
    color: 'from-blue-600 to-cyan-600'
  }
];

const NotificationsPage = () => {
  const { lang, t } = useContext(AppContext);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all'); // all, system, course, payment, achievement

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: !notif.read } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    return notif.type === activeTab;
  });

  const getTabLabel = (tabKey) => {
    const labels = {
      all: { uz: 'Hammasi', ru: 'Все', en: 'All' },
      system: { uz: 'Tizim', ru: 'Система', en: 'System' },
      course: { uz: 'Kurslar', ru: 'Курсы', en: 'Courses' },
      payment: { uz: 'To\'lovlar', ru: 'Платежи', en: 'Payments' },
      achievement: { uz: 'Yutuqlar', ru: 'Достижения', en: 'Achievements' }
    };
    return labels[tabKey][lang] || labels[tabKey]['uz'];
  };

  const pageTitle = {
    uz: 'Bildirishnomalar',
    ru: 'Уведомления',
    en: 'Notifications'
  };

  const pageDesc = {
    uz: 'Tizimdagi eng so\'nggi o\'zgarishlar, darslar va to\'lovlar haqidagi xabarlar.',
    ru: 'Последние изменения в системе, уведомления об уроках и платежах.',
    en: 'Latest updates in the system, lesson alerts and payment notifications.'
  };

  const markAllReadText = {
    uz: 'Hammasini o\'qilgan qilish',
    ru: 'Отметить все как прочитанные',
    en: 'Mark all as read'
  };

  const clearAllText = {
    uz: 'Hammasini o\'chirish',
    ru: 'Очистить все',
    en: 'Clear all'
  };

  const emptyText = {
    uz: 'Hech qanday bildirishnomalar mavjud emas',
    ru: 'Нет доступных уведомлений',
    en: 'No notifications available'
  };

  const emptySubText = {
    uz: 'Yangi xabarlar paydo bo\'lganda, ular shu yerda ko\'rsatiladi.',
    ru: 'Когда появятся новые уведомления, они будут отображаться здесь.',
    en: 'When new notifications arrive, they will appear here.'
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16 px-4 py-12">
      <div className="max-w-4xl mx-auto fade-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-4">
              🔔 {pageTitle[lang] || pageTitle['uz']}
            </div>
            <h1 className="text-4xl font-black text-white mb-2">
              {pageTitle[lang] || pageTitle['uz']}
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">{pageDesc[lang] || pageDesc['uz']}</p>
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-3">
              <button 
                onClick={markAllAsRead}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors bg-[#13132A] border border-[#1E1E3A] px-3.5 py-2 rounded-xl"
              >
                {markAllReadText[lang] || markAllReadText['uz']}
              </button>
              <button 
                onClick={clearAll}
                className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-xl"
              >
                {clearAllText[lang] || clearAllText['uz']}
              </button>
            </div>
          )}
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#1E1E3A] pb-4">
          {['all', 'system', 'course', 'payment', 'achievement'].map(tab => {
            const count = tab === 'all' 
              ? notifications.length 
              : notifications.filter(n => n.type === tab).length;
            
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#13132A] text-gray-400 hover:text-white border border-[#1E1E3A]'
                }`}
              >
                {getTabLabel(tab)} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => toggleRead(notif.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start ${
                  notif.read 
                    ? 'bg-[#13132A]/50 border-[#1E1E3A]/60 opacity-75 hover:opacity-100' 
                    : 'bg-[#13132A] border-purple-500/30 shadow-lg shadow-purple-900/5 hover:border-purple-500/50'
                }`}
              >
                {/* Icon wrapper */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${notif.color} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>
                  {notif.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <h3 className={`font-bold text-sm ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                      {notif.title[lang] || notif.title['uz']}
                    </h3>
                    <span className="text-[11px] text-gray-500 whitespace-nowrap">{notif.time[lang] || notif.time['uz']}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-300'}`}>
                    {notif.message[lang] || notif.message['uz']}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-center">
                  {!notif.read && (
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                  )}
                  <button
                    onClick={(e) => deleteNotification(notif.id, e)}
                    className="w-8 h-8 rounded-lg bg-[#1E1E3A]/50 border border-[#1E1E3A] flex items-center justify-center text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-all ml-2"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-16 text-center shadow-xl">
            <div className="text-7xl mb-6 animate-bounce">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {emptyText[lang] || emptyText['uz']}
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
              {emptySubText[lang] || emptySubText['uz']}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition-all duration-200 glow-purple"
            >
              📚 {t('explore')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
