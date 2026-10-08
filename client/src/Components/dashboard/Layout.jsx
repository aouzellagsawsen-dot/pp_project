import React, { useEffect, useState } from 'react'
import { Plus, Box, BookOpen, Clock, Settings, X } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import api from '../../api/axios'

// Composant Avatar pour le profil
const CustomAvatar = () => (
  <div className="w-full h-full bg-[#EBE2D4] flex flex-col items-center justify-end overflow-hidden relative">
    <div className="absolute top-[20%] flex flex-col items-center">
      <div className="relative w-8 h-8">
        <div className="w-1 h-1 bg-[#5C4F44] rounded-full absolute left-1 top-3"></div>
        <div className="w-1 h-1 bg-[#5C4F44] rounded-full absolute right-1 top-3"></div>
        <svg className="w-4 h-4 absolute bottom-1 left-2 text-[#5C4F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0" />
        </svg>
      </div>
    </div>
    <div className="w-16 h-8 bg-[#8B7863] rounded-t-full mt-auto"></div>
  </div>
);

const Page = () => {
  const [tab, settab] = useState('Borrows');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Borrows', path: 'borrows', icon: <Box size={17} /> },
    { name: 'My books', path: 'mybooks', icon: <BookOpen size={17} /> },
    { name: 'History', path: 'history', icon: <Clock size={17} /> },
    { name: 'Profile', path: 'profile', icon: <Settings size={17} /> }
  ];

  const [loading, setLoading] = useState(true);
  
  // États de la carte Profil intégrée
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "Chargement...", email: "...", bio: "" });
  const [formData, setFormData] = useState({ name: "", email: "", bio: "" });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const profileRes = await api.get('/api/users/profile');

        if (profileRes.data?.success) {
            const userInfos = {
              name: profileRes.data.user.name || "Olivia Bennett",
              email: profileRes.data.user.email || "olivia.bennett@example.com",
              bio: profileRes.data.user.bio || "A lifelong reader drawn to quiet stories, beautiful editions, and the conversations that begin between the pages."
            };
            setUserData(userInfos);
            setFormData(userInfos);
        }
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
        const fallbackInfos = {
          name: localStorage.getItem('name') || "Olivia Bennett",
          email: localStorage.getItem('email') || "olivia.bennett@example.com",
          bio: "A lifelong reader drawn to quiet stories, beautiful editions, and the conversations that begin between the pages."
        };
        setUserData(fallbackInfos);
        setFormData(fallbackInfos);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/api/users/profile', formData);
      if (response.data && response.data.success) {
        setUserData(formData);
        localStorage.setItem('name', formData.name);
        localStorage.setItem('email', formData.email);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
      setUserData(formData);
      setIsModalOpen(false);
    }
  };

  return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col items-center pt-24 pb-12'>
      
      {/* Conteneur principal flex (gauche: Profil + Citation, droite: Menu + Contenu) */}
      <div className='w-full max-w-[1300px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start'>
        
        {/* ================= PARTIE GAUCHE (PROFIL + CITATION) ================= */}
        <div className='w-full lg:w-[350px] xl:w-[380px] shrink-0 flex flex-col gap-6'>
          
          {/* 1. Carte Profil */}
          <div className="bg-[#FDFBF7] rounded-[2rem] p-7 shadow-sm border border-[#F2EBE1] flex flex-col">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-[90px] h-[90px] rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-sm shrink-0 mb-4">
                <CustomAvatar />
              </div>
              <h2 className="text-[26px] font-serif text-[#3E2F2B] font-normal leading-tight mb-1">
                {userData.name}
              </h2>
              <p className="text-[#7A6A5A] text-[14px] font-sans mb-5">
                {userData.email}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-full gap-2 border border-[#DCD2C4] hover:bg-[#F2EBE1] text-[#6B5A4B] px-5 py-2.5 rounded-xl text-sm font-sans font-medium transition-colors cursor-pointer bg-transparent"
              >
                <Settings size={16} className="text-[#6B5A4B]" />
                <span>Edit profile</span>
              </button>
            </div>

            <div className="bg-[#F5EFE6] rounded-2xl p-5">
              <h3 className="font-sans font-semibold text-[#3E2F2B] text-[14px] mb-2">
                Bio
              </h3>
              <p className="text-[#6B5A4B] text-[14px] font-sans leading-relaxed">
                {userData.bio}
              </p>
            </div>
          </div>

          {/* 2. Carte Citation (Quote) */}
          <div className="bg-[#F6F4EE] rounded-[2rem] p-8 shadow-sm border border-[#EAE4D8] flex flex-col">
            <div className="text-[#8D7B68] mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="4" height="16" rx="1"></rect>
                <path d="M8 4h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8"></path>
                <path d="M12.5 4.5l3.5 1.5a1 1 0 0 1 .5 1.2l-2.5 12a1 1 0 0 1-1.2.5l-3.5-1.5"></path>
              </svg>
            </div>
            <h3 className="text-[22px] font-serif text-[#3E2F2B] leading-snug mb-3">
              Every book finds its reader.
            </h3>
            <p className="text-[#8D7B68] text-[15px] font-sans leading-relaxed">
              Your personal library,<br />thoughtfully organized.
            </p>
          </div>

        </div>

        {/* ================= PARTIE DROITE (MENU + CONTENU) ================= */}
        <div className='flex-1 w-full flex flex-col gap-8'>
          
          {/* En-tête avec titre et bouton d'ajout */}
          <div className='flex flex-wrap gap-4 justify-between items-end'>
            <div>
              <p className="text-[#8D7B68] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                YOUR READING SPACE
              </p>
              <div className='flex items-center gap-3'>
                <span className='text-3xl text-[#7A6A5A]'>
                  {menuItems.find(item => item.name === tab)?.icon}
                </span>
                <h1 className="text-[44px] font-serif text-[#3E2F2B] font-normal leading-tight capitalize">
                  {tab === 'Profile' ? 'Settings' : tab}
                </h1>
              </div>
            </div>

            <Link className='bg-[#7A6A5A] text-[white] font-semibold flex items-center rounded-2xl py-3 px-6 gap-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl shrink-0' to="/AddNewBook">
              <Plus size={20}></Plus>
              <span>Add a book</span>
            </Link>
          </div>

          {/* Disposition Menu + Contenu */}
          <div className='flex flex-col md:flex-row gap-6 items-start w-full'>
            
            {/* Menu de navigation vertical à côté du contenu */}
            <div className='flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto'>
              {menuItems.map((item) => {
                const isActive = item.name === tab;
                return (
                  <NavLink to={item.path} key={item.name} onClick={() => settab(item.name)}
                    className={`flex gap-3 rounded-2xl px-5 py-3.5 items-center transition-all duration-200 ${isActive ? 'bg-[#7A6A5A] text-white shadow-md'
                      : 'bg-[#FDFBF7] text-[#7A6A5A] hover:bg-[#F5EFE6]'
                      }`}>
                    <span>{item.icon}</span>
                    <p className="font-medium text-[15px]">{item.name}</p>
                  </NavLink>
                )
              })}
            </div>

            {/* Zone de contenu principale (Outlet) */}
            <div className='w-full flex-1'>
              <Outlet />
            </div>
          </div>

        </div>

      </div>

      {/* ================= MODALE D'ÉDITION ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="bg-[#FDFBF7] p-8 sm:p-10 rounded-[2rem] w-full max-w-[500px] relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-[32px] text-[#7A6A5A] font-normal">Edit the profile</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8D7B68] hover:text-[#3E2F2B] cursor-pointer transition-colors">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            <hr className="border-t border-[#EAE0D3] mb-8" />
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col items-center mb-8">
                <div className="w-[100px] h-[100px] rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                  <CustomAvatar />
                </div>
                <span className="text-[#8D7B68] text-sm font-sans mt-3 cursor-pointer">Click to change picture</span>
              </div>
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div>
                  <label className="font-sans text-[#7A6A5A] text-[15px] font-medium mb-2 block">Name</label>
                  <input className="w-full bg-white border border-[#DCD2C4] font-sans rounded-2xl px-4 py-3 text-[15px] text-[#3E2F2B] focus:outline-none focus:border-[#8D7B68]" type="text" value={formData.name} onChange={handleChange} name="name" />
                </div>
                <div>
                  <label className="font-sans text-[#7A6A5A] text-[15px] font-medium mb-2 block">Email</label>
                  <input className="w-full bg-white border border-[#DCD2C4] font-sans rounded-2xl px-4 py-3 text-[15px] text-[#3E2F2B] focus:outline-none focus:border-[#8D7B68]" type="email" value={formData.email} onChange={handleChange} name="email" />
                </div>
                <div>
                  <label className="font-sans text-[#7A6A5A] text-[15px] font-medium mb-2 block">Bio</label>
                  <textarea rows={4} className="w-full bg-white border border-[#DCD2C4] font-sans rounded-2xl px-4 py-3 text-[15px] text-[#3E2F2B] focus:outline-none focus:border-[#8D7B68] resize-none" value={formData.bio} onChange={handleChange} name="bio" />
                </div>
                <div className="flex justify-end mt-4 pb-2">
                  <button type="submit" className="bg-[#8D7B68] text-white rounded-xl px-8 py-3 text-[15px] font-medium hover:bg-[#6E5E4F] transition-colors cursor-pointer">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page