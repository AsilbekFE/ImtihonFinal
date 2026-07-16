import { useState, useContext } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Link, useNavigate } from '../router/hashRouter';
import { AppContext } from '../context/AppContext';

const RegisterPage = () => {
  const { t } = useContext(AppContext);
  const navigate = useNavigate();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
        lastName: surname,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Ro\'yxatdan o\'tishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    if (!isLoaded) return;
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        navigate('/');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Tasdiqlash kodi xato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D1A] flex flex-col justify-between py-12 px-4 overflow-hidden">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mt-6">
        <h2 className="text-2xl font-black text-white tracking-wide">LuminaEdu</h2>
        <p className="text-gray-500 text-xs mt-1">Clarity through Depth</p>
      </div>

      <div className="w-full max-w-md mx-auto my-8 relative z-10">
        <div className="bg-[#13132A]/90 border border-purple-500/10 rounded-3xl p-8 shadow-2xl relative">
          
          <h3 className="text-white font-bold text-lg mb-6 text-center">
            {verifying ? 'Tasdiqlash' : t('tabRegister')}
          </h3>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {verifying ? (
            <form onSubmit={handleVerify} className="space-y-4">
              <p className="text-gray-400 text-sm text-center">
                {email} manziliga tasdiqlash kodi yuborildi
              </p>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">Tasdiqlash kodi</label>
                <input
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-center text-lg tracking-widest"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Ism</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingiz"
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-2">Familiya</label>
                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Familiyangiz"
                    className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-semibold mb-2">Parol</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kamida 8 ta belgi"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D0D1A] border border-[#1E1E3A] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Yuklanmoqda...' : t('registerNow')}
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-sm text-gray-500">
            Hisobingiz bormi?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              {t('login')}
            </Link>
          </p>

          <p className="text-[#565675] text-[10px] text-center mt-4 leading-relaxed">
            {t('termsText')}
          </p>
        </div>
      </div>

      <div className="text-center text-gray-600 text-xs mt-6">
        © 2024 LuminaEdu. All rights reserved.
      </div>
    </div>
  );
};

export default RegisterPage;
