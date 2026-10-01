import React, { useState } from 'react';
import { Star, Heart, Copy, FileText, CloudDownload } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

const StatusConfig = {
    available: { text: "Available", color: "bg-[#455d3e]/80 text-[#EBE6E0]" }, 
    borrowed: { text: "Borrowed", color: "bg-[#8b453e]/80 text-[#EBE6E0]" }, 
    pending_swap: { text: "Reserved", color: "bg-[#8D7B68]/80 text-[#EBE6E0]" }, 
    unavailable: { text: "Unavailable", color: "bg-gray-600/80 text-white" }
};

const ProductCard = ({ book }) => {
    const { toggleFavorite, isBookFavorite } = useFavorites();
    const isLiked = isBookFavorite(book._id);

    // Initialisation conditionnelle pour garder la couleur selon l'état du contexte
    const [color, setColor] = useState(isLiked ? "#c08c6b" : "transparent");

    const handleColor = (e) => {
        e.preventDefault();  
        e.stopPropagation();
        toggleFavorite(book);
        setColor(prev => prev === "transparent" ? "#c08c6b" : "transparent");
    };

    // Formattage de l'image
    const imageSrc = book.cover?.startsWith('/') 
        ? `http://localhost:5000${book.cover}` 
        : book.cover || "https://placehold.co/400x600/EAE2D1/4a3728?font=playfair-display&text=No+Cover";

    // Formattage des formats (Papier, PDF)
    const hasPhysical = book.format?.includes('Physical');
    const hasPDF = book.format?.includes('PDF');
    
    let formatText = 'Paper';
    let FormatIcon = Copy;

    if (hasPhysical && hasPDF) {
        formatText = 'Paper + PDF';
        FormatIcon = CloudDownload;
    } else if (hasPDF && !hasPhysical) {
        formatText = 'PDF';
        FormatIcon = FileText;
    }

    // Infos propriétaire
    const ownerName = book.owner?.username || book.ownerId?.username || "User";
    const initial = ownerName.charAt(0).toUpperCase();
    const ownerAvatar = book.owner?.pdp || book.ownerId?.pdp;
    const hasAvatar = ownerAvatar && !ownerAvatar.includes('default');

    // Statut
    const statusInfo = StatusConfig[book.status?.toLowerCase()] || StatusConfig.unavailable;

    // Notes
    const rating = book.averageRating ? book.averageRating.toFixed(1) : "0.0";
    const reviewsCount = book.numReviews || 0;

    return (
        <div className="bg-[#FAF7F2] rounded-[2rem] shadow-sm border border-[#4a3728]/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col overflow-hidden cursor-pointer group">
            
            {/* --- SECTION IMAGE --- */}
            <div className="relative aspect-[3/4] w-full bg-[#EAE2D1] overflow-hidden">
                
                {/* Badge Statut (En haut à gauche) */}
                <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-2 backdrop-blur-md shadow-sm uppercase tracking-wider ${statusInfo.color}`}>
                    {statusInfo.text}
                </div>

                {/* Bouton Favori (En haut à droite) */}
                <button 
                    onClick={handleColor} 
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                >
                    <Heart 
                        className={color !== "transparent" ? "text-[#c08c6b]" : "text-white"} 
                        size={18} 
                        fill={color}
                        strokeWidth={color !== "transparent" ? 0 : 2}
                    />
                </button>

                {/* Badge Format (En bas à droite) */}
                <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-[#F1EAD7] px-2.5 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm tracking-wide">
                    <FormatIcon size={14} />
                    {formatText}
                </div>

                {/* Image de couverture */}
                <img 
                    src={imageSrc}
                    alt={book.title} 
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/400x600/EAE2D1/4a3728?font=playfair-display&text=Missing+Cover";
                    }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
            </div>

            {/* --- SECTION INFOS --- */}
            <div className="p-5 flex flex-col flex-1">
                {/* Catégorie / Genre */}
                <span className="text-[#C08C6B] text-[10px] font-bold uppercase tracking-widest mb-1.5 line-clamp-1">
                    {book.genre || 'NOVEL'}
                </span>
                
                {/* Titre */}
                <h3 className="text-xl font-serif font-bold text-[#3B2F2F] mb-0.5 line-clamp-1">
                    {book.title}
                </h3>
                
                {/* Auteur */}
                <p className="text-[#8D7B68] text-sm mb-5 line-clamp-1">
                    {book.author}
                </p>
                
                {/* Pied de carte (Notes & Propriétaire) */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#4a3728]/10">
                    
                    {/* Étoiles et Note */}
                    <div className="flex items-center gap-1 text-[#C08C6B]">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={14} 
                                fill={i < Math.round(rating) ? "currentColor" : "none"} 
                                stroke={i < Math.round(rating) ? "none" : "currentColor"}
                                strokeWidth={1.5}
                                className={i >= Math.round(rating) ? "text-[#C08C6B]/40" : ""}
                            />
                        ))}
                        <span className="text-[#4a3728]/80 text-xs ml-1.5 font-medium">
                            {rating} <span className="opacity-60 font-normal">({reviewsCount})</span>
                        </span>
                    </div>

                    {/* Propriétaire */}
                    <div className="flex items-center gap-2 pl-2">
                        {hasAvatar ? (
                            <img 
                                src={ownerAvatar.startsWith('/') ? `http://localhost:5000${ownerAvatar}` : ownerAvatar} 
                                alt={ownerName}
                                className="w-6 h-6 rounded-full object-cover shadow-inner"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-[#D2B48C] flex items-center justify-center text-white text-[10px] font-bold shadow-inner">
                                {initial}
                            </div>
                        )}
                        <span className="text-[13px] font-medium text-[#4a3728]/80 truncate max-w-[70px]">
                            {ownerName}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;