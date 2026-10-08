import React, { useEffect, useState } from 'react';
// IMPORT : Ajout de useNavigate pour la redirection vers la messagerie
import { useParams, useNavigate } from 'react-router-dom';
import { Book, MessageCircle, Star } from 'lucide-react';
import api from '../../api/axios';
import BookCard from './BookCard';

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // Initialisation de la navigation

  const [user, setUser] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const endpoint = userId ? `/api/users/profile/${userId}` : '/api/users/profile';
        const res = await api.get(endpoint);
        
        if (res.data && res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err);
        setError("Impossible de charger le profil utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className='bg-[#f1ead7] min-h-screen p-8 flex justify-center items-center'>
        <p className='text-[#8b7a67] font-sans text-lg'>Chargement du profil...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className='bg-[#f1ead7] min-h-screen p-8 flex justify-center items-center'>
        <p className='text-red-600 font-sans text-lg'>{error || "Utilisateur introuvable"}</p>
      </div>
    );
  }

  const avatarUrl = user.pdp?.startsWith('/') 
    ? `http://localhost:5000${user.pdp}` 
    : user.pdp;

  return (
    // MODIFICATION : Ajout de pt-28 pour descendre la carte et éviter qu'elle soit cachée par le Header
    <div className='bg-[#f1ead7] min-h-screen px-8 pb-8 pt-28 flex flex-col items-center'>
      
      {/* Carte du profil */}
      <div className='bg-[#FAF6F0] rounded-3xl p-8 flex flex-col md:flex-row gap-8 w-full max-w-4xl shadow-sm border border-[#F2EBE1]'>
        
        {/* Photo de profil */}
        <div className='relative shrink-0'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm bg-[#EBE2D4] flex items-center justify-center'>
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-serif text-[#5C544B]">
                {user.name?.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Détails du profil */}
        <div className='flex flex-col gap-4 flex-1'>
          <div>
            <h1 className='text-4xl font-serif text-[#3d3125]'>{user.name}</h1>
            {user.username && (
              <p className='text-[#8b7a67] text-sm font-sans'>@{user.username}</p>
            )}
            <p className='text-[#8b7a67] mt-3 text-base leading-relaxed font-sans'>
              {user.bio}
            </p>
          </div>

          {/* Statistiques */}
          <div className='flex gap-12 mt-2'>
            <div className='flex flex-col'>
              <span className='text-2xl font-bold text-[#3d3125]'>
                {userBooks.length}
              </span>
              <span className='text-[#8b7a67] text-sm'>Books Shared</span>
            </div>
            
            {/* MODIFICATION : Remplacement de Favorites par une Note (Rating) */}
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <Star className='fill-[#8b7a67] text-[#8b7a67]' size={22} />
                <span className='text-2xl font-bold text-[#3d3125]'>
                  {/* Si le backend renvoie user.rating, on l'affiche avec 1 décimale, sinon on met 0.0 */}
                  {user.rating ? Number(user.rating).toFixed(1) : "0.0"}
                </span>
              </div>
              <span className='text-[#8b7a67] text-sm'>Rating</span>
            </div>
          </div>

          {/* MODIFICATION : Bouton avec événement onClick pour rediriger vers /Message */}
          <button 
            onClick={() => navigate('/Message', { state: { contactUser: user } })}
            className='flex items-center gap-2 bg-[#8b7a67] hover:bg-[#7a6a5a] transition-colors rounded-full px-6 py-2.5 w-fit text-white cursor-pointer mt-2'
          >
            <MessageCircle size={20} />
            <span className='font-medium'>Send Message</span>
          </button>
        </div>
      </div>

      {/* Section Livres */}
      <div className='w-full max-w-4xl mt-12'>
        <div className='flex items-center gap-3 border-b border-[#dcd3bc] pb-4 mb-6'>
          <Book className='text-[#8b7a67]' size={27} />
          <h2 className='font-serif text-3xl text-[#5C544B]'>
            Books shared by {user.name}
          </h2>
        </div>

        <div className='flex flex-col items-center gap-4'>
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p className='text-[#8b7a67] text-center py-6'>
              No books shared yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;