import React, { useEffect } from 'react';
import { useFavorites } from './contexts/FavoritesContext';
import ProductCard from './Catalog/ProductCard'; 
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { favorites } = useFavorites();
  const countBooks = favorites.length;

  return (
    <div className='flex flex-col pt-16 items-center w-full min-h-screen bg-[#f1ead7] pb-16'>
      
      {/* SECTION EN-TÊTE (Même alignement & typographie que ExplorePage) */}
      <div className='w-full px-6 sm:px-8 md:px-12 lg:px-16 pt-8 pb-4 mt-4'>
        <div className='max-w-[1400px] mx-auto border-b border-[#e4d2c0] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h1 className='text-3xl sm:text-4xl font-serif font-bold text-[#4a3728] tracking-tight'>
              Your Favorites
            </h1>
            <p className='text-[#8D7B68] text-base font-serif italic mt-1'>
              <span>{countBooks}</span>
              <span> {countBooks === 1 ? 'book' : 'books'} you love</span>
            </p>
          </div>
        </div>
      </div>

      {/* GRILLE DES FAVORIS (Full width responsive identique à ExplorePage) */}
      <div className='w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-6 sm:px-8 md:px-12 lg:px-16'>
        {favorites.length > 0 ? (
          favorites.map((book) => (
            <Link 
              key={book._id} 
              to={`/book/${book._id}`} 
              className='block no-underline group/card'
            >
              <ProductCard book={book} />
            </Link>
          ))
        ) : (
          /* ÉTAT VIDE (Look & Feel harmonisé) */
          <div className="col-span-full text-center py-24 flex flex-col items-center justify-center">
            <Heart className="w-14 h-14 text-[#a89f91] mb-4 opacity-40 stroke-[1.5]" />
            <p className="text-xl font-serif italic text-[#7A6A5A]">
              You do not have any favorites yet.
            </p>
            <p className="text-sm text-[#8D7B68] mt-1 font-sans">
              Explore the catalog and click the heart icon on any book to add it here.
            </p>
            <Link 
              to="/explore" 
              className="mt-6 px-8 py-3 bg-[#7A6A5A] text-white rounded-full hover:bg-[#635547] transition-all text-sm font-medium shadow-sm"
            >
              Explore Books
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Favorites;