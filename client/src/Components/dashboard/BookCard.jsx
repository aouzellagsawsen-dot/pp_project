import React, { useState } from 'react'
import { Calendar} from 'lucide-react'

// const [returned, setReturned] = useState("")


const BookCard = ({book}) => {
  return (
  <div className="flex items-center justify-between bg-[#FAF6F0] p-4 rounded-[30px] mb-4 shadow-sm border border-[#F3EEE5] w-full">
      <div className='bg-[#FAF6F0] flex items-center gap-5 flex-1'>
        <img className='w-20 h-25 object-cover rounded-2xl shadow-md' src={book.cover?.startsWith('/') ? `http://localhost:5000${book.cover}` : book.cover} alt="Book cover"></img>
        <div className='flex flex-col flex-1'>

          <h1 className='text-[28px] text-[#3E2F2B]'>{book.title}</h1>
          <p className='text-[#7A6A5A]'>{book.author}</p>
    
          <div className='flex'>
          <div className='flex items-center gap-2 mt-3 bg-[#FEF9E7] border border-[#F9EBC8] px-3 py-1 rounded-full w-fit'>
            <Calendar></Calendar>
            <span>Return : 25 feb</span>
          </div>
          {/*<button className='px-2.5 py-1 rounded-2xl text-[#7A6A5A] border border-b-gray-500 ml-3 mt-3 hover:cursor-pointer'>
            <span>Mark returned</span></button>*/}
          </div> 
    
     </div>
    </div>
  </div>
  )
}

export default BookCard