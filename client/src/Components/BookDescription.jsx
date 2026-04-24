"use client"; 
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ChevronLeft } from 'lucide-react';
import api from "../api/axios"; 

const BookDescription = ({ isLoggedIn }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReserved, setIsReserved] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

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

  return (
    <main className="w-full min-h-screen bg-[#F1EAD7]">
      <div className="max-w-7xl mx-auto px-8 py-20 font-sans text-[#4A3F35]">
        
        <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-stone-500 hover:text-[#8D7B68]">
          <ChevronLeft size={20} /> <span className="text-sm font-medium">Retour</span>
        </button>

        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="w-full aspect-3/4 bg-white p-6 rounded-4xl shadow-2xl">
              <img 
                src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            
            <div className="mt-4">
              <Link to="/Message" className="text-sm text-[#8D7B68] underline">
                Contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="text-7xl font-serif text-[#2C2621] mb-4">{book.title}</h2>
            <p className="font-serif italic text-stone-500 text-2xl mb-10">by {book.author}</p>
            
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-stone-400 tracking-widest mb-4 uppercase">Summary</h4>
              <p className="text-[#5D544D] leading-relaxed font-serif italic text-xl border-l-2 border-[#8D7B68]/20 pl-6">
                {book.summary || book.description || "Aucun résumé disponible."}
              </p>
            </div>

            <div className="flex gap-6">
              <button 
                onClick={() => setIsReserved(true)} 
                className="flex-1 bg-[#8D7B68] text-white font-serif text-xl py-5 rounded-2xl shadow-lg"
              >
                {isReserved ? 'DEMANDE ENVOYÉE' : 'RÉSERVER CE LIVRE'}
              </button>
              
              <button 
                onClick={() => setIsFavorite(!isFavorite)} 
                className="px-10 border-2 border-stone-300 rounded-2xl"
              >
                <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};  

export default BookDescription;