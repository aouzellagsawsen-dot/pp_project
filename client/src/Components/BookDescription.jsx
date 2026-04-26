"use client"; 
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ChevronLeft, Landmark } from 'lucide-react';
import api from "../api/axios"; 
import { useFavorites } from './contexts/FavoritesContext'; // Import du context

const BookDescription = ({ isLoggedIn }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Utilisation du context pour les favoris
  const { toggleFavorite, isBookFavorite } = useFavorites();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      try {
        const response = await api.get(`/api/books/${id}`);
        if (response.data.success) {
          setBook(response.data.data);
        } else {
          setBook(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du livre :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-serif text-[#8D7B68] text-xl">Chargement...</div>;
  if (!book) return <div className="p-20 text-center font-serif text-[#8D7B68]">Livre introuvable.</div>;

  // Vérifie si le livre actuel est dans les favoris
  const isFavorite = isBookFavorite(book._id);

  // Construction des thèmes (on utilise le genre principal et le genre custom s'il existe)
  const themes = [book.genre, book.customGenre].filter(Boolean);

  return (
    <main className="w-full min-h-screen bg-[#F4EFE6] selection:bg-[#8D7B68] selection:text-white">
      <div className="max-w-6xl mx-auto px-8 py-16 font-sans text-[#4A3F35]">
        
        {/* Bouton Retour */}
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-stone-500 hover:text-[#8D7B68] transition-colors">
          <ChevronLeft size={20} /> <span className="text-sm font-medium tracking-wide">Go Back</span>
        </button>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          
          {/* COLONNE GAUCHE : Image & Collection */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="w-full aspect-[3/4] bg-[#EAE3D5] p-2 rounded-sm shadow-xl">
              <img 
                src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-sm border border-stone-200/50" 
              />
            </div>
            
            {/* Boîte Collection & Contact */}
            <div className="bg-[#EAE3D5] p-4 rounded-xl flex items-center justify-between shadow-sm border border-[#DFD6C8]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#DED5C5] rounded-full flex items-center justify-center text-[#7A6A5A]">
                  <Landmark size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#86796D] tracking-widest uppercase">Collection</p>
                  <p className="font-serif font-bold text-[#4A3F35] text-sm">Longbourn Estate</p> {/* Remplace par book.owner.name si dispo */}
                </div>
              </div>
              <Link to="/Message" className="px-4 py-2 border border-[#8D7B68] text-[#8D7B68] text-xs font-bold tracking-widest rounded-lg hover:bg-[#8D7B68] hover:text-white transition-all">
                CONTACT
              </Link>
            </div>
          </div>

          {/* COLONNE DROITE : Infos du livre */}
          <div className="md:col-span-8 pt-2">
            
            {/* Tags (Status & Catégorie) */}
            <div className="flex gap-3 mb-6">
              <span className="bg-green-100/70 text-green-800 border border-green-200 px-3 py-1 text-[10px] font-bold rounded-sm uppercase tracking-widest">
                {book.status === 'available' ? 'Available Now' : book.status || 'Available'}
              </span>
              <span className="bg-[#EAE3D5] text-[#5D544D] border border-[#DFD6C8] px-3 py-1 text-[10px] font-bold rounded-sm uppercase tracking-widest">
                {book.genre}
              </span>
            </div>

            {/* Titre & Auteur */}
            <h2 className="text-5xl lg:text-6xl font-serif text-[#1A1816] mb-4">{book.title}</h2>
            <div className="flex items-center gap-4 mb-10">
              <p className="font-serif italic text-[#7A6A5A] text-2xl">by {book.author}</p>
              <div className="flex items-center gap-1 bg-[#F9DBA1] text-[#7A6021] px-2 py-0.5 rounded-full text-sm font-bold shadow-sm">
                <Star size={14} className="fill-[#7A6021]" />
                <span>4.9</span>
              </div>
            </div>
            
            {/* Résumé */}
            <div className="mb-10">
              <h4 className="text-[11px] font-bold text-[#988C80] tracking-[0.2em] mb-4 uppercase">Summary</h4>
              <p className="text-[#5C544B] leading-relaxed font-serif text-lg">
                {book.summary || book.description || "Aucun résumé disponible pour ce livre."}
              </p>
            </div>

            {/* Thèmes (Récupérés de la BDD : genre + customGenre) */}
            {themes.length > 0 && (
              <div className="mb-10">
                <h4 className="text-[11px] font-bold text-[#988C80] tracking-[0.2em] mb-4 uppercase">Themes</h4>
                <div className="flex flex-wrap gap-3">
                  {themes.map((theme, index) => (
                    <span key={index} className="px-5 py-2 bg-white text-[#7A6A5A] font-serif italic text-sm rounded-full shadow-sm border border-[#EAE3D5]">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button 
                onClick={() => setIsReserved(!isReserved)} 
                className={`flex-1 font-sans text-sm font-bold tracking-[0.15em] py-4 rounded-xl shadow-md transition-all uppercase ${
                  isReserved 
                   ? 'bg-[#8A7967]/60 text-white/90 cursor-default' 
                    : 'bg-[#8A7967] text-white hover:bg-[#736454]'
                }`}
              >
                {isReserved ? 'Reserved' : 'Reserve'}
              </button>
              
              <button 
                onClick={() => toggleFavorite(book)} 
                className="flex-1 flex justify-center items-center gap-2 px-10 py-4 bg-[#F0EBE0] border-2 border-[#D8CFC0] text-[#8A7967] font-sans text-sm font-bold tracking-[0.15em] rounded-xl hover:bg-[#EAE3D5] transition-all uppercase"
              >
                <Heart size={18} className={isFavorite ? 'fill-[#8A7967] text-[#8A7967]' : 'text-[#8A7967]'} />
                {isFavorite ? 'Favorited' : 'Add to favorites'}
              </button>
            </div>

            {/* Section Citations (Boucle sur les données du backend) */}
            {book.quotes && book.quotes.length > 0 && (
              <div className="mt-8 border-t border-[#DFD6C8] pt-10">
                <h4 className="text-[11px] font-bold text-[#988C80] tracking-[0.2em] mb-6 uppercase">Famous Quotes</h4>
                <div className="flex flex-col gap-4">
                  {book.quotes.map((quote, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE3D5]">
                      <p className="italic font-serif text-[#5C544B] text-lg">
                        "{quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};  

export default BookDescription;