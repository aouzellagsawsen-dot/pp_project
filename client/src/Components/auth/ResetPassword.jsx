import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, KeyRound } from 'lucide-react';

const ResetPassword = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Note : Dans un vrai projet, tu devras récupérer le "token" depuis l'URL ici
  // Par exemple avec react-router-dom : const { token } = useParams();

  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center p-4 font-sans text-[#5C544B]">
      
      {/* Logo Alinéa */}
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
        <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 w-full max-w-110 border border-white relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-semibold mb-4">Nouveau mot de passe</h2>
          <p className="text-stone-500 text-sm italic">
            Créez un nouveau mot de passe sécurisé pour accéder à votre bibliothèque.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Nouveau mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Confirmez le mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-2xl bg-[#FFFBF2] border border-[#EFE7D6] focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/20 transition-all text-sm"
              required
            />
          </div>

          <button className="w-full py-4 bg-[#8D7B68] text-white rounded-3xl font-semibold hover:bg-[#7A6A59] transition-all shadow-lg shadow-[#8D7B68]/25 flex items-center justify-center gap-2">
            <KeyRound size={18} />
            Enregistrer le mot de passe
          </button>
        </form>
      </div>

      <Link to="/SignIn" className="mt-8 text-sm text-stone-400 hover:text-stone-600 flex items-center gap-2 transition-colors">
        <ChevronLeft size={16} /> Retour à la connexion
      </Link>
    </div>
  );
};

export default ResetPassword;