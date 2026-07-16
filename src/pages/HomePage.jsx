import React, { useState, useEffect, useContext } from 'react';
import { Link } from '../router/hashRouter';
import { AppContext } from '../context/AppContext';
import TechLogo from '../components/TechLogo';

const courses = [
  {
    id: 1,
    category: 'UI/UX Design',
    title: 'Zamonaviy UI/UX Dizayn asoslari',
    instructor: "Azizbek O'qumov",
    rating: 4.9,
    reviews: '(186)',
    lessons: 24,
    price: '$49.00',
    color: 'bg-purple-600',
    logoType: 'design',
  },
  {
    id: 2,
    category: 'Python',
    title: "Python: Nol dan Professional...",
    instructor: 'Shaxzod Rahimov',
    rating: 4.8,
    reviews: '(864)',
    lessons: 36,
    price: '$59.00',
    color: 'bg-cyan-600',
    logoType: 'python',
  },
  {
    id: 3,
    category: 'Marketing',
    title: 'SMM va Digital Marketing...',
    instructor: 'Malika Ahmedova',
    rating: 4.7,
    reviews: '(420)',
    lessons: 18,
    price: '$39.00',
    color: 'bg-green-600',
    logoType: 'marketing',
  },
  {
    id: 4,
    category: 'AI & Data',
    title: "Sun'iy Intellekt: Kelajak...",
    instructor: 'Botir Ziyadov',
    rating: 5.0,
    reviews: '(390)',
    lessons: 42,
    price: '$49.00',
    color: 'bg-orange-600',
    logoType: 'ai',
  },
];

const getFeatures = (t) => [
  {
    icon: '▶️',
    title: t('feat1Title'),
    desc: t('feat1Desc'),
  },
  {
    icon: '🏆',
    title: t('feat2Title'),
    desc: t('feat2Desc'),
  },
  {
    icon: '💡',
    title: t('feat3Title'),
    desc: t('feat3Desc'),
  },
];

const stats = [
  { value: '10,000+', translationKey: 'students' },
  { value: '50+', translationKey: 'coursesCount' },
  { value: '100+', translationKey: 'mentors' },
];

const mentors = [
  { id: 1, name: "Azizbek O'qumov", role: "UI/UX Art Director", company: "Google", avatar: "👨‍🎨", color: "bg-pink-500", age: 32, level: "Senior", available: true, bio: "10+ yillik tajribaga ega UI/UX dizayner. Google'ning yetakchi dizayn jamoasida ishlaydi. Figma, Sketch va boshqa dizayn vositalarini professional darajada egallagan." },
  { id: 2, name: "Shaxzod Rahimov", role: "Lead Python Developer", company: "Amazon", avatar: "👨‍💻", color: "bg-cyan-500", age: 29, level: "Lead", available: false, bio: "Python bo'yicha yetakchi dasturchi. Amazon'da backend arxitekturasini boshqaradi. Django, FastAPI va microservices tizimlarida katta tajriba." },
  { id: 3, name: "Malika Ahmedova", role: "Marketing Strategist", company: "Meta", avatar: "👩‍💼", color: "bg-green-500", age: 27, level: "Mid-Senior", available: true, bio: "Raqamli marketing va brend strategiyasi bo'yicha mutaxassis. Meta'da katta loyihalarni boshqaradi. SMM, SEO va analytics sohasida expert." },
  { id: 4, name: "Botir Ziyadov", role: "AI & ML Specialist", company: "OpenAI", avatar: "🤖", color: "bg-orange-500", age: 35, level: "Principal", available: true, bio: "Sun'iy intellekt va machine learning sohasida 12 yillik tajriba. OpenAI'da katta modellarni train qilish bilan shug'ullanadi. PyTorch va TensorFlow ustasi." },
  { id: 5, name: "Dilshod Karimov", role: "Senior Full-Stack Engineer", company: "Microsoft", avatar: "👨‍💻", color: "bg-purple-500", age: 31, level: "Senior", available: false, bio: "React, Node.js va Azure cloud bo'yicha professional dasturchi. Microsoft'da katta loyihalarni ishlab chiqadi. Full-stack arxitektura va DevOps tajribasi." }
];

