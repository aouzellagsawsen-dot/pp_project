import React from 'react'
import { Star } from 'lucide-react'

const StatusColors = () => {
    available: 'bg-[green]';
    borrowed: 'bg-[red]';
    pending_swap: 'bg-[brown]'
}


const ProductCard = () => {
  return (
    <div>
        <div>
            <span className='p-auto h-9 w-auto rounded-full text-white text-bold font-sans flex justify-center items-center text-xs
            ${}
            
            '>
                <span>{Book.status}</span>
            </span>
        </div>
        <div className='bg-[white]'>
            <h1 className='font-sans'>{Book.title}</h1>
            <p className='font-sans text-[#7A6A5A] text-light'>{Book.author}</p>
            <div className='flex'>
                <Star className='fill-[#7A6A5A]'></Star>
                <p></p>
            </div>
            <p className='font-sans'>{Book.genre}</p>
        </div>
    </div>
  )
}

export default ProductCard