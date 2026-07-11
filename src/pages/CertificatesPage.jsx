import React, { useState, useContext } from 'react';
import { Link } from '../router/hashRouter';
import { AppContext } from '../context/AppContext';

const CertificatesPage = () => {
  const { user, lang, t } = useContext(AppContext);
  const [selectedCert, setSelectedCert] = useState(null);

  // Filter test results with passing score >= 70
  const certificates = user.testResults ? user.testResults.filter(result => result.score >= 70) : [];

  const handlePrint = () => {
    window.print();
  };

  const getSubjectName = (title) => {
    // Remove "Level Test: " prefix if present
    return title.replace('Level Test: ', '');
  };

  // Translations dictionary for certificate elements
  const certStrings = {
    title: {
      uz: 'Mening Sertifikatlarim',
      ru: 'Мои Сертификаты',
      en: 'My Certificates'
    },
    desc: {
      uz: 'Muvaffaqiyatli topshirilgan testlar bo\'yicha sertifikatlar ro\'yxati.',
      ru: 'Список сертификатов по успешно пройденным тестам.',
      en: 'List of certificates based on successfully passed tests.'
    },
    scoreLabel: {
      uz: 'Natija',
      ru: 'Результат',
      en: 'Score'
    },
    viewBtn: {
      uz: 'Sertifikatni ko\'rish',
      ru: 'Просмотреть сертификат',
      en: 'View Certificate'
    },
    certTitle: {
      uz: 'BITIRGANLIK SERTIFIKATI',
      ru: 'СЕРТИФИКАТ ОБ ОКОНЧАНИИ',
      en: 'CERTIFICATE OF COMPLETION'
    },
    certifiedText: {
      uz: 'Ushbu sertifikat egasini taqdirlaydi',
      ru: 'Настоящим подтверждается, что',
      en: 'This is to certify that'
    },
    courseText: {
      uz: 'quyidagi yo\'nalish bo\'yicha test imtihonini muvaffaqiyatli topshirdi:',
      ru: 'успешно сдал экзаменационный тест по направлению:',
      en: 'has successfully completed the assessment in the field of:'
    },
    scoreDetailedText: {
      uz: 'va umumiy ko\'rsatkichi',
      ru: 'с общим результатом',
      en: 'attaining a final score of'
    },
    gradeLabel: {
      uz: 'Bahosi',
      ru: 'Оценка',
      en: 'Grade'
    },
    dateLabel: {
      uz: 'Berilgan sana',
      ru: 'Дата выдачи',
      en: 'Date of Issue'
    },
    verifyLabel: {
      uz: 'Sertifikat ID',
      ru: 'ID Сертификата',
      en: 'Certificate ID'
    },
    printBtn: {
      uz: 'Chop etish / PDF yuklash',
      ru: 'Печать / Скачать PDF',
      en: 'Print / Download PDF'
    },
    closeBtn: {
      uz: 'Yopish',
      ru: 'Закрыть',
      en: 'Close'
    },
    emptyTitle: {
      uz: 'Sertifikatlar hozircha mavjud emas',
      ru: 'Сертификаты пока отсутствуют',
      en: 'No certificates available yet'
    },
    emptyText: {
      uz: 'Sertifikat olish uchun kamida bitta daraja testidan 70% yoki undan yuqori natija ko\'rsating.',
      ru: 'Для получения сертификата пройдите любой тест уровня на 70% или выше.',
      en: 'To receive a certificate, pass any level test with a score of 70% or higher.'
    },
    takeTest: {
      uz: 'Test topshirish',
      ru: 'Сдать тест',
      en: 'Take a Test'
    },
    authTitle: {
      uz: 'LuminaEdu sertifikatlash komissiyasi',
      ru: 'Сертификационная комиссия LuminaEdu',
      en: 'LuminaEdu Certification Authority'
    }
  };

  const getLabel = (key) => {
    return certStrings[key][lang] || certStrings[key]['uz'];
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16 px-4 py-12">
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

      <div className="max-w-5xl mx-auto fade-up">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-600/15 border border-yellow-500/30 text-yellow-400 text-xs font-semibold mb-4">
            🏆 {t('certBadge')}
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            {getLabel('title').split(' ')[0]} <span className="text-gradient">{getLabel('title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-400 text-sm">{getLabel('desc')}</p>
        </div>

        {certificates.length > 0 ? (
          /* Certificates Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#13132A] border border-[#1E1E3A] hover:border-yellow-500/30 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🎓
                    </div>
                    <span className="text-xs bg-purple-600/20 border border-purple-500/30 text-purple-400 px-2.5 py-0.5 rounded-full font-bold">
                      {getLabel('scoreLabel')}: {cert.score}%
                    </span>
                  </div>
                  <h3 className="text-white font-black text-lg mb-2 truncate">
                    {getSubjectName(cert.title)}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4">
                    {getLabel('dateLabel')}: {cert.date}
                  </p>
                  <p className="text-gray-600 text-[11px] font-mono select-all">
                    ID: LUMINA-{cert.id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="mt-6 w-full py-3 rounded-xl border border-yellow-500/30 text-yellow-400 font-semibold text-xs hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  👁️ {getLabel('viewBtn')}
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-12 text-center shadow-xl">
            <div className="text-7xl mb-6">🏅</div>
            <h2 className="text-2xl font-bold text-white mb-3">{getLabel('emptyTitle')}</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {getLabel('emptyText')}
            </p>

            <div className="flex justify-center">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-500 hover:to-purple-600 transition-all glow-purple"
              >
                📝 {getLabel('takeTest')}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Modal for detailed Certificate display */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 no-print">
          <div className="w-full max-w-4xl bg-[#090915] border border-[#1E1E3A] rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Actions */}
            <div className="p-4 border-b border-[#1E1E3A] flex justify-between items-center gap-4 bg-[#13132A]">
              <span className="text-white font-bold text-sm">Certificate Viewer</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-xl transition-all"
                >
                  🖨️ {getLabel('printBtn')}
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-[#1E1E3A] hover:bg-[#2D2D54] text-gray-300 text-xs font-bold rounded-xl transition-all"
                >
                  {getLabel('closeBtn')}
                </button>
              </div>
            </div>

            {/* Certificate Canvas / Container */}
            <div className="p-6 md:p-12 overflow-x-auto flex justify-center bg-[#07070F]">
              <div 
                id="printable-cert-area" 
                className="w-[800px] h-[560px] bg-gradient-to-br from-[#FAF7EE] via-[#FFFDF6] to-[#F3ECD8] text-slate-800 p-8 border-[12px] border-double border-yellow-700 rounded-lg relative flex flex-col justify-between shadow-2xl flex-shrink-0"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {/* Vintage Corner Ornaments */}
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
                    {getLabel('certTitle')}
                  </h2>
                </div>

                {/* Body Text */}
                <div className="text-center px-8 mt-2">
                  <p className="text-slate-500 text-xs italic mb-4">
                    {getLabel('certifiedText')}
                  </p>
                  
                  {/* Student Name */}
                  <h1 className="text-4xl font-extrabold tracking-wide text-slate-900 border-b border-slate-300 pb-2 inline-block px-10 mb-4 capitalize" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {user.name} {user.surname}
                  </h1>

                  <p className="text-slate-500 text-xs max-w-lg mx-auto mb-4 leading-relaxed">
                    {getLabel('courseText')}
                  </p>

                  {/* Course / Subject */}
                  <h3 className="text-2xl font-black text-slate-800 tracking-wide mb-3">
                    {getSubjectName(selectedCert.title)}
                  </h3>

                  <p className="text-slate-500 text-xs">
                    {getLabel('scoreDetailedText')}: <strong className="text-yellow-800 font-bold">{selectedCert.score}% ({selectedCert.correct} / {selectedCert.correct + selectedCert.wrong})</strong>
                  </p>
                </div>

                {/* Footer seal and signatures */}
                <div className="flex justify-between items-end px-8 mb-4">
                  {/* Left Side: Verification */}
                  <div className="text-left">
                    <span className="block text-[10px] text-slate-400 font-sans tracking-wider uppercase mb-1">
                      {getLabel('verifyLabel')}
                    </span>
                    <span className="block text-xs font-mono font-bold text-slate-700 select-all">
                      LUMINA-{selectedCert.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-sans mt-1">
                      {getLabel('dateLabel')}: {selectedCert.date}
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
                      {getLabel('authTitle')}
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

export default CertificatesPage;
