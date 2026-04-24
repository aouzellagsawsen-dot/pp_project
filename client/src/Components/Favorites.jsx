import React, { useEffect } from 'react'
import { useFavorites } from './contexts/FavoritesContext';
import ProductCard from './Catalog/ProductCard';
import { Heart } from 'lucide-react'

const Favorites = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const {favorites} = useFavorites();
    const countBooks = favorites.length

  return (
    <div className='flex justify-center flex-col items-center min-h-screen bg-[#f1ead7]'>
        <div className='w-full max-w-3xl px-1 mb-6 pt-5 mr-85'>
          <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Your Favorites</h1>
          <p className='italic font-sans text-[#5C544B]'>
            <span>{countBooks}</span>
            <span> books you love</span></p>
        </div> 
        {favorites.length > 0 ? (
        <div className="max-w-6xl mt-9 mb-5 space-y-4 grid grid-cols-4 gap-6 w-full relative items-stretch px-6">
          {favorites.map(book => (
            <ProductCard key={book._id} book={book} />
            ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50 italic">
          <p>You do not have any favorites yet.</p>
        </div>
      )}
    </div>
  )
}

export default Favorites