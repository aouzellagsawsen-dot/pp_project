import React, { useState } from 'react'
import { Calendar} from 'lucide-react'

// const [returned, setReturned] = useState("")


const BookCard = ({book}) => {
  return (
    <div className='bg-[#FAF6F0] transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl rounded-2xl px-2 py-0.5'>
      <img src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} alt="Book cover"></img>
      <div className='flex flex-col'>
      <h1 className='text-[28px] text-[#3E2F2B]'>{book.title}</h1>
      <p className='text-[#7A6A5A]'>{book.author}</p>
    
    <div className='flex'>
      <div className='bg-[#92400E]'>
        <Calendar></Calendar>
        <span>Return : 25 feb</span>
      </div>
      <button className='rounded-2xl text-[#7A6A5A] border border-b-gray-500'>
        <span>Mark returned</span></button>
     </div> 

     </div>
    </div>
  )
}

export default BookCard