import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import reactCourseCard from '../assets/react_course_card.png';

const allCourses = [
  {
    id: 1,
    category: 'Frontend',
    tag: 'React.js',
    title: 'Modern React.js: From Zero to Mastery',
    lessons: 62,
    students: '1.2k',
    rating: 4.8,
    price: '499,000 UZS',
    imageSrc: reactCourseCard
  },
  {
    id: 2,
    category: 'Backend',
    tag: 'Node.js',
    title: 'Backend Development Masterclass',
    lessons: 48,
    students: '850',
    rating: 4.5,
    price: '550,000 UZS',
    color: 'from-green-600 to-emerald-700',
    icon: '🖥️',
  },
  {
    id: 3,
    category: 'Frontend',
    tag: 'JavaScript',
    title: 'JavaScript Mastery: ES6+ Deep Dive',
    lessons: 36,
    students: '2.4k',
    rating: 5.0,
    price: '399,000 UZS',
    color: 'from-yellow-500 to-orange-600',
    icon: '🟨',
  },
  {
    id: 4,
    category: 'Backend',
    tag: 'Python',
    title: "Python Django: Professional API's",
    lessons: 54,
    students: '980',
    rating: 4.7,
    price: '480,000 UZS',
    color: 'from-blue-600 to-indigo-700',
    icon: '🐍',
  },
  {
    id: 5,
    category: 'Frontend',
    tag: 'UI/UX',
    title: 'Zamonaviy UI/UX Dizayn: Figma Pro',
    lessons: 40,
    students: '1.8k',
    rating: 4.9,
    price: '450,000 UZS',
    color: 'from-purple-600 to-pink-700',
    icon: '🎨',
  },
  {
    id: 6,
    category: 'Backend',
    tag: 'Database',
    title: "SQL & PostgreSQL: Ma'lumotlar Bazasi",
    lessons: 28,
    students: '650',
    rating: 4.6,
    price: '320,000 UZS',
    color: 'from-teal-600 to-cyan-700',
    icon: '🗄️',
  },
];

const categories = ['All Courses', 'Frontend', 'Backend', 'Mobile', 'UI/UX Design'];


const LearningPage = () => {
  const { buyCourse, t } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playlistState, setPlaylistState] = useState([
    { id: 'Ke90Tje7VS0', title: 'React JS Crash Course', duration: '1:00:22', active: true },
    { id: 'SqcY0GlETPk', title: 'React Hooks Deep Dive', duration: '22:10', active: false },
    { id: 'dGcsHMXbSOA', title: 'React Router Tutorial', duration: '45:15', active: false },
    { id: 'LDB4uaJ87e0', title: 'Redux Toolkit Tutorial', duration: '32:40', active: false },
    { id: 'T2X4yU6n8M4', title: 'Next.js Modern Features', duration: '28:30', active: false },
  ]);

  const activeVideo = playlistState.find(item => item.active) || playlistState[0];

  const levels = [t('levelBeginner'), t('levelIntermediate'), t('levelProfessional')];


  const toggleLevel = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const filtered = allCourses.filter((c) => {
    const catMatch = activeCategory === 'All Courses' || c.category === activeCategory || c.tag === activeCategory;
    return catMatch;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16">
      {/* Video Player */}
      <div className="bg-[#07070F] border-b border-[#1E1E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Video */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative bg-[#13132A] rounded-2xl overflow-hidden aspect-video border border-[#1E1E3A] group">
                {isPlaying ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070F] via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 bg-purple-600/80 backdrop-blur-sm border-2 border-purple-400/40 rounded-full flex items-center justify-center hover:bg-purple-500 transition-all hover:scale-110 shadow-lg shadow-purple-500/30 text-white"
                      >
                        <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Video Details */}
              <div className="p-4 bg-[#13132A] rounded-2xl border border-[#1E1E3A] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-2">
                    {t('ongoingLesson')}
                  </span>
                  <h2 className="text-xl font-bold text-white leading-tight">{activeVideo.title}</h2>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm bg-[#1E1E3A] px-3 py-1.5 rounded-lg border border-[#1E1E3A]">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{activeVideo.duration}</span>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-4 border-b border-[#1E1E3A]">
                <h3 className="text-white font-bold">{t('playlist')}</h3>
              </div>
              <div className="overflow-y-auto divide-y divide-[#1E1E3A]/50 flex-1 max-h-[300px] lg:max-h-[350px]">
                {playlistState.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setPlaylistState(prev => prev.map((val, idx) => ({
                        ...val,
                        active: idx === i
                      })));
                      setIsPlaying(true);
                    }}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-purple-600/10 ${item.active ? 'bg-purple-600/15 border-l-4 border-l-purple-500' : ''
                      }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${item.active
                      ? 'bg-purple-600 text-white animate-pulse'
                      : 'bg-[#1E1E3A] text-gray-400'
                      }`}>
                      {item.active ? '▶' : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${item.active ? 'text-purple-300 font-semibold' : 'text-gray-400'}`}>
                        {item.title}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs flex-shrink-0">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">{t('categories')}</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:bg-[#1E1E3A] hover:text-white'
                      }`}
                  >
                    <span className="text-lg">
                      {cat === 'All Courses' ? '📚' : cat === 'Explore' ? '🖥️' : cat === 'Backend' ? '⚙️' : cat === 'Mobile' ? '📱' : '✏️'}
                    </span>
                    {cat === 'All Courses' ? t('allCourses') : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-4">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">{t('level')}</h3>
              <div className="space-y-2">
                {levels.map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => toggleLevel(level)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${selectedLevels.includes(level)
                        ? 'bg-purple-600 border-purple-600'
                        : 'border-gray-600 group-hover:border-purple-500'
                        }`}
                    >
                      {selectedLevels.includes(level) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {activeCategory} <span className="text-gray-500 font-normal text-base">({filtered.length} ta kurs)</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {displayed.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl overflow-hidden hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="h-36 relative overflow-hidden flex items-center justify-center bg-[#0D0D1A]">
                    {course.imageSrc ? (
                      <img 
                        src={course.imageSrc} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                        <span className="text-5xl">{course.icon}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full font-semibold z-10">
                      {course.tag}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-3 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.lessons} {t('hours')}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {course.students} {t('studentsText')}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-yellow-400">{course.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-bold text-sm">{course.price}</span>
                      <button
                        onClick={() => buyCourse({
                          title: course.title,
                          category: course.category,
                          priceVal: parseInt(course.price.replace(/[^0-9]/g, '')),
                          discountVal: Math.round(parseInt(course.price.replace(/[^0-9]/g, '')) * 0.1),
                          icon: course.icon,
                          color: course.color
                        })}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-semibold hover:from-purple-500 hover:to-purple-600 transition-all"
                      >
                        {t('buy')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1E1E3A] text-gray-300 hover:border-purple-500/50 hover:text-white hover:bg-purple-600/10 transition-all font-medium"
                >
                  {showAll ? t('showLess') : t('loadMore')}
                  <svg className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
