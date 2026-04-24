import React, { useEffect } from 'react'
import { Heart } from 'lucide-react'

const Favorites = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className='min-h-screen bg-[#f1ead7]'>
      <div className='pl-67 flex flex-col w-full'>
        <div className='w-full max-w-3xl px-1 mb-6 pt-5'>
          <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Your Favorites</h1>
          <p className='italic font-sans text-[#5C544B]'>? Books you love</p>
        </div>
       </div> 
    </div>
  )
}

export default Favorites