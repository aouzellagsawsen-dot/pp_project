import React, { useState } from 'react'
import { Star,Heart } from 'lucide-react'
import { useFavorites } from '../contexts/FavoritesContext'


const StatusColors = {
    available: "bg-[green]",
    borrowed: 'bg-[red]',
    pending_swap: 'bg-[brown]'
}

const ProductCard = ({book}) => {
    const { toggleFavorite, isBookFavorite } = useFavorites();
const isLiked = isBookFavorite(book._id);

    const [color, setcolor] = useState("white")

const handleColor = (e) => {
    e.preventDefault();  
    e.stopPropagation();
    toggleFavorite(book);
    if(color==="white") setcolor("#7A6A5A")
    else setcolor("white")
}
  return (
    <div className='bg-[#FAF6F0] hover:bg-white/33 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl rounded-2xl'>
        <div className='relative aspect-3/4 w-full'>
        <img src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} className='absolute inset-0 w-full h-full object-cover rounded-xl' alt={book.title} />
            <div className='flex justify-between'>
                <span className={`border absolute top-3 left-3 py-0.5 px-1 h-8 w-auto rounded-full text-white text-bold font-sans flex justify-center items-center text-xs
                ${StatusColors[book.status]} w-fit`}>
                    <span className='font-semibold'>{book.status}</span> 
                </span>
                <button className='absolute top-3 right-3 rounded-full bg-[white] w-10 h-10 flex justify-center items-center'>
                    <Heart className='text-[#7A6A5A] cursor-pointer' size={20} onClick={handleColor} fill={`${color}`}></Heart>
                </button>
            </div>
        </div>
        
        <div className='flex gap-1 p-4 flex-col w-full'>
            <div className='flex flex-wrap'>
            <h3 className='font-serif text-lg line-clamp-1'>{book.title}</h3>
            </div>
            <div className='flex'>
            <p className='font-sans text-[#7A6A5A] pb-0.5 line-clamp-1'>{book.author}</p>
            </div>
            <div className='flex justify-baseline items-center gap-1'>
                <Star className='fill-[#7A6A5A] text-[#7A6A5A]' size={15}></Star>
                <p className='text-[15px]'>4.5</p>
            </div>
            <p className='font-sans text-xs mt-2 mb-2 pl-3'>{book.genre}</p>
        </div>
    </div>
  )
}

export default ProductCard