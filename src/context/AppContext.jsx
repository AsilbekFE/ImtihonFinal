import React, { createContext, useState, useEffect } from 'react';
import { navigate } from '../router/hashRouter';
import { translations } from '../data/translations';

export const AppContext = createContext();

const initialCourses = [
  {
    id: 'c1',
    title: 'Advanced UI/UX Principles',
    progress: 65,
    lessons: '12/18 darslar',
    status: 'ACTIVE',
    image: '🎨',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'c2',
    title: 'AI & Modern Automation',
    progress: 100,
    lessons: '24/24 darslar',
    status: 'COMPLETED',
    image: '🤖',
    color: 'from-orange-600 to-red-600',
  }
];

const initialTestResults = [
  {
    id: 't1',
    title: 'Level Test: Upper-Int',
    date: 'BUGUN, 15:20',
    grammar: 80,
    logic: 95,
    score: 88,
    correct: 13,
    wrong: 2,
    timeSpent: '42s'
  },
  {
    id: 't2',
    title: 'UX Designer Entry',
    date: '12-OKTABR, 2023',
    grammar: 70,
    logic: 74,
    score: 72,
    correct: 11,
    wrong: 4,
    timeSpent: '1m 15s'
  }
];

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('lumina_theme');
    return saved || 'dark';
  });

  // Language state
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lumina_lang');
    return saved || 'uz';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('lumina_logged_in');
    return saved === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lumina_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alisher',
      surname: 'Navoiy',
      title: 'Front-end Developer & AI Enthusiast',
      avatar: '',
      email: 'alisher@lumina.edu',
      purchasedCourses: initialCourses,
      testResults: initialTestResults
    };
  });

  const [selectedCourse, setSelectedCourse] = useState({
    id: 'default',
    title: 'Full-stack Web Development',
    category: 'Professional Kurs',
    price: 1200000,
    discount: 120000,
    image: '💻',
    color: 'from-purple-600 to-cyan-500'
  });

  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync theme to DOM
  useEffect(() => {
    localStorage.setItem('lumina_theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  // Sync language to local storage
  useEffect(() => {
    localStorage.setItem('lumina_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('lumina_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('lumina_user', JSON.stringify(user));
  }, [user]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeLang = (newLang) => {
    if (['uz', 'ru', 'en'].includes(newLang)) {
      setLang(newLang);
    }
  };

  // Translation helper function
  const t = (key) => {
    const textDict = translations[lang] || translations['uz'];
    return textDict[key] || translations['uz'][key] || key;
  };

  const login = (email, password) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      email: email || 'user@example.com',
    }));
    navigate('/');
  };

  const register = (email, name, surname) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      email: email || 'user@example.com',
      name: name || 'Foydalanuvchi',
      surname: surname || '',
    }));
    navigate('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('lumina_logged_in');
    navigate('/login');
  };

  const updateProfile = (name, surname, avatar) => {
    setUser(prev => ({
      ...prev,
      name,
      surname,
      avatar: avatar || prev.avatar
    }));
  };

  const handleBuyCourse = (course) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      setSelectedCourse({
        id: course.id || Math.random().toString(),
        title: course.title,
        category: course.category || 'Professional Kurs',
        price: course.priceVal || 1200000,
        discount: course.discountVal || 120000,
        image: course.icon || '💻',
        color: course.color || 'from-purple-600 to-cyan-500'
      });
      navigate('/payment');
    }
  };

  const addPurchasedCourse = (courseInfo) => {
    setUser(prev => {
      if (prev.purchasedCourses.some(c => c.title === courseInfo.title)) {
        return prev;
      }
      return {
        ...prev,
        purchasedCourses: [
          ...prev.purchasedCourses,
          {
            id: courseInfo.id || Math.random().toString(),
            title: courseInfo.title,
            progress: 0,
            lessons: '0/24 darslar',
            status: 'ACTIVE',
            image: courseInfo.image || '💻',
            color: courseInfo.color || 'from-purple-600 to-cyan-500'
          }
        ]
      };
    });
  };

  const addTestResult = (title, score, correct, wrong, timeSpentSec) => {
    const minutes = Math.floor(timeSpentSec / 60);
    const seconds = timeSpentSec % 60;
    const timeSpentStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    setUser(prev => ({
      ...prev,
      testResults: [
        {
          id: Math.random().toString(),
          title: `Level Test: ${title}`,
          date: 'BUGUN, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          grammar: Math.round(score * 0.9),
          logic: Math.round(score * 1.1) > 100 ? 100 : Math.round(score * 1.1),
          score: score,
          correct: correct,
          wrong: wrong,
          timeSpent: timeSpentStr
        },
        ...prev.testResults
      ]
    }));
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      selectedCourse,
      showAuthModal,
      setShowAuthModal,
      theme,
      toggleTheme,
      lang,
      changeLang,
      t,
      login,
      register,
      logout,
      updateProfile,
      buyCourse: handleBuyCourse,
      addPurchasedCourse,
      addTestResult
    }}>
      {children}
    </AppContext.Provider>
  );
};
