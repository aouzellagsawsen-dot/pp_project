import React, { useState } from 'react'
import { Calendar} from 'lucide-react'

const BookCard = ({book}) => {
  const formatDueDate = (dateString) => {
    if (!dateString) return "No date set";
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short'
    });
  };
  return (
  <div className="flex items-center justify-between bg-[#FAF6F0] p-4 rounded-[30px] mb-4 shadow-sm border border-[#F3EEE5] w-[728px]">
      <div className='bg-[#FAF6F0] flex items-center gap-5 flex-1'>
        <img className='w-20 h-25 object-cover rounded-2xl shadow-md' src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} alt="Book cover"></img>
        <div className='flex flex-col flex-1'>

          <h1 className='text-[28px] text-[#3E2F2B]'>{book.title}</h1>
          <p className='text-[#7A6A5A]'>{book.author}</p>
    
          <div className='flex'>
          <div className='flex items-center gap-2 mt-3 bg-[#FEF9E7] border border-[#F9EBC8] px-3 py-1 rounded-full w-fit'>
            <Calendar></Calendar>
             <span className="text-sm font-sans text-[#7A6A5A]">
                Return : {formatDueDate(book.dueDate)}
              </span>
          </div>
          
          </div> 
    
     </div>
    </div>
  </div>
  )
}

export default BookCard