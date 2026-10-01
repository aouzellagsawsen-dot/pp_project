"use client"; 
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ChevronLeft, Calendar, MessageCircle } from 'lucide-react';
import api from "../api/axios"; 
import { useFavorites } from './contexts/FavoritesContext';

// Fonction de calcul du temps écoulé (ex: "2 weeks ago" / "3 days ago")
const timeAgo = (dateString) => {
  if (!dateString) return "Recently";
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

const BookDescription = ({ isLoggedIn }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { toggleFavorite, isBookFavorite } = useFavorites();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReserved, setIsReserved] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");
  const [activeTab, setActiveTab] = useState("description"); 
  
  // Review form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (book && book.format && book.format.length > 0) {
      setSelectedFormat(book.format[0]); 
    }
  }, [book]);

  const currentUserId = localStorage.getItem("userId"); 

  const fetchBook = async () => {
    try {
      const response = await api.get(`/api/books/${id}`);
      if (response.data.success) {
        setBook(response.data.data);
        if (response.data.data.isCurrentlyRequested) {
          setIsReserved(true);
        }
      } else {
        setBook(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBook();
  }, [id]);

  const handleReservation = async () => {
    if (isReserved) return;
    try {
      const response = await api.post(`/api/loans/request/${book.copyId}`, { 
        requestedFormat: selectedFormat 
      });
      if (response.data.success) {
        setIsReserved(true);
        alert(`Reservation sent successfully!`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error during reservation");
    }
  };

  const handleReviewSubmit = async () => {
    if (rating === 0 && !comment.trim()) {
      alert("Please provide at least a rating or a comment.");
      return;
    }
    try {
      const response = await api.post(`/api/books/${id}/reviews`, { rating, comment });
      if (response.data.success) {
        setRating(0);
        setComment("");
        fetchBook(); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <div className="p-20 text-center font-serif text-[#8D7B68] text-xl">Loading...</div>;
  if (!book) return <div className="p-20 text-center font-serif text-[#8D7B68]">Book not found.</div>;

  const isFavorite = isBookFavorite(book._id);
  const themes = book.genre === 'Others' ? [book.customGenre] : [book.genre];
  const ownerId = book.ownerId?._id || book.ownerId; 
  const ownerName = book.ownerId?.username || book.ownerId?.name || "Alinea Member";
  const ownerPdp = book.ownerId?.pdp || "https://ui-avatars.com/api/?name=" + ownerName;
  const pagesToDisplay = selectedFormat === 'PDF' ? book.pages?.pdf : book.pages?.physical;

  return (
    <main className="w-full min-h-screen bg-[#f1ead7] pt-32 selection:bg-[#8D7B68] selection:text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 font-sans text-[#4A3F35]">
        
        <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-[#8A7967] hover:text-[#5D544D] transition-colors text-sm font-medium">
          <ChevronLeft size={18} /> Back to exploration
        </button>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Image Container with Ornaments */}
            <div className="relative">
              <div className="absolute -left-6 top-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block z-10">✦</div>
              <div className="absolute -right-6 top-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block z-10">✧</div>
              <div className="absolute -left-8 bottom-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block z-10">✧</div>
              <div className="absolute -right-5 bottom-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block z-10">✦</div>

              <div className="relative z-0 w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg border border-[#EAE3D5]">
                <img 
                  src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <button 
                onClick={handleReservation}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-medium transition-all ${
                  isReserved ? 'bg-[#D8CFC0] text-white cursor-not-allowed' : 'bg-[#736556] text-white hover:bg-[#5c5045]'
                }`}
              >
                <Calendar size={18} /> {isReserved ? 'Reserved' : 'Reserve'}
              </button>
              
              <Link 
                to={`/Message?userId=${ownerId}&userName=${encodeURIComponent(ownerName)}&bookTitle=${encodeURIComponent(book.title)}`} 
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border border-[#736556] text-[#736556] font-medium hover:bg-[#F4EFE6] transition-all"
              >
                <MessageCircle size={18} /> Contact lender
              </Link>
              
              <button 
                onClick={() => toggleFavorite(book)} 
                className="w-full flex items-center justify-center gap-2 py-2 text-[#736556] text-sm hover:opacity-80 transition-opacity"
              >
                <Star size={18} className={isFavorite ? "fill-[#736556]" : ""} /> {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </button>
            </div>

            {/* Lender Container with Ornaments */}
            <div className="relative mt-4">
              <div className="absolute -left-3 -top-2 text-[#c5b5a1] text-base animate-pulse z-10">✦</div>
              <div className="absolute -right-3 -top-1 text-[#8D7B68] text-lg animate-pulse z-10">✧</div>
              <div className="absolute -left-3 -bottom-2 text-[#8D7B68] text-lg animate-pulse z-10">✧</div>
              <div className="absolute -right-3 -bottom-1 text-[#c5b5a1] text-base animate-pulse z-10">✦</div>

              <div className="relative z-0 bg-white p-5 rounded-[1.5rem] shadow-sm border border-[#EAE3D5] flex items-center gap-4">
                <img src={ownerPdp} alt={ownerName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-[10px] font-bold text-[#988C80] tracking-widest uppercase mb-1">Lender</p>
                  <p className="font-medium text-[#4A3F35] text-sm">{ownerName}</p>
                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs mt-0.5">
                     <Star size={10} className="fill-[#D4AF37]" /> 4.7
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-8 pt-2">
            
            <div className="mb-8">
              <p className="text-[11px] font-bold text-[#988C80] tracking-widest uppercase mb-3">
                {book.genre} • {book.language || 'ENGLISH'}
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-[#3A332C] mb-2">{book.title}</h1>
              <p className="text-xl md:text-2xl font-serif text-[#7A6A5A]">{book.author}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-[#D4AF37] font-medium text-sm">
                <Star size={16} className="fill-[#D4AF37]" />
                <Star size={16} className="fill-[#D4AF37]" />
                <Star size={16} className="fill-[#D4AF37]" />
                <Star size={16} className="fill-[#D4AF37]" />
                <Star size={16} className="fill-[#D4AF37] opacity-50" />
                <span className="text-[#7A6A5A] ml-1">{book.averageRating?.toFixed(1) || '0.0'} ({book.numReviews || 0})</span>
              </div>
              <div className="flex gap-2">
                {themes.map((theme, index) => (
                  <span key={index} className="bg-[#F4EFE6] text-[#736556] px-3 py-1 text-xs font-medium rounded-full">
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Container with Ornaments */}
            <div className="relative mb-10 w-full">
              <div className="absolute -left-6 top-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block z-10">✦</div>
              <div className="absolute -right-8 top-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block z-10">✧</div>
              <div className="absolute -left-10 bottom-[30%] text-[#8D7B68] text-2xl animate-pulse hidden sm:block z-10">✧</div>
              <div className="absolute -right-5 bottom-[20%] text-[#c5b5a1] text-xl animate-pulse hidden sm:block z-10">✦</div>

              <div className="relative z-0 bg-white rounded-[2rem] py-6 px-10 flex items-center justify-around shadow-sm border border-[#EAE3D5]">
                <div className="text-center">
                  <p className="text-2xl font-serif font-bold text-[#3A332C]">{pagesToDisplay || '-'}</p>
                  <p className="text-[10px] font-bold text-[#988C80] tracking-widest uppercase mt-1">Pages</p>
                </div>
                <div className="w-px h-10 bg-[#EAE3D5]"></div>
                
                <div className="text-center flex flex-col items-center">
                   {book.format && book.format.length > 1 ? (
                      <select 
                        value={selectedFormat} 
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="text-2xl font-serif font-bold text-[#3A332C] bg-transparent focus:outline-none cursor-pointer text-center appearance-none"
                      >
                        {book.format.map(fmt => (
                          <option key={fmt} value={fmt}>{fmt}</option>
                        ))}
                      </select>
                   ) : (
                      <p className="text-2xl font-serif font-bold text-[#3A332C]">{selectedFormat}</p>
                   )}
                  <p className="text-[10px] font-bold text-[#988C80] tracking-widest uppercase mt-1">Format</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button 
                onClick={() => setActiveTab("description")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "description" ? "bg-white shadow-sm border border-[#EAE3D5] text-[#3A332C]" : "text-[#988C80] hover:bg-white/50"
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab("avis")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "avis" ? "bg-white shadow-sm border border-[#EAE3D5] text-[#3A332C]" : "text-[#988C80] hover:bg-white/50"
                }`}
              >
                Reviews ({book.numReviews || 0})
              </button>
            </div>

            {activeTab === "description" ? (
              <div className="animate-in fade-in duration-300">
                <p className="text-[#5C544B] leading-relaxed font-serif text-lg mb-8">
                  {book.summary || book.description || "No description available for this book."}
                </p>

                <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#EAE3D5]">
                  <h3 className="text-[11px] font-bold text-[#988C80] tracking-widest uppercase mb-3">About the loan</h3>
                  <p className="text-sm text-[#5C544B] leading-relaxed">
                    This book is provided by <strong className="text-[#3A332C]">{ownerName}</strong>. The standard borrowing period is 21 days. If needed, you can request an extension directly through messaging.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                
                {/* Formulaire de publication d'avis */}
                <div className="bg-[#F8F5F0] p-6 rounded-[2rem] border border-[#EAE3D5] mb-4">
                  <h3 className="font-bold text-sm text-[#3A332C] mb-4">Leave a review</h3>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={24} 
                        className={`cursor-pointer transition-colors ${rating >= star ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D8CFC0]'}`} 
                        onClick={() => setRating(star)} 
                      />
                    ))}
                  </div>
                  <textarea
                    className="w-full bg-white border border-[#EAE3D5] rounded-[1rem] p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#736556] mb-4 resize-none"
                    rows="3"
                    placeholder="Share your reading experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button 
                    onClick={handleReviewSubmit}
                    className="bg-[#736556] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#5c5045] transition-all"
                  >
                    Publish my review
                  </button>
                </div>

                {/* Liste des avis formatée */}
                {book.reviews && book.reviews.length > 0 ? (
                  book.reviews.map((review, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#EAE3D5] flex items-start gap-4">
                      {/* Avatar */}
                      <img 
                        src={review.user?.pdp || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.username || 'User')}`} 
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0" 
                        alt="avatar" 
                      />
                      
                      <div className="flex-1">
                        {/* Nom de l'utilisateur */}
                        <p className="font-bold text-sm md:text-base text-[#3A332C] mb-1">
                          {review.user?.username || 'Member'}
                        </p>
                        
                        {/* Étoiles + Note + Temps écoulé */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#988C80] mb-2">
                          {review.rating > 0 && (
                            <>
                              <div className="flex text-[#D4AF37] gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={i < review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#D8CFC0]"} 
                                  />
                                ))}
                              </div>
                              <span className="font-semibold text-[#4A3F35]">{review.rating}.0</span>
                            </>
                          )}
                          
                          {review.rating > 0 && <span>•</span>}
                          
                          {/* Temps écoulé calculé à partir de createdAt */}
                          <span>{timeAgo(review.createdAt)}</span>
                        </div>

                        {/* Contenu du commentaire */}
                        {review.comment && (
                          <p className="text-[#5C544B] text-sm leading-relaxed font-sans">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                   <p className="text-[#7A6A5A] italic text-sm">No reviews yet. Be the first!</p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};  

export default BookDescription;