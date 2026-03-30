import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, ChevronLeft } from 'lucide-react';
import booksData from "./Books.json";

const BookDescription = () => {
  const { id } = useParams(); // Récupère l'ID 
  const navigate = useNavigate();
  
  // On cherche le livre correspondant dans ton JSON
  const book = booksData.find((b) => String(b.id) === String(id));

  const handleContact = () => {
    // On redirige vers la messagerie en passant l'ID et le nom du owner dans l'URL
  if (book && book.owner) {
    navigate(`/messages?userId=${book.owner.id}&userName=${book.owner.name}`);
  }
};

  const [isReserved, setIsReserved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!book) return <div className="p-20 text-center font-serif">Livre introuvable...</div>;

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <main className="w-full min-h-screen bg-[#F1EAD7]">
      <div className="max-w-7xl mx-auto px-8 py-20 font-sans text-[#4A3F35]">
        
        {/* --- BOUTON RETOUR (Placé à l'intérieur du conteneur centré) --- */}
        <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-stone-500 hover:text-[#8D7B68] transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-sm font-medium">Back to explore</span>
        </button>

        {/* --- GRILLE PRINCIPALE --- */}
        <div className="grid md:grid-cols-12 gap-16 items-start">
          
          {/* --- GAUCHE : PHOTO & OWNER (4 colonnes sur 12) --- */}
          <div className="md:col-span-4 flex flex-col">
            <div className="w-full aspect-[3/4] bg-[#FAF7F0] p-6 rounded-[2rem] shadow-2xl border border-stone-100 overflow-hidden">
              <img 
                src={book.photo} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-xl shadow-inner" 
              />
            </div>

            {/* Carte Propriétaire style Alinéa */}
            <div className="mt-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-between p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8D7B68]/10 rounded-full flex items-center justify-center">
                  <MapPin size={22} className="text-[#8D7B68]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase block">Collection</span>
                  <p className="font-bold text-[#5D4037] text-sm">{book.owner.name}</p>
                </div>
              </div>
              <button onClick={handleContact}
                className="bg-white/80 text-[#4A3F35] text-[10px] font-bold px-5 py-2 rounded-full hover:bg-[#8D7B68] hover:text-white transition-all border border-[#8D7B68]/20 shadow-sm">
                CONTACT
              </button>
            </div>
          </div>

          {/* --- DROITE : INFOS (8 colonnes sur 12) --- */}
          <div className="md:col-span-8">
            <div className="flex gap-2 mb-6">
              <span className="bg-[#D5E5D5] text-[#4A674A] text-[10px] px-3 py-1 rounded-md font-bold tracking-wider uppercase">
                {book.status}
              </span>
              <span className="bg-[#EAE7DC] text-[#7A7565] text-[10px] px-3 py-1 rounded-md font-bold tracking-wider uppercase">
                {book.genre}
              </span>
            </div>

            <h2 className="text-7xl font-serif font-medium text-[#2C2621] mb-4 tracking-tight leading-tight">
              {book.title}
            </h2>
            
            <div className="flex items-center gap-6 mb-10">
              <p className="font-serif italic text-stone-500 text-2xl opacity-80">by {book.author}</p>
              <div className="flex items-center gap-1.5 bg-[#FDE7C0] text-[#7F6131] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                <Star size={14} fill="#7F6131" /> {book.rating}
              </div>
            </div>

            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-stone-400 tracking-[0.2em] mb-4 uppercase">Summary</h4>
              <p className="text-[#5D544D] leading-relaxed font-serif italic text-xl max-w-3xl opacity-90 border-l-2 border-[#8D7B68]/20 pl-6">
                {book.summary}
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] font-bold text-stone-400 tracking-[0.2em] mb-4 uppercase">Themes</h4>
              <div className="flex flex-wrap gap-3">
                {book.themes.map(theme => (
                  <span key={theme} className="bg-white/50 text-[#5D4037] text-xs px-5 py-2 rounded-full font-serif italic border border-white/40 shadow-sm">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* BOUTONS ACTIONS */}
            <div className="flex gap-6 mb-16">
              <button 
                onClick={() => setIsReserved(!isReserved)}
                className={`flex-2 font-serif text-xl py-5 rounded-2xl transition-all shadow-lg active:scale-[0.98] ${
                  isReserved ? 'bg-stone-400 text-white' : 'bg-[#8D7B68] text-white hover:bg-[#7A6957]'
                }`}
              >
                {isReserved ? 'RÉSERVÉ' : 'RESERVE'}
              </button>
              
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex-1 flex items-center justify-center gap-3 border-2 rounded-2xl py-5 transition-all active:scale-[0.98] ${
                  isFavorite ? 'border-red-200 bg-red-50 text-red-600' : 'border-stone-300 bg-white/40 text-stone-600'
                }`}
              >
                <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                <span className="font-serif font-medium text-lg uppercase tracking-tight">
                   {isFavorite ? 'Saved' : 'Add to Favorites'}
                </span>
              </button>
            </div>

            {/* CITATIONS */}
            <h4 className="text-[10px] font-bold text-stone-400 tracking-[0.2em] mb-6 uppercase">Famous Quotes</h4>
            <div className="space-y-6">
              {book.quotes.map((quote, idx) => (
                <div key={idx} className="bg-white/60 p-8 rounded-3xl border border-white/40 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8D7B68]/20 group-hover:bg-[#8D7B68] transition-colors" />
                  <p className="text-[#4A3F35] font-serif 'italic' leading-relaxed text-lg 'italic'">"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};  
export default BookDescription;