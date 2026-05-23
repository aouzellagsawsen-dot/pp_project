import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, PlusCircle, LayoutDashboard, MessageSquare } from 'lucide-react';
import api from '../../api/axios.js';

const BienvenuePage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [userName, setUserName] = useState(localStorage.getItem('userName') || "Reader");

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkGoogleLogin = async () => {
      if (searchParams.get('login') === 'success') {
        try {
          const response = await api.get('/api/auth/me');
          
          if (response.data && response.data.user) {
            localStorage.setItem('userName', response.data.user.username);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('isLoggedIn', 'true');
            
            if (setIsLoggedIn) setIsLoggedIn(true);
            
            setUserName(response.data.user.username);
          }
        } catch (err) {
          console.error("Erreur lors de la récupération du profil Google:", err);
        } finally {
          window.history.replaceState(null, '', '/welcome');
        }
      }
    };

    checkGoogleLogin();
  }, [searchParams, setIsLoggedIn]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F1EAD7] px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        <div className="space-y-3">
          <div className="flex justify-center">
             <div className="p-4 bg-[#8D7B68]/10 rounded-full">
                <BookOpen className="w-12 h-12 text-[#8D7B68]" strokeWidth={1} />
             </div>
          </div>
          <h1 className="text-4xl font-serif font-medium text-[#5D4037]">
            Welcome to the community, {userName} !
          </h1>
          <p className="text-lg font-serif italic text-[#7A5C41] opacity-90">
            "Every book is an adventure that begins."
          </p>
        </div>

        <hr className="border-stone-200" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => navigate('/catalog')}
            className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#8D7B68] transition-all group">
            <PlusCircle className="w-8 h-8 mx-auto mb-3 text-[#8D7B68] group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#5D4037]">Explore</h3>
            <p className="text-xs opacity-70">Discover books in the community</p>
          </button>

          <button 
            onClick={() => navigate('/AddNewBook')}
            className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#8D7B68] transition-all group"
          >
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-[#8D7B68] group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#5D4037]">Share</h3>
            <p className="text-xs opacity-70">Add your first book to the library</p>
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#8D7B68] transition-all group">
            <LayoutDashboard className="w-8 h-8 mx-auto mb-3 text-[#8D7B68] group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-[#5D4037]">Dashboard</h3>
            <p className="text-xs opacity-70">Manage your profile and favorites</p>
          </button>

        </div>

        <div className="pt-4">
          <button 
            onClick={() => navigate('/Message')}
            className="flex items-center gap-2 mx-auto text-[#8D7B68] hover:text-[#5D4037] transition-colors font-medium">
            <MessageSquare size={18} />
            <span>Access your messaging</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default BienvenuePage;