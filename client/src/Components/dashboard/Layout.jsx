import React, { useEffect, useState } from 'react'
import { User, Plus, Heart, Star, Box, Book, BookOpen, Clock, Settings } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import api from '../../api/axios'

const Page = () => {
  const [tab, settab] = useState('Borrows');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || "Reader";

  const menuItems = [
    { name: 'Borrows', path: 'borrows', icon: <Box size={17} /> },
    { name: 'My books', path: 'mybooks', icon: <BookOpen size={17} /> },
    { name: 'History', path: 'history', icon: <Clock size={17} /> },
    { name: 'Profile', path: 'profile', icon: <Settings size={17} /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { favorites } = useFavorites();
  const [stats, setStats] = useState({ sharedBooks: 0, ongoing: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [borrowedRes, lentRes] = await Promise.all([
            api.get('/api/loans/on-going'),
            api.get('/api/books/shared-books')
        ]);

        if (borrowedRes.data.success && lentRes.data.success) {
            setStats({
                ongoing: borrowedRes.data.count || borrowedRes.data.data.length,
                sharedBooks: lentRes.data.data.length 
            });
        }
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col items-center'>
      <div className='w-full mt-5 mx-auto px-85'>
        <div className='flex gap-6 w-full max-w-5xl px-1 pt-5 mb-10 justify-between'>
          <div className='flex'>
            <div className='rounded-full bg-[#7A6A5A] flex justify-center items-center border-amber-50 border-[3px] w-17 h-17'>
              <User className='text-[white] w-7 h-7' size={20}></User>
            </div>
            <div className='flex flex-col ml-5'>
              <p className='text-[#8D7B68] text-[13px] mb-0.5'>Hello👋</p>
              <h1 className='text-[28px]'>{userName} ! </h1>
              <p className='text-[#8D7B68] mt-0.5 text-[14px]'>Your space of reading is waiting for you</p>
            </div>
          </div>
          <Link className='bg-[#7A6A5A] text-[white] font-semibold flex rounded-2xl py-2.75 px-5.5 gap-2 m-5 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl' to="/AddNewBook">
            <Plus size={20}></Plus>
            <span>Add a book</span>
          </Link>
        </div>

        <div className='grid grid-cols-4 gap-4 justify-center'>
          <div className='flex flex-col bg-white/60 rounded-[20px] p-5 gap-3 col-span-1'>
            <div className='rounded-xl bg-[#8D7B68]/[0.14] w-7 flex justify-center px-1 py-2'>
              <Book className='text-[#8D7B68] mx-0.5' size={17}></Book>
            </div>
            <div className='text-[#7A6A5A]'>
              <div className='text-[black] text-[30px] font-sans'>{loading ? '-' : stats.sharedBooks}</div>
              <span> Shared books</span>
            </div>
          </div>
          <div className='flex flex-col bg-[#FFF8E7] rounded-[20px] p-5 gap-3 col-span-1'>
            <div className='rounded-xl bg-[#8D7B68]/[0.14] w-7 flex justify-center px-1 py-2'>
              <Box className='text-[#8D7B68] mx-0.5' size={17}></Box>
            </div>
            <div className='text-[#7A6A5A]'>
              <div className='text-[black] text-[30px] font-sans'>{loading ? '-' : stats.ongoing}</div>
              <span> Ongoing</span>
            </div>
          </div>
          <div className='flex flex-col bg-white/60 rounded-[20px] p-5 gap-3 col-span-1'>
            <div className='rounded-xl bg-[#8D7B68]/[0.14] w-7 flex justify-center px-1 py-2'>
              <Heart className='text-[#8D7B68] mx-0.5' size={17}></Heart>
            </div>
            <div className='text-[#7A6A5A]'>
              <div className='text-[black] text-[30px] font-sans'>{favorites.length}</div>
              <span> Favorites</span>
            </div>
          </div>
          <div className='flex flex-col bg-[#FFF8E7] rounded-[20px] p-5 gap-3 col-span-1'>
            <div className='rounded-xl bg-[#8D7B68]/[0.14] w-7 flex justify-center px-1 py-2'>
              <Star className='text-[#8D7B68] mx-0.5' size={17}></Star>
            </div>
            {/* À adapter plus tard si tu as un système de notation */}
            <p className='text-[#7A6A5A]'>Average rating</p>
          </div>
        </div>

        <div className='mt-8 flex gap-6'>
          <div className='flex flex-col gap-4'>
            {menuItems.map((item) => {
              const isActive = item.name === tab

              return (
                <NavLink to={item.path} key={item.name} onClick={() => settab(item.name)}
                  className={`flex gap-3 rounded-2xl px-4 py-3 w-33 items-center ${isActive ? 'bg-[#7A6A5A] text-white shadow-md'
                    : 'bg-[#f1ead7] text-[#7A6A5A]'
                    }`}>
                  <span>{item.icon}</span>
                  <p>{item.name}</p>
                </NavLink>
              )
            })}
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='text-2xl text-[#7A6A5A]'>
                {menuItems.find(item => item.name === tab)?.icon}
              </span>
              <h2 className='text-[20px] font-serif text-[#3E2F2B] capitalize'>
                {tab}
              </h2>
            </div>
            <div className='w-full'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page