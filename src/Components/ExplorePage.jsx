import React from 'react'
import { Search,ChevronDown } from 'lucide-react'

const ExplorePage = () => {
  return (
    <div className='flex justify-between flex-col items-center min-h-screen bg-[#f1ead7]'>
        <div className='w-full max-w-3xl px-1 mb-6 pt-5'>
          <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Explore Our Collection</h1>
          <p className='italic font-sans text-[#5C544B]'>Discover your next favorite book from our community library</p>
        </div>
        <div className='bg-[#FAF6F0] rounded-2xl p-6 m-12 shadow-md my-auto flex'>
            <div className='grid grid-cols-4 gap-4'>
                <div className='rounded-xl col-span-2 bg-[#f8ecd0] flex'>
                    <Search className='w-5 h-5 text-[#7A6A5A]'></Search>
                    <input placeholder='Search by title or author...' type="text" className='placeholder:font-extralight placeholder:font-sans pl-1.5 focus:outline-none'/>
                </div>
                <div className='col-span-1 bg-[#f8ecd0]'>
                    <select className='focus:outline-none'>
                        <option value="All genres" selected>All genres</option>
                        <option value="Classic Fiction">Classic Fiction</option>
                        <option value="Coming of Age">Coming of Age</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='col-span-1 bg-[#f8ecd0]'>
                    <select className='focus:outline-none'>
                        <option className='selected'>All books</option>
                        <option>Available</option>
                        <option>Borrowed</option>
                    </select>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ExplorePage