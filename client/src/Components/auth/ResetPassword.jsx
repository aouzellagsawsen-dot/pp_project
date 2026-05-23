import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, ChevronLeft, KeyRound } from 'lucide-react';
import api from '../../api/axios.js';

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
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans text-[#5C544B]">
      
      {/* Logo Alinéa */}
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 w-full max-w-110 border border-white relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-semibold mb-4">New Password</h2>
          <p className="text-stone-500 text-sm italic">
            Enter a New Password :
          </p>
        </div>

        {/* AFFICHAGE DES ERREURS ET SUCCÈS ICI */}
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm text-center border border-red-100">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl text-sm text-center border border-green-100">{success}</div>}

        {/* CORRECTION: onSubmit={handleSubmit} */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading || success}
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || success}
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
              required
            />
          </div>

          {/* CORRECTION: type="submit" et affichage conditionnel du texte */}
          <button 
            type="submit"
            disabled={isLoading || success}
            className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <KeyRound size={18} />
            {isLoading ? "Saving..." : "Save the Password"}
          </button>
        </form>
      </div>

      <Link to="/SignIn" className="mt-8 text-sm text-stone-400 hover:text-stone-600 flex items-center gap-2 transition-colors">
        <ChevronLeft size={16} /> Go Back to login 
      </Link>
    </div>
  );
};

export default ResetPassword;