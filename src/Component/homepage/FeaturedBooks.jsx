"use client"; 
import { motion } from "framer-motion";
import booksData from "../Books.json";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Fonction pour gérer le clic sur le bouton de favoris
const HeartButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  //ici rajouter l'envoie des informations a la base de données
  return (
    <button 
      onClick={(e) => {
        e.preventDefault(); // Évite de déclencher le lien de la carte
        setIsFavorite(!isFavorite);
      }} 
      className={`absolute top-4 right-4 z-10 bg-white/90 p-2.5 rounded-full transition-all duration-300 shadow-sm 
        ${isFavorite ? 'text-[#4a3728] scale-110' : 'text-gray-400 hover:text-[#4a3728]'}`}
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
  }

export default function FeaturedBooks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; 
  const totalItems = booksData.length;

  // Fonction pour aller au suivant (avec boucle)
  const nextSlide = () => {
    if (currentIndex >= totalItems - itemsPerPage) {
      setCurrentIndex(0); // Retour au début
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fonction pour aller au précédent (avec boucle)
  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(totalItems - itemsPerPage); // Aller à la fin
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
 
  return (
    <section className="w-full bg-[#F1EAD7] text-[#4a3728] pb-0 mb-0 space-y-20">
      <br></br>
      <br></br>
      
      {/* 1. Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-5xl md:text-6xl text-[#4a3728] mb-4 tracking-tight">Featured Books</h2>
        <p className="text-lg italic text-[#4a3728]/60">Discover stories waiting to be shared</p>
        
        <div className="absolute -top-6 -left-12 w-8 h-8 border-t border-l border-[#4a3728]/20 rounded-tl-xl hidden md:block"></div>
        <div className="absolute -top-6 -right-12 w-8 h-8 border-t border-r border-[#4a3728]/20 rounded-tr-xl hidden md:block"></div>
      </div>

      {/* 2. Carrousel */}
      <div className="relative w-full flex items-center group px-4">
        
        {/* Flèche Gauche */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 z-20 p-4 rounded-full bg-white/80 shadow-md transition-all hover:bg-white hover:scale-110 text-[#4a3728] active:scale-95"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        {/* Zone d'affichage */}
        <div className="w-full overflow-hidden">
          <motion.div 
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {booksData.map((book) => (
              <motion.div 
                key={book.id}
                className="min-w-[calc(33.333%-1rem)] bg-[#FAF7F2] rounded-[2.5rem] p-5 shadow-sm border border-[#4a3728]/5 hover:shadow-xl transition-all duration-500 group/card"
              >
                {/* Image */}
                <div className="relative h-80 w-full rounded-[1.8rem] overflow-hidden mb-6">
                  <div className={`absolute top-4 left-4 z-10 text-white text-[10px] font-sans font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${book.status === 'Available' ? 'bg-[#8D7B68]' : 'bg-[#D2B48C]'}`}>
                    {book.status}
                  </div>
                  <HeartButton />
                  <img 
                    src={book.photo} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
                  />
                </div>

                {/* Infos */}
                <div className="px-3 space-y-2">
                  <h3 className="text-2xl font-medium text-[#4a3728] truncate">{book.title}</h3>
                  <p className="text-[#4a3728]/60 italic text-sm">{book.author}</p>
                  
                  <div className="flex items-center gap-1.5 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#4a3728] text-[#4a3728]" />
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <span className="bg-[#F1EAD7] text-[#8D7B68] text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-[0.2em] border border-[#8D7B68]/10">
                      {book.genre}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Flèche Droite */}
        <button 
          onClick={nextSlide}
          className="absolute right-0 z-20 p-4 rounded-full bg-white/80 shadow-md transition-all hover:bg-white hover:scale-110 text-[#4a3728] active:scale-95"
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>

      {/* 3. Bouton View All */}
      <Link href="/catalog" className="mt-16 flex justify-center">
        <button className="bg-[#8D7B68] text-[#F1EAD7] px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#7a6a59] transition-all shadow-md shadow-black/5">
          <span className="text-xs">✦</span> View All Books
        </button>
      </Link>
      
      <div class="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40 pt-10">
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
    <div class="grid grid-cols-2 gap-0.5 rotate-45 transform">
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
    </div>
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
  </div>

    </section>
  );
}
