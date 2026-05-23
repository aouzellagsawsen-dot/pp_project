import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, Send } from 'lucide-react';
import api from '../../api/axios.js';

const ForgotPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); 
    setIsLoading(true);

    try {
      const response = await api.post('/api/auth/forgotpassword', { email });
      
      setMessage({ 
        type: 'success', 
        text: response.data.message || "A magic link has been sent to your email address." 
      });
      setEmail('');
      
    } catch (error) {
      const errorText = error.response?.data?.message || "Something went wrong. Please try again.";
      setMessage({ type: 'error', text: errorText });
    } finally {
      setIsLoading(false);
    }
  };
  
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

         {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm text-center border ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-600 border-green-100' 
              : 'bg-red-50 text-red-600 border-red-100'
          }`}>
            {message.text}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
            />
          </div>

           <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            {isLoading ? "Sending..." : "Send Reset Link"}
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