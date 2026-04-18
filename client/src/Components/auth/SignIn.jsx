import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Feather, Sparkles, LogIn, ChevronLeft, EyeOff, Eye } from 'lucide-react';

const LoginPage = ({ setIsLoggedIn }) => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [showPassword, setShowPassword] = useState(false)
  
    const toggleVisibility = () =>{
      setShowPassword(!showPassword)
    }

  const handleSubmit = async (e) => {
  e.preventDefault();

  // try {
  //   const response = await fetch('http://localhost:5000/api/login', { // Remplace par ton URL
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('isLoggedIn', 'true');

  //     if (setIsLoggedIn) setIsLoggedIn(true);

  //     navigate('/welcome');
  //   } else {
  
  //     alert(data.message || "Erreur lors de la connexion");
  //   }
  // } catch (error) {
  //   console.error("Erreur réseau :", error);
  //   alert("Impossible de contacter le serveur.");
  // }

  try {
  const response = await fetch('...');
  const data = await response.json();

  if (response.ok) {
    // LE SERVEUR DIT OUI : on enregistre les infos
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', data.token); 
    setIsLoggedIn(true);
    navigate('/welcome');
  } else {
    // LE SERVEUR DIT NON (ex: 401, 404, 500)
    // On ne touche PAS au localStorage ici
    setError("Identifiants incorrects");
  }
} catch (error) {
  // ERREUR TECHNIQUE (Coupure internet, crash serveur)
  console.error("Erreur de connexion", error);
}



};

  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans text-[#5C544B] relative overflow-hidden">
      
      {/* Éléments de décoration en arrière-plan */}
      <div className="absolute top-10 right-10 w-24 h-24 text-stone-300 rotate-12">
        <Feather strokeWidth={0.5} size={80}/>
      </div>
      <div className="absolute bottom-20 left-20 w-32 h-32 text-stone-300 -rotate-12">
        <Feather strokeWidth={0.5} size={100}/>
      </div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 text-stone-300 opacity-50">
        <Sparkles strokeWidth={0.5} size={40}/>
      </div>

      {/* Logo Section */} 
      <Link to="/" className="flex items-center gap-2 mb-8 relative z-10 hover:opacity-80 transition-opacity">
        <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
      </Link>

      {/* Main Login Card */}
      <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 w-full max-w-110 border border-white relative z-10">
        
        <div className="absolute top-0 left-0 text-[#D8B486] -translate-x-3 -translate-y-3">
          <Sparkles size={24} strokeWidth={1}/>
        </div>
        <div className="absolute bottom-0 right-0 text-[#D8B486] translate-x-3 translate-y-3">
          <Sparkles size={24} strokeWidth={1}/>
        </div>

        <div className="text-center mb-10">
          <div className="flex items-center gap-2 mb-4 text-stone-300">
            <hr className="grow border-stone-300" />
            <Feather size={16} />
            <hr className="grow border-stone-300" />
          </div>
          <h2 className="text-4xl font-serif font-semibold">Welcome Back</h2>
          <p className="text-stone-500 text-sm italic mt-4">
            — Sign in to continue your reading journey —
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email</label>
            <input 
              required
              type="email" 
              placeholder="you@example.com"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all placeholder:text-stone-300 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="relative flex items-center gap-3">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
              value={password} onChange={(e)=>{setPassword(e.target.value)}}
              />
              <button  type="button" onClick={toggleVisibility}>
          {showPassword ? <EyeOff size={20} className='text-[#7A6A5A]'></EyeOff> : <Eye size={20} className='text-[#7A6A5A]'></Eye>}
        </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-stone-300 text-[#8D7B68] focus:ring-[#8D7B68] bg-[#FFFBF2]" />
              <span className="text-stone-600">Remember me</span>
            </label>
            <Link to="/ForgotPassword" state={{ from: "login" }} className="text-stone-500 hover:text-[#8D7B68] transition-colors underline decoration-dotted">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 mt-4 flex items-center justify-center gap-2">
            <LogIn size={18} strokeWidth={2}/>
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-stone-500"> 
          New here? 
          <Link to="/signup" className="text-[#8D7B68] font-semibold hover:underline ml-1">
            Create an account
          </Link>
        </div>
      </div>

      <Link to="/" className="mt-8 text-sm text-stone-400 hover:text-stone-600 flex items-center gap-2 transition-colors relative z-10">
        <ChevronLeft size={16} /> Back to Home
      </Link>
    </div>
  );
};

export default LoginPage;