import React, { useEffect, useState } from 'react';
import { BookOpen, Heart, Bell, MessageSquare, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios'

const Header = ({ isLoggedIn, setIsLoggedIn }) => { 
  const navigate = useNavigate();
  const currentUserName = localStorage.getItem('userName') || "Invité";

  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (isLoggedIn) {
      const fetchNotifications = async () => {
        try {
          const response = await api.get('/api/notifications');
          if (response.data.success) {
            // On compte uniquement celles qui ne sont pas lues
            const unread = response.data.data.filter(notif => !notif.isRead).length;
            setUnreadCount(unread);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des notifications pour le Header:", error);
        }
      };
      
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {

      await api.post('/api/auth/logout'); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion côté serveur:", error);
    } finally {

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);

      window.location.href = '/'; 
    }
  };

  return (
    <header className="w-full bg-[#FDF5E6] border-b border-stone-200 text-[#5D4037] backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-360 mx-auto px-12 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to={isLoggedIn ? "/welcome" : "/"}
         className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
          <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex flex-1 font-serif justify-center text-[#5D4037] items-center gap-10">
          <Link to="/catalog" className="hover:text-[#8D7B68] transition-colors">Explore Books</Link>
          <Link to="/About" className="hover:text-[#8D7B68] transition-colors">About</Link>
          
          {isLoggedIn && (
            <Link to="/AddNewBook" className="hover:text-[#8D7B68] transition-colors">Add Book</Link>
          )}
        </nav>

        {/* User Controls */}
        <div className="flex items-center gap-5 shrink-0">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 pr-5 border-r border-stone-300">
                <Link to="/favorites" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all text-[#5D4037]">
                  <Heart size={22} strokeWidth={1.5} />
                </Link>

                <Link to ="/notifications" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all relative">
                  <Bell size={22} strokeWidth={1.5} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 bg-[#8B5E3C] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FDF5E6]">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>

                <Link to ="/Message" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all relative">
                  <MessageSquare size={22} strokeWidth={1.5} />
                  <span className="absolute top-2 right-2 bg-[#8B5E3C] w-2 h-2 rounded-full border border-[#FDF5E6]"></span>
                </Link>
              </div>

              <div className="flex items-center gap-3 pl-2">
                <Link to="/dashboard" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center group-hover:ring-2 group-hover:ring-[#8D7B68] transition-all overflow-hidden">
                    <User size={20} className="text-stone-500" />
                  </div>
                  <span className="text-sm font-medium italic">{currentUserName}</span>
                </Link>
                
                {/* Bouton LogOut */}
                <button 
                  onClick={handleLogout}
                  className="p-2 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/signup" className="px-6 py-2 bg-[#4a3728] text-white rounded-full font-serif hover:bg-[#5D4037] shadow-md">
              Join the community
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;