import React, { useEffect, useState } from 'react';
import { User, Settings, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Profile = () => {

  // 1. États du composant
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  // Données affichées sur la page
  const [userData, setUserData] = useState({
    name: "Chargement...",
    email: "Chargement...",
    bio: ""
  });

  // Données manipulées dans le formulaire (modale)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: ""
  });

  // 2. Récupération des données depuis le Back-end au chargement
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/users/profile'); 
        
        // Si le backend renvoie { success: true, data: { ... } }
        if (response.data.success) {
          const userInfos = {
            name: response.data.user.name || "",
            email: response.data.user.email || "",
            bio: response.data.user.bio || "Book lover and avid reader. Always looking for my next great read!"
          };
          setUserData(userInfos);
          setFormData(userInfos); // On pré-remplit le formulaire
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        // Si erreur, on tente de fallback sur le localStorage
        setUserData({
          name: localStorage.getItem('name') || "Reader",
          email: localStorage.getItem('email') || "reader@gmail.com",
          bio: "Book lover and avid reader..."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 3. Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

// Dans votre composant Profile
  // const handleSave = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Envoi des données au backend
  //     const response = await fetch('http://localhost:5000/api/profile', {
  //       method: 'PUT', // ou 'PATCH'
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Authorization': 'Bearer votre_token_jwt' (si vous utilisez une authentification)
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Erreur lors de la mise à jour du profil');
  //     }

  //     const updatedUser = await response.json();

  //     // Mise à jour de l'état local avec la réponse du serveur
  //     setUserData(updatedUser);
  //     setIsModalOpen(false); // Fermer la modale
  //   } catch (error) {
  //     console.error('Erreur :', error);
  //     alert('Impossible de sauvegarder les modifications.');
  //   }
  // };
  

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  // 4. Sauvegarde des données vers le Back-end
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      //  Remplace par ta vraie route PUT ou PATCH du back-end
      const response = await api.put('/api/users/profile', formData);

      // Si la mise à jour a réussi côté serveur
      if (response.data.success) {
        setUserData(formData); // On met à jour l'affichage
        
        // On met à jour le localStorage pour que le Header s'actualise
        localStorage.setItem('name', formData.name);
        localStorage.setItem('email', formData.email);
        
        setIsModalOpen(false); // On ferme la modale
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
      alert('Impossible de sauvegarder les modifications.');
    }
  };

  // 5. Annulation
  const handleCancel = () => {
    setFormData({ ...userData }); // On annule les frappes non sauvegardées
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-60 text-[#8D7B68] font-serif text-xl">Loading your profile...</div>;
  }

  return (
    <div className='flex flex-col gap-5'>
      {/* En-tête du profil */}
      <div className='bg-[#FAF6F0] rounded-2xl h-60'>
        <div className='flex m-6'>
          <div className='rounded-full bg-[#7A6A5A] flex justify-center items-center border-amber-50 border-[3px] w-17 h-17'>
            <User className='text-[white] w-7 h-7' size={20}></User>
          </div>
          <div className='flex flex-col gap-2 ml-3.5'>
            <h1 className='text-[20px]'>{userData.name}</h1>
            <p className='text-[#7A6A5A] text-[14px]'>{userData.email}</p>

            <button onClick={() => setIsModalOpen(true)} className='flex items-center gap-2 border text-[#7A6A5A] rounded-2xl cursor-pointer hover:bg-[#8D7B68]/5'>
              <Settings size={17} className='ml-3'></Settings>
              <span className='font-[8px] font-sans mr-3'>Edit the profile</span>
            </button>
          </div>
        </div>
        <div className='bg-[#f6edd9] rounded-xl pl-4 pr-4 mt-4 border ml-5 mr-5 border-[#8D7B68]/22'>
          <h1 className='font-sans pt-3 pb-2'>Bio</h1>
          <p className='text-[#7A6A5A] font-sans pb-3'>{userData.bio}</p>
        </div>
      </div>

      {/* Liens de navigation */}
      <div className='bg-[#FAF6F0] rounded-2xl h-35 flex flex-col justify-center items-center border border-gray-200 overflow-hidden'>
        <Link to="/dashboard/publicprofile" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>My public profile</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
        </Link>
        <Link to="/notifications" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>Notifications</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
        </Link>
        <Link to="/favorites" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>My favorites</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
        </Link>
        <Link to="/adminpanel" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>Admin Panel</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
        </Link>
      </div>

      {/* Modale d'édition */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}>
          <div className="bg-[#FAF6F0] p-6 rounded-xl w-full max-w-lg relative shadow-2xl mx-4">
            <button onClick={handleCancel} className='cursor-pointer absolute top-4 right-5 text-2xl text-gray-500 hover:text-gray-800 focus:outline-none'>&times;</button>

            <h2 className='font-serif text-2xl text-[#8D7B68] pb-4'>Edit the profile</h2>

            {/* 💡 ATTENTION : Tout est maintenant dans la balise form */}
            <form onSubmit={handleSave}>
              <div className='mb-4'>
                <label className='font-sans text-[#7A6A5A] font-medium'>Name</label>
                <input className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                  placeholder='Enter your name' type="text" value={formData.name}
                  onChange={handleChange} name="name"
                />
              </div>

              <div className='mb-4'>
                <label className='font-sans text-[#7A6A5A] font-medium'>Email</label>
                <input className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                  placeholder='Enter your email' type="email" value={formData.email}
                  onChange={handleChange} name="email"
                />
              </div>

              <div className='mb-4'>
                <label className='font-sans text-[#7A6A5A] font-medium'>Bio</label>
                <textarea className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                  placeholder='Insert your bio here ...' value={formData.bio}
                  onChange={handleChange} name="bio"
                ></textarea>
              </div>

              {/* Boutons d'action dans le form */}
              <div className='flex gap-3 mt-6'>
                <button type='button' className='text-[#8D7B68] hover:text-[#d6c1aa] cursor-pointer' onClick={handleCancel}>Cancel</button>
                <button type="submit" className='text-[#FFFFFF] rounded-xl bg-[#8D7B68] py-2 px-6 hover:bg-[#685847] cursor-pointer'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;