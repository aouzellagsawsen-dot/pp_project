"use client"; 
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await api.get('/api/books/list'); 
        if (response.data.success) {
          
          setBooks(response.data.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const totalItems = books.length;

  // Fonction pour aller au suivant (avec boucle)
  const nextSlide = () => {
    if (currentIndex >= totalItems - itemsPerPage) {
      setCurrentIndex(0); 
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fonction pour aller au précédent (avec boucle)
  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(Math.max(0, totalItems - itemsPerPage));
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-[#F1EAD7] py-20 flex items-center justify-center">
        <p className="font-serif italic text-[#4a3728]">Loading featured books...</p>
      </section>
    );
  }
 
 return (
    <section className="w-full bg-[#F1EAD7] text-[#4a3728] py-20 space-y-20">
      
      {/* 1. Header */}
      <div className="text-center relative max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-serif text-[#4a3728] mb-4 tracking-tight">
          Featured Books
        </h2>
        <p className="text-lg italic text-[#4a3728]/60">
          Discover stories waiting to be shared
        </p>
      </div>

<div className="relative w-full flex items-center px-4 md:px-12">
  
  {/* Flèche Gauche */}
  <button onClick={prevSlide} className="absolute left-4 z-30 p-4 rounded-full bg-white/80 shadow-md hover:scale-110 transition-all text-[#4a3728]">
    <ChevronLeft size={24} />
  </button>

  <div className="w-full overflow-hidden py-12 px-4"> 
    <motion.div 
      className="flex gap-6"
      animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {books.map((book) => {
  // 1. On sécurise le chemin de l'image avec l'adresse du backend
  const bookCover = book.cover || book.photo;
  const imageSrc = bookCover?.startsWith('/') 
    ? `http://localhost:5000${bookCover}` 
    : bookCover;

  return (
    <Link 
      key={book._id} 
      to={`/book/${book._id}`} 
      className="min-w-[calc(33.333%-1rem)] block no-underline group/card"
    >
      <motion.div className="bg-[#FAF7F2] rounded-[2.5rem] p-5 shadow-sm border border-[#4a3728]/5 hover:shadow-xl transition-all duration-500 h-full cursor-pointer">
        
        <div className="relative h-80 w-full rounded-[1.8rem] overflow-hidden mb-6">
          
          {/* Badge Statut Dynamique */}
          <div className={`absolute top-4 left-4 z-10 text-white text-[10px] font-sans font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm ${
            book.status === 'AVAILABLE NOW' || book.status === 'Available' 
              ? 'bg-[#8D7B68]' 
              : 'bg-[#D2B48C]/90'
          }`}>
            {book.status}
          </div>
          
          {/* L'image du livre MODIFIÉE ICI */}
          <img 
            src={imageSrc || "https://placehold.co/400x600?text=No+Cover"}
            alt={book.title} 
            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
          />
        </div>

        {/* INFOS TEXTUELLES */}
        <div className="px-3 space-y-2">
          {/* Titre */}
          <h3 className="text-2xl font-serif font-medium text-[#4a3728] truncate">
            {book.title}
          </h3>
          
          {/* Auteur */}
          <p className="text-[#4a3728]/60 italic text-sm">
            {book.author}
          </p>
          
          {/* GENRE (Badge bas) */}
          <div className="pt-4">
            <span className="inline-block bg-[#EFEAD8]/50 text-[#8D7B68] text-[10px] font-bold px-5 py-2.5 rounded-xl uppercase tracking-widest border border-[#4a3728]/5">
              {book.genre}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
})}
    </motion.div>
  </div>

  {/* Flèche Droite */}
  <button onClick={nextSlide} className="absolute right-4 z-30 p-4 rounded-full bg-white/80 shadow-md hover:scale-110 transition-all text-[#4a3728]">
    <ChevronRight size={24} />
  </button>
</div>
      {/* Footer de section */}
      <div className="flex flex-col items-center gap-16">
        <motion.div {...fadeInUp}
                 transition={{ ...fadeInUp.transition, delay: 0.1 }}
                 className="flex flex-col sm:flex-row gap-5">
                 <Link to="/catalog" 
                  className="inline-flex  items-center gap-2 bg-[#8C7A63] hover:bg-[#766652] text-white px-10 py-4 rounded-full shadow-lg transition-all duration-300 mx-auto text-lg no-underline hover:scale-105">
                  <span className="text-sm">✦</span>
                  View All Books
                 </Link>
                </motion.div>
        

        {/* Séparateur Graphique */}
        <div className="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40">
          <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
          <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
          </div>
          <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
        </div>
      </div>

    </section>
  );
}