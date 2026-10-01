import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, EyeOff, Eye, LogIn, ArrowLeft } from 'lucide-react';
import api, { fetchAndSetCsrfToken } from '../../api/axios';

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

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      await fetchAndSetCsrfToken();
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.data.user._id || response.data.user.id);
      
      if (setIsLoggedIn) setIsLoggedIn(true);
      const destination = location.state?.from || "/welcome";
      navigate(destination);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
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

      {/* Wrapper pour le rectangle + ornements */}
      <div className="relative z-10 w-full max-w-[500px] mb-8">
        
        {/* Ornements extérieurs */}
        <div className="absolute -left-6 top-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block">✦</div>
        <div className="absolute -right-8 top-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block">✧</div>
        <div className="absolute -left-10 bottom-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block">✧</div>
        <div className="absolute -right-5 bottom-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block">✦</div>

        {/* Main Card (élargie) */}
        <div className="bg-[#FCFaf5] p-8 md:p-10 rounded-[2rem] shadow-xl shadow-stone-300/30 w-full">
          
          {/* Toggle */}
          <div className="flex w-full bg-[#EFE9DD] rounded-full p-1 mb-8">
            <div className="flex-1 text-center py-2 bg-white rounded-full text-sm font-medium shadow-sm text-[#4a3728]">Sign In</div>
            <Link to="/signup" className="flex-1 text-center py-2 rounded-full text-sm font-medium text-[#7c7064] hover:text-[#4a3728] transition-colors">Sign Up</Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-semibold text-[#5C544B]">Welcome Back</h2>
            <p className="text-[#7A6A5A] text-sm italic mt-2">-- Sign in to continue your reading journey --</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#7A6A5A] ml-1">Email</label>
              <input 
                required
                type="email" 
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#EFE7D6] focus:outline-none focus:border-[#c5b5a1] transition-all text-sm text-[#5c544b]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#7A6A5A] ml-1">Password</label>
              <div className="relative flex items-center">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-[#EFE7D6] focus:outline-none focus:border-[#c5b5a1] transition-all text-sm text-[#5c544b]"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={toggleVisibility} className="absolute right-3 text-[#A89F91] hover:text-[#756455] transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1 pt-1 pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#c5b5a1] text-[#8D7B68] focus:ring-[#8D7B68] w-3.5 h-3.5" />
                <span className="text-[#7c7064]">Remember me</span>
              </label>
              <Link to="/ForgotPassword" state={{ from: "login" }} className="text-[#7A6A5A] hover:text-[#4a3728] hover:underline underline-offset-2">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 bg-[#8D7B68] text-white rounded-full text-sm font-semibold hover:bg-[#7A6A59] transition-all shadow-md flex justify-center items-center gap-2">
              <LogIn size={18} strokeWidth={2}/>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-[#EFE7D6]" />
            <span className="text-[10px] text-[#A89F91] uppercase tracking-wider bg-[#FCFaf5] px-2">or continue with</span>
            <hr className="flex-1 border-[#EFE7D6]" />
          </div>

          <button 
            type="button" 
            onClick={handleGoogleAuth}
            className="w-full inline-flex justify-center items-center py-3 px-4 border border-[#EFE7D6] rounded-full bg-transparent text-sm font-medium text-[#5c544b] hover:bg-white transition-colors">
            <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Continue with Google
          </button>

          <p className="text-center text-[11px] text-[#A89F91] mt-6">
            By continuing, you agree to our <Link to="/terms" className="underline hover:text-[#756455]">Terms of Use</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;