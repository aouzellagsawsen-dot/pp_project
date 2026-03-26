"use client"; 
import { motion } from "framer-motion";
import booksData from "../Books.json";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <section className="w-full max-w-7xl mx-auto py-24 px-6 flex flex-col items-center bg-[#F1EAD7] font-serif overflow-hidden">
      
      {/* 1. Header */}
      <div className="text-center mb-16 relative">
        <div className="flex justify-center gap-1.5 mb-6 opacity-30 text-[8px]">
           <span>●</span><span>●</span><span>●</span>
        </div>
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
                  <button className="absolute top-4 right-4 z-10 bg-white/90 p-2.5 rounded-full text-[#4a3728] hover:bg-white hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={18} />
                  </button>
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
      <Link href="/catalog" className="mt-16">
        <button className="bg-[#4a3728] text-[#F1EAD7] px-12 py-4 rounded-2xl text-lg hover:bg-[#5d4633] hover:shadow-xl active:scale-95 transition-all duration-300 font-sans font-semibold tracking-wide">
          View All Books
        </button>
      </Link>

    </section>
  );
}