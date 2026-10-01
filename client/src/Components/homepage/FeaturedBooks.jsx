"use client"; 
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Copy, FileText, CloudDownload } from "lucide-react";
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

  const nextSlide = () => {
    if (currentIndex >= totalItems - itemsPerPage) {
      setCurrentIndex(0); 
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(Math.max(0, totalItems - itemsPerPage));
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <section className="relative z-10 w-full bg-transparent py-20 flex items-center justify-center">
        <p className="font-serif italic text-[#4a3728]">Loading featured books...</p>
      </section>
    );
  }
 
 return (
    <section className="relative z-10 w-full bg-transparent text-[#4a3728] py-20 space-y-20">
      
      <div className="text-center relative max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-serif text-[#4a3728] mb-4 tracking-tight">
          Featured Books
        </h2>
        <p className="text-lg italic text-[#4a3728]/60">
          Discover stories waiting to be shared
        </p>
      </div>

      <div className="relative w-full flex items-center px-4 md:px-12">
        
        <button onClick={prevSlide} className="absolute left-4 z-30 p-4 rounded-full bg-[#FAF7F2]/90 shadow-md hover:scale-110 transition-all text-[#4a3728]">
          <ChevronLeft size={24} />
        </button>

        <div className="w-full overflow-hidden py-12 px-4"> 
          <motion.div 
            className="flex gap-6"
            animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.7 }}
          >
            {books.map((book) => {
              const bookCover = book.cover || book.photo;
              const imageSrc = bookCover?.startsWith('/') 
                ? `http://localhost:5000${bookCover}` 
                : bookCover;

              // Logique exacte pour le format (Papier, PDF, ou les deux)
              const hasPhysical = book.format?.includes('Physical');
              const hasPDF = book.format?.includes('PDF');
              
              let formatText = 'Papier';
              let FormatIcon = Copy;

              if (hasPhysical && hasPDF) {
                formatText = 'Papier + PDF';
                FormatIcon = CloudDownload;
              } else if (hasPDF && !hasPhysical) {
                formatText = 'PDF';
                FormatIcon = FileText;
              } else {
                formatText = 'Papier';
                FormatIcon = Copy;
              }

              const ownerName = book.owner?.username || book.ownerId?.username || book.ownerName || "Utilisateur";
              const initial = ownerName.charAt(0).toUpperCase();

              return (
                <Link 
                  key={book._id} 
                  to={`/book/${book._id}`} 
                  className="min-w-[calc(33.333%-1rem)] block no-underline group/card"
                >
                  <motion.div className="bg-[#FAF7F2] rounded-[2.5rem] shadow-sm border border-[#4a3728]/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden cursor-pointer">
                    
                    <div className="relative h-64 w-full bg-[#EAE2D1] overflow-hidden">
                      
                      {/* Badge Format positionné en bas à droite comme sur la maquette */}
                      <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-[#F1EAD7] px-2.5 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm tracking-wide">
                        <FormatIcon size={14} />
                        {formatText}
                      </div>
                      
                      <img 
                        src={imageSrc || "https://placehold.co/400x600/EAE2D1/4a3728?font=playfair-display&text=No+Cover"}
                        alt={book.title} 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/400x600/EAE2D1/4a3728?font=playfair-display&text=Missing+Cover";
                        }}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700" 
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[#C08C6B] text-[11px] font-bold uppercase tracking-widest mb-2">
                        {book.genre || 'ROMAN'}
                      </span>
                      
                      <h3 className="text-2xl font-serif font-bold text-[#3B2F2F] mb-1 truncate">
                        {book.title}
                      </h3>
                      
                      <p className="text-[#8D7B68] text-base mb-6 truncate">
                        {book.author}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#4a3728]/5">
                        <div className="flex items-center gap-1 text-[#C08C6B]">
                          <Star size={16} fill="currentColor" stroke="none" />
                          <Star size={16} fill="currentColor" stroke="none" />
                          <Star size={16} fill="currentColor" stroke="none" />
                          <Star size={16} fill="currentColor" stroke="none" />
                          <Star size={16} className="text-[#C08C6B]/40" strokeWidth={2} />
                          <span className="text-[#4a3728]/60 text-sm ml-1 font-medium">4.9 <span className="opacity-70">(201)</span></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#D2B48C] flex items-center justify-center text-white text-[10px] font-bold shadow-inner">
                            {initial}
                          </div>
                          <span className="text-sm font-medium text-[#4a3728]/80 truncate max-w-[80px]">
                            {ownerName}
                          </span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>

        <button onClick={nextSlide} className="absolute right-4 z-30 p-4 rounded-full bg-[#FAF7F2]/90 shadow-md hover:scale-110 transition-all text-[#4a3728]">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center gap-16">
        <motion.div {...fadeInUp}
                 transition={{ ...fadeInUp.transition, delay: 0.1 }}
                 className="flex flex-col sm:flex-row gap-5">
                 <Link to="/catalog" 
                  className="inline-flex items-center gap-2 bg-[#8D7B68] hover:bg-[#7a6a59] text-[#F1EAD7] px-10 py-4 rounded-full shadow-md shadow-black/5 transition-all duration-300 mx-auto text-lg no-underline hover:-translate-y-1">
                  <span className="text-sm">✦</span>
                  View All Books
                 </Link>
        </motion.div>
        
        <div className="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40">
          <div className="h-px flex-1 bg-gradient-to-l from-[#4a3728] to-transparent"></div>
          <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
            <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#4a3728] to-transparent"></div>
        </div>
      </div>

    </section>
  );
}