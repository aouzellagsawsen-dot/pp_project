"use client"; 
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, ChevronLeft } from 'lucide-react';
import booksData from "./Books.json";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

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

const SealedLetter = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ y: 100, x: "-50%", opacity: 0, scale: 0.8 }}
        animate={{ y: -150, x: "-50%", opacity: 1, scale: 1 }}
        exit={{ y: -300, x: "-50%", opacity: 0, scale: 1.1, filter: "blur(8px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed bottom-10 left-1/2 z-50 pointer-events-none"
      >
        <div className="relative bg-[#E8DFCA] w-64 h-40 rounded-sm shadow-2xl border border-[#D4C5A9] flex items-center justify-center">
          {/* Les plis de l'enveloppe en CSS */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#D4C5A9] origin-top bg-[#F0E6D2]" 
                 style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
          </div>
          
          {/* Le Sceau de Cire (Wax Seal) */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="w-12 h-12 bg-[#6B2D21] rounded-full shadow-lg flex items-center justify-center border border-[#4A1F17] z-10"
          >
             <div className="text-[#F2E8D9] text-[8px] font-serif font-bold text-center leading-tight select-none">
               B.D<br/>2026
             </div>
          </motion.div>

          <p className="absolute bottom-4 font-serif italic text-[#8D7B68] text-xs">Request Sent</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const [showLetter, setShowLetter] = useState(false);

  const handleReserve = () => {
    // 1. Déclenche l'animation
    setShowLetter(true);
    setIsReserved(true);

    // 2. Cache l'enveloppe après 3 secondes
    setTimeout(() => {
      setShowLetter(false);
    }, 3000);
    
    // Logique pour ton backend / localStorage ici...
  };

  return (
    <main className="w-full min-h-screen bg-[#F1EAD7]">
      <SealedLetter isVisible={showLetter} />
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
            <div className="w-full aspect-3/4 bg-[#FAF7F0] p-6 rounded-4xl shadow-2xl border border-stone-100 overflow-hidden">
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
            onClick={handleReserve}
            disabled={isReserved}
            className={`flex-1 font-serif text-xl py-5 rounded-2xl transition-all shadow-lg overflow-hidden relative ${
              isReserved ? 'bg-stone-300 text-stone-600' : 'bg-[#8D7B68] text-white'}`}>
            {isReserved ? 'WAITING FOR SEAL...' : 'RESERVE THIS BOOK'}
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