const HomePage = () => {
  const { buyCourse, t } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMentorSlide, setCurrentMentorSlide] = useState(0);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [animating, setAnimating] = useState(false);
  const features = getFeatures(t);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % courses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentorSlide((prev) => (prev + 1) % mentors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrentSlide((prev) => (prev + dir + courses.length) % courses.length);
    setTimeout(() => setAnimating(false), 400);
  };

  const handleMentorSlide = (dir) => {
    setCurrentMentorSlide((prev) => (prev + dir + mentors.length) % mentors.length);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-700/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="fade-up" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-6" data-aos="zoom-in">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" />
                {t('newLessons')}
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white mb-6">
                {t('heroTitle').split(' ')[0]}{' '}
                <span className="text-gradient">{t('heroTitle').split(' ').slice(1, 3).join(' ')}</span>
                <br />
                {t('heroTitle').split(' ').slice(3).join(' ')}
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                {t('heroDesc')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/learning"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold transition-all duration-200 glow-purple hover:scale-105"
                >
                  {t('seeCourses')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1E1E3A] text-gray-300 font-semibold hover:border-purple-500/50 hover:text-white hover:bg-purple-600/10 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t('aboutPlatform')}
                </Link>
              </div>
            </div>

            {/* Right - Course card */}
            <div className="relative flex justify-center" data-aos="fade-left">
              <div className="relative w-full max-w-md">
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-[#13132A] border border-purple-500/40 rounded-xl px-3 py-2 flex items-center gap-2 animate-float shadow-xl">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-xs font-semibold">{t('profCert')}</span>
                </div>

                {/* Main card */}
                <div className="bg-[#13132A] border border-purple-500/20 rounded-2xl overflow-hidden shadow-2xl">
                  <div className={`h-52 ${courses[currentSlide].color} flex items-center justify-center relative`}>
                    <TechLogo type={courses[currentSlide].logoType} size="w-16 h-16" className="text-white" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-white/70 text-xs">{t('ongoing')}</div>
                      <div className="text-white text-sm font-bold">{courses[currentSlide].title}</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-400 font-semibold">{courses[currentSlide].category}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < Math.floor(courses[currentSlide].rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-gray-500 text-xs ml-1">{courses[currentSlide].reviews}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-xs">{courses[currentSlide].instructor}</p>
                        <p className="text-white font-bold text-lg">{courses[currentSlide].price}</p>
                      </div>
                      <button 
                        onClick={() => buyCourse({
                          title: courses[currentSlide].title,
                          category: courses[currentSlide].category,
                          priceVal: courses[currentSlide].price === '$49.00' ? 490000 : 590000,
                          discountVal: 49000,
                          logoType: courses[currentSlide].logoType,
                          color: courses[currentSlide].color
                        })}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold transition-all"
                      >
                        {t('buy')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slide dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {courses.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === currentSlide ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-gray-600 hover:bg-purple-500/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16" data-aos="fade-up" data-aos-delay="200">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#13132A]/80 border border-[#1E1E3A] rounded-xl p-5 text-center hover:border-purple-500/30 transition-all">
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs font-semibold tracking-widest">{t(stat.translationKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-20 bg-[#07070F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">{t('whyUs')}</p>
              <h2 className="text-4xl font-black text-white">
                {t('threeKeys').split(' ')[0]} <span className="text-gradient">{t('threeKeys').split(' ').slice(1).join(' ')}</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-xs text-sm">
              {t('whyDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-6 hover:border-purple-500/40 hover:bg-[#16163A] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR COURSES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-white">
              <span className="text-gray-400 font-normal">{t('popular')}</span> {t('popularCourses')}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleSlide(-1)}
                className="w-9 h-9 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleSlide(1)}
                className="w-9 h-9 rounded-lg bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl overflow-hidden hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className={`h-40 ${course.color} relative flex items-center justify-center`}>
                  <TechLogo type={course.logoType} size="w-12 h-12" className="text-white" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {course.category}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs">{course.rating} {course.reviews}</span>
                    <span className="text-gray-600 text-xs ml-auto">{course.lessons} {t('lessonsCount')}</span>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-3 leading-snug group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs">{course.instructor}</p>
                      <p className="text-purple-400 font-bold">{course.price}</p>
                    </div>
                    <button 
                      onClick={() => buyCourse({
                        title: course.title,
                        category: course.category,
                        priceVal: course.price === '$49.00' ? 490000 : course.price === '$59.00' ? 590000 : 390000,
                        discountVal: 39000,
                        logoType: course.logoType,
                        color: course.color
                      })}
                      className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 text-xs font-semibold hover:bg-purple-600 hover:text-white transition-all border border-purple-500/30"
                    >
                      {t('buy')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MENTORS SLIDER SECTION ===== */}
      <section className="py-20 bg-[#07070F]/50 border-t border-[#1E1E3A] mentors-dark-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div data-aos="fade-right">
              <span className="text-xs font-bold tracking-widest text-purple-400 uppercase bg-purple-600/10 px-3 py-1 rounded-full border border-purple-500/20">
                {t('mentors') || 'Mentors'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                Bizning professional <span className="text-gradient">mentorlarimiz</span>
              </h2>
            </div>
            
            {/* Controls */}
            <div className="flex gap-2" data-aos="fade-left">
              <button
                onClick={() => handleMentorSlide(-1)}
                className="w-10 h-10 rounded-xl bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleMentorSlide(1)}
                className="w-10 h-10 rounded-xl bg-[#13132A] border border-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 transition-all shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mentor Active Card Container with Slider animations */}
          <div className="relative overflow-hidden min-h-[220px]" data-aos="zoom-in">
            <div className="flex gap-6 justify-center items-center">
              {/* Show active and adjacent mentors for a nice slide carousel preview */}
              {[-1, 0, 1].map((offset) => {
                const index = (currentMentorSlide + offset + mentors.length) % mentors.length;
                const mentor = mentors[index];
                const isActive = offset === 0;

                return (
                  <div
                    key={mentor.id}
                    onClick={() => isActive && setSelectedMentor(mentor)}
                    className={`transition-all duration-500 rounded-3xl p-6 border flex flex-col sm:flex-row items-center gap-6 shadow-xl ${
                      isActive
                        ? 'bg-[#13132A] border-purple-500/30 scale-100 opacity-100 w-full max-w-xl z-10 cursor-pointer hover:border-purple-500/60'
                        : 'bg-[#13132A]/40 border-[#1E1E3A] scale-90 opacity-40 hidden md:flex w-72'
                    }`}
                  >
                    <div className={`w-20 h-20 rounded-2xl ${mentor.color} flex items-center justify-center text-4xl flex-shrink-0 shadow-lg`}>
                      {mentor.avatar}
                    </div>
                    <div className="text-center sm:text-left flex-1 min-w-0">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20">
                        {mentor.company}
                      </span>
                      <h4 className="text-white font-extrabold text-lg sm:text-xl mt-2 truncate">
                        {mentor.name}
                      </h4>
                      <p className="text-gray-400 text-sm font-medium mt-1">
                        {mentor.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {mentors.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentMentorSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentMentorSlide ? 'w-6 h-2 bg-purple-500' : 'w-2 h-2 bg-gray-700 hover:bg-purple-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-[#07070F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#13132A] border border-purple-500/20 rounded-3xl p-12 text-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
            </div>

            <h2 className="relative text-4xl lg:text-5xl font-black text-white mb-4">
              {t('ctaTitle').split(' ').slice(0, 2).join(' ')}{' '}
              <span className="text-gradient">{t('ctaTitle').split(' ').slice(2, 4).join(' ')}</span>{' '}
              {t('ctaTitle').split(' ').slice(4).join(' ')}
            </h2>
            <p className="relative text-gray-400 mb-8 text-lg">
              {t('ctaDesc')}
            </p>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-lg transition-all glow-purple hover:scale-105"
            >
              {t('registerNow')}
            </Link>
          </div>
        </div>
      </section>
      {/* Mentor Details Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedMentor(null)}>
          <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1E1E3A] flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-all text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl ${selectedMentor.color} flex items-center justify-center text-3xl shadow-lg`}>
                {selectedMentor.avatar}
              </div>
              <div>
                <h3 className="text-white font-black text-xl">{selectedMentor.name}</h3>
                <p className="text-gray-400 text-sm">{selectedMentor.role}</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-600/15 text-purple-400 border border-purple-500/20 mt-1 inline-block">
                  {selectedMentor.company}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-3 text-center">
                <div className="text-lg font-black text-white">{selectedMentor.age}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Yosh</div>
              </div>
              <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-3 text-center">
                <div className="text-lg font-black text-purple-400">{selectedMentor.level}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Daraja</div>
              </div>
              <div className={`bg-[#0D0D1A] border rounded-xl p-3 text-center ${selectedMentor.available ? 'border-green-500/30' : 'border-red-500/30'}`}>
                <div className={`text-lg font-black ${selectedMentor.available ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedMentor.available ? 'Bo\'sh' : 'Band'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Holat</div>
              </div>
            </div>

            <div className="bg-[#0D0D1A] border border-[#1E1E3A] rounded-xl p-4 mb-4">
              <p className="text-gray-400 text-sm leading-relaxed">{selectedMentor.bio}</p>
            </div>

            <button
              onClick={() => setSelectedMentor(null)}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-500 transition-all"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
