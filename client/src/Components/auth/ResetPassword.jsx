import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, KeyRound, ArrowLeft } from 'lucide-react';
import api from '../../api/axios.js';

const FloatingBook = ({ className }) => (
    <div className={`absolute ${className}`}>
        <svg viewBox="0 0 45 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            <rect width="45" height="60" rx="2" fill="#E6DDD0" />
            <line x1="8" y1="0" x2="8" y2="60" stroke="#D6CBB9" strokeWidth="1.5" />
            <line x1="14" y1="10" x2="32" y2="10" stroke="#D6CBB9" strokeWidth="1" strokeLinecap="round" />
            <line x1="14" y1="14" x2="26" y2="14" stroke="#D6CBB9" strokeWidth="1" strokeLinecap="round" />
        </svg>
    </div>
);

const ResetPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }

    setIsLoading(true);

    try {
      const response = await api.put(`/api/auth/resetpassword/${token}`, { password });

      setSuccess(response.data.message || "Password updated successfully! Redirecting...");
      
      setTimeout(() => {
        navigate('/SignIn');
      }, 3000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "The reset link is invalid or has expired.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      <Link 
        to="/" 
        className="absolute top-10 md:top-12 left-8 md:left-12 flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/80 shadow-sm backdrop-blur-sm text-[#7A6A5A] hover:text-[#4a3728] transition-all z-50 font-medium text-sm"
      >
        <ArrowLeft size={16} />
        <span>Home</span>
      </Link>

      <style>{`
          @keyframes float-slow {
              0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
              50% { transform: translateY(-20px) rotate(calc(var(--rot, 0deg) + 10deg)); }
          }
          @keyframes float-medium {
              0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
              50% { transform: translateY(-15px) rotate(calc(var(--rot, 0deg) - 10deg)); }
          }
          .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
      `}</style>

      {/* --- LIVRES FLOTTANTS --- */}
      <FloatingBook className="w-[50px] top-[5%] left-[6%] animate-float-slow [--rot:-15deg] rotate-[-15deg] hidden sm:block" />
      <FloatingBook className="w-[40px] top-[45%] left-[3%] animate-float-medium [--rot:10deg] rotate-[10deg] hidden md:block" />
      <FloatingBook className="w-[45px] bottom-[10%] left-[18%] animate-float-medium [--rot:-8deg] rotate-[-8deg] hidden sm:block" />
      <FloatingBook className="w-[35px] bottom-[15%] left-[55%] animate-float-slow [--rot:15deg] rotate-[15deg]" />
      <FloatingBook className="w-[65px] bottom-[20%] right-[12%] animate-float-medium [--rot:-12deg] rotate-[-12deg]" />
      <FloatingBook className="w-[45px] top-[40%] right-[5%] animate-float-medium [--rot:22deg] rotate-[22deg] hidden md:block" />
      <FloatingBook className="w-[42px] top-[10%] right-[20%] animate-float-slow [--rot:-20deg] rotate-[-20deg] hidden lg:block" />
      
      <FloatingBook className="w-[30px] top-[25%] left-[25%] animate-float-slow [--rot:30deg] rotate-[30deg] hidden lg:block" />
      <FloatingBook className="w-[55px] bottom-[40%] left-[10%] animate-float-medium [--rot:-25deg] rotate-[-25deg] hidden md:block" />
      <FloatingBook className="w-[25px] top-[15%] right-[35%] animate-float-slow [--rot:45deg] rotate-[45deg] hidden lg:block" />
      <FloatingBook className="w-[50px] bottom-[5%] right-[30%] animate-float-slow [--rot:-15deg] rotate-[-15deg] hidden sm:block" />
      <FloatingBook className="w-[35px] top-[60%] right-[4%] animate-float-medium [--rot:18deg] rotate-[18deg] hidden md:block" />

      {/* Logo & Slogan à l'extérieur */}
      <div className="flex flex-col items-center mb-8 relative z-10 mt-6">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <BookOpen className="w-10 h-10 text-[#8D7B68]" strokeWidth={2} />
          <h1 className="text-4xl font-serif font-medium text-[#4a3728] tracking-tight">Alinéa</h1>
        </Link>
        <p className="text-[#7A6A5A] text-[15px] italic mt-2 font-serif tracking-wide">— share your reading —</p>
      </div>

      <div className="relative z-10 w-full max-w-[500px] mb-8">
        
        {/* Ornements extérieurs */}
        <div className="absolute -left-6 top-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block">✦</div>
        <div className="absolute -right-8 top-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block">✧</div>
        <div className="absolute -left-10 bottom-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block">✧</div>
        <div className="absolute -right-5 bottom-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block">✦</div>

        {/* Main Card */}
        <div className="bg-[#FCFaf5] p-8 md:p-10 rounded-[2rem] shadow-xl shadow-stone-300/30 w-full">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-semibold text-[#5C544B]">New Password</h2>
            <p className="text-[#7A6A5A] text-sm italic mt-2">-- Secure your library with a new key --</p>
          </div>

          {error && <div className="mb-6 px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm text-center border border-red-400">{error}</div>}
          {success && <div className="mb-6 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm text-center border border-green-200">{success}</div>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#7A6A5A] ml-1">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                disabled={isLoading || success}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EFE7D6] focus:outline-none focus:border-[#c5b5a1] transition-all text-sm text-[#5c544b]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#7A6A5A] ml-1">Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || success}
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EFE7D6] focus:outline-none focus:border-[#c5b5a1] transition-all text-sm text-[#5c544b]"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading || success}
              className="w-full py-3.5 bg-[#8D7B68] text-white rounded-full text-sm font-semibold hover:bg-[#7A6A59] transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <KeyRound size={18} strokeWidth={2} />
              {isLoading ? "Saving..." : "Save the Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/SignIn" className="text-[13px] text-[#A89F91] hover:text-[#7A6A5A] transition-colors underline hover:no-underline">
              Cancel and Return
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;