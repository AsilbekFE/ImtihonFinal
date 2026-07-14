import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const { isLoggedIn, user, updateProfile, logout, t } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editSurname, setEditSurname] = useState(user?.surname || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [selectedCourseCert, setSelectedCourseCert] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  // If not logged in, show friendly prompt screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] pt-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
            🔒
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{t('restrictedTitle')}</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {t('restrictedDesc')}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm hover:opacity-90 transition-all glow-purple"
            >
              {t('login')}
            </button>
            <Link
              to="/"
              className="block w-full py-3 rounded-xl border border-[#1E1E3A] text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
            >
              {t('backBtn')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(editName, editSurname, editAvatar);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-[#13132A] to-[#1a0c35] border border-purple-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Avatar & Name */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 overflow-hidden bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-black text-4xl shadow-xl">
                  {editAvatar ? (
                    <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                {/* Level badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider border-2 border-[#13132A] shadow-lg flex items-center gap-1">
                  <span>★</span> {t('levelBadge')}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-black text-white">{user.name} {user.surname}</h1>
                <p className="text-gray-400 text-sm mt-1">{user.title || t('userTitle')}</p>
                
                {/* Header mini stats */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                  <span className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/20 text-xs font-semibold flex items-center gap-1.5">
                    <span>🎒</span> {user.purchasedCourses.length} {t('purchasedText')}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/20 text-xs font-semibold flex items-center gap-1.5">
                    <span>✓</span> 12 {t('completedText')}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditName(user.name);
                  setEditSurname(user.surname);
                  setEditAvatar(user.avatar);
                  setIsEditing(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors text-white text-sm font-semibold flex items-center gap-2 text-white-force"
              >
                <span>✏️</span> {t('editProfile')}
              </button>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-[#1E1E3A] hover:bg-red-900/20 hover:text-red-400 transition-all border border-purple-500/10 text-gray-400 text-sm font-semibold flex items-center gap-2"
              >
                <span>🚪</span> {t('settings')}
              </button>
            </div>
          </div>
        </div>

        {/* Edit profile modal/form */}
        {isEditing && (
          <div className="bg-[#13132A] border border-purple-500/30 rounded-3xl p-6 relative">
            <h3 className="text-white font-bold text-lg mb-4">{t('editTitle')}</h3>
            <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">{t('nameLabel')}</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">{t('surnameLabel')}</label>
                <input
                  type="text"
                  required
                  value={editSurname}
                  onChange={(e) => setEditSurname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-xs font-semibold mb-2">{t('avatarLabel')}</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.jpg"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-[#1E1E3A] hover:bg-[#28284e] text-gray-400 text-sm font-semibold transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-bold transition-all glow-purple"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Columns - Mening kurslarim */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>📚</span> {t('myCourses')}
              </h2>
              <Link to="/learning" className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors">
                {t('seeAll')}
              </Link>
            </div>

            {user.purchasedCourses.length === 0 ? (
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 text-center text-gray-500">
                {t('noCourses')} <Link to="/learning" className="text-purple-400 underline">{t('seeCourses')}</Link>.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {user.purchasedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge / Icon */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color || 'from-purple-600 to-pink-600'} flex items-center justify-center text-2xl`}>
                          {course.image || '🎨'}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          course.status === 'COMPLETED'
                            ? 'bg-green-600/10 border-green-500/20 text-green-400'
                            : 'bg-purple-600/10 border-purple-500/20 text-purple-400'
                        }`}>
                          {course.status === 'COMPLETED' ? t('statusCompleted') : t('statusActive')}
                        </span>
                      </div>

                      <h3 className="text-white font-bold text-base mb-2 leading-snug">{course.title}</h3>
                      <p className="text-gray-500 text-xs mb-4">{course.lessons}</p>

                      {/* Progress bar */}
                      <div className="space-y-1 mb-6">
                        <div className="flex justify-between text-xs text-gray-400 font-semibold">
                          <span>{t('progressLabel')}</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-[#0D0D1A] rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${course.status === 'COMPLETED' ? 'from-green-500 to-emerald-400' : 'from-purple-600 to-cyan-500'}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      onClick={() => {
                        if (course.status === 'COMPLETED') {
                          setSelectedCourseCert(course);
                        } else {
                          navigate('/learning');
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                        course.status === 'COMPLETED'
                          ? 'bg-[#1E1E3A] border border-green-500/30 text-green-400 hover:bg-green-600/10'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:opacity-90 glow-purple'
                      }`}
                    >
                      {course.status === 'COMPLETED' ? t('downloadCert') : t('continueText')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Test natijalari & Stats */}
          <div className="space-y-6">
            
            {/* Test Natijalari Box */}
            <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-5 space-y-4">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 mb-2">
                <span>📝</span> {t('testResults')}
              </h2>

              <div className="space-y-3">
                {user.testResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 rounded-2xl bg-[#0D0D1A] border border-[#1E1E3A] hover:border-purple-500/20 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-bold text-sm leading-tight">{result.title}</h4>
                        <span className="text-gray-500 text-[10px] tracking-wide uppercase font-semibold">{result.date}</span>
                      </div>
                      <span className="text-xl font-black text-purple-400">{result.score}%</span>
                    </div>

                    <div className="flex gap-3 text-[10px] text-gray-400 border-t border-[#1E1E3A]/80 pt-2 mt-2">
                      <span>{t('grammarLabel')}: <b className="text-purple-300">{result.grammar}%</b></span>
                      <span>{t('logicLabel')}: <b className="text-cyan-300">{result.logic}%</b></span>
                      {result.timeSpent && <span>{t('timeLabel')}: <b className="text-white">{result.timeSpent}</b></span>}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/test')}
                className="w-full py-3 rounded-xl border border-[#1E1E3A] text-gray-400 hover:text-white hover:border-purple-500/20 transition-all text-xs font-semibold text-center"
              >
                {t('allTests')}
              </button>
            </div>

            {/* Bottom mini status cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">🏅</div>
                <div className="text-2xl font-black text-white">5</div>
                <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">{t('achievements')}</div>
              </div>
              <div className="bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-2xl font-black text-white">42s</div>
                <div className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">{t('learningHours')}</div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Dynamic Print Styles injected self-contained */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-cert-area, #printable-cert-area * {
            visibility: visible !important;
          }
          #printable-cert-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 99999 !important;
            background: #ffffff !important;
            color: #000000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal for completed course Certificate display */}
      {selectedCourseCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 no-print">
          <div className="w-full max-w-4xl bg-[#090915] border border-[#1E1E3A] rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Actions */}
            <div className="p-4 border-b border-[#1E1E3A] flex justify-between items-center gap-4 bg-[#13132A]">
              <span className="text-white font-bold text-sm">Sertifikatni ko'rish</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-xl transition-all"
                >
                  🖨️ Chop etish / PDF yuklash
                </button>
                <button
                  onClick={() => setSelectedCourseCert(null)}
                  className="px-4 py-2 bg-[#1E1E3A] hover:bg-[#2D2D54] text-gray-300 text-xs font-bold rounded-xl transition-all"
                >
                  Yopish
                </button>
              </div>
            </div>

            {/* Certificate Area */}
            <div className="p-6 md:p-12 overflow-x-auto flex justify-center bg-[#07070F]">
              <div 
                id="printable-cert-area" 
                className="w-[800px] h-[560px] bg-gradient-to-br from-[#FAF7EE] via-[#FFFDF6] to-[#F3ECD8] text-slate-800 p-8 border-[12px] border-double border-yellow-700 rounded-lg relative flex flex-col justify-between shadow-2xl flex-shrink-0"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {/* Corner Ornaments */}
                <div className="absolute top-2 left-2 text-yellow-800 text-2xl font-bold">✥</div>
                <div className="absolute top-2 right-2 text-yellow-800 text-2xl font-bold">✥</div>
                <div className="absolute bottom-2 left-2 text-yellow-800 text-2xl font-bold">✥</div>
                <div className="absolute bottom-2 right-2 text-yellow-800 text-2xl font-bold">✥</div>

                {/* Inner Border */}
                <div className="absolute inset-4 border border-yellow-700/40 pointer-events-none" />

                {/* Header */}
                <div className="text-center mt-4">
                  <div className="text-yellow-800 text-[10px] tracking-[6px] font-sans font-bold mb-1">
                    LUMINAEDU ONLINE ACADEMY
                  </div>
                  <h2 className="text-yellow-700 text-3xl font-black tracking-widest font-sans border-b-2 border-yellow-700/30 pb-3 inline-block">
                    BITIRGANLIK SERTIFIKATI
                  </h2>
                </div>

                {/* Body Text */}
                <div className="text-center px-8 mt-2">
                  <p className="text-slate-500 text-xs italic mb-4">
                    Ushbu sertifikat egasini taqdirlaydi
                  </p>
                  
                  {/* Student Name */}
                  <h1 className="text-4xl font-extrabold tracking-wide text-slate-900 border-b border-slate-300 pb-2 inline-block px-10 mb-4 capitalize" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {user.name} {user.surname}
                  </h1>

                  <p className="text-slate-500 text-xs max-w-lg mx-auto mb-4 leading-relaxed">
                    quyidagi professional o'quv kurs dasturini muvaffaqiyatli yakunladi:
                  </p>

                  {/* Course / Subject */}
                  <h3 className="text-2xl font-black text-slate-800 tracking-wide mb-3">
                    {selectedCourseCert.title}
                  </h3>

                  <p className="text-slate-500 text-xs">
                    umumiy o'quv natijalari ko'rsatkichi: <strong className="text-yellow-800 font-bold">100% ({selectedCourseCert.lessons})</strong>
                  </p>
                </div>

                {/* Footer seal and signatures */}
                <div className="flex justify-between items-end px-8 mb-4">
                  {/* Left Side: Verification */}
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-sans tracking-wider uppercase mb-1">
                      Sertifikat ID
                    </span>
                    <span className="block text-xs font-mono font-bold text-slate-700 select-all">
                      LUMINA-C-{selectedCourseCert.id.toUpperCase()}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-sans mt-1">
                      Berilgan sana: BUGUN
                    </span>
                  </div>

                  {/* Center: Gold Circular Seal */}
                  <div className="relative w-20 h-20 bg-yellow-600 rounded-full border-4 border-yellow-500 flex items-center justify-center shadow-lg transform rotate-6 border-dashed">
                    <div className="w-16 h-16 rounded-full border border-yellow-200/50 flex flex-col items-center justify-center text-white">
                      <span className="text-[14px] font-black">LUMINA</span>
                      <span className="text-[6px] tracking-widest font-sans font-bold">VERIFIED</span>
                    </div>
                  </div>

                  {/* Right Side: Signature */}
                  <div className="text-right">
                    <div className="inline-block border-b border-slate-300 pb-1 px-4 mb-1">
                      <span className="text-sm text-yellow-800 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
                        Alisher Navoiy
                      </span>
                    </div>
                    <span className="block text-[9px] text-slate-400 font-sans tracking-wide uppercase">
                      LuminaEdu sertifikatlash komissiyasi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
