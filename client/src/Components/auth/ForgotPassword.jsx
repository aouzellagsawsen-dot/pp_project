import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Feather, ChevronLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans text-[#5C544B]">
      
      {/* Logo Alinéa */}
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 w-full max-w-110 border border-white relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-semibold mb-4">Reset Password</h2>
          <p className="text-stone-500 text-sm italic">
            Enter your email and we'll send you a magic link to get back into your library.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
            />
          </div>

          <button className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 flex items-center justify-center gap-2">
            <Send size={18} />
            Send Reset Link
          </button>
        </form>
      </div>

      <Link to="/SignIn" className="mt-8 text-sm text-stone-400 hover:text-stone-600 flex items-center gap-2 transition-colors">
        <ChevronLeft size={16} /> Back to login
      </Link>
    </div>
  );
};

export default ForgotPassword;