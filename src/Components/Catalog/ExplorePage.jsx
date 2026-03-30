import React, { useState } from 'react'
import { Search,ChevronDown} from 'lucide-react'
import ProductCard from './ProductCard'
import database from '../../data/db.json'

const ExplorePage = () => {

    const [search, setsearch] = useState("")
    const [genre, setgenre] = useState("All genres")
    const [status, setstatus] = useState("All books")

    const books = database.books

    const filteredBooks = books.filter((book)=>{

        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) ||
                                book.author.toLowerCase().includes(search.toLowerCase())
        const matchesGenre = genre ==="All genres" || book.genre.toLowerCase()=== genre.toLowerCase()
        const matchesStatus = status === "All books" ||  book.status === status
        
        return matchesSearch && matchesGenre && matchesStatus ;
    })

  return (
<div className='flex justify-center flex-col items-center min-h-screen bg-[#f1ead7]'>
    <div className='pl-67 flex flex-col w-full'>
        <div className='w-full max-w-3xl px-1 mb-6 pt-5'>
          <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Explore Our Collection</h1>
          <p className='italic font-sans text-[#5C544B]'>Discover your next favorite book from our community library</p>
        </div>

        <div className='bg-[#FAF6F0] w-200 rounded-2xl p-6 shadow-md my-auto flex'>
            <div className='grid grid-cols-4 gap-4'>

                <div className='bg-[#FFF8E7] rounded-2xl col-span-2 flex border border-[#e4d2c0]'>
                    <Search className='w-5 h-5 ml-2 mt-2 text-[#7A6A5A]'></Search>
                    <input value={search} onChange={(e)=>setsearch(e.target.value)} id="searchbar" placeholder='Search by title or author...' type="text" className='w-full placeholder:font-extralight placeholder:font-sans pl-1.5 focus:outline-none'/>
                </div>

                <div className='col-span-1 rounded-2xl bg-[#FFF8E7] flex border border-[#e4d2c0] relative'>
                    <select value={genre} onChange={(e)=>setgenre(e.target.value)} className='appearance-none focus:outline-none p-2 cursor-pointer w-full'>
                        <option value="All genres" selected>All genres</option>
                        <option value="Classic Fiction">Classic Fiction</option>
                        <option value="Coming of Age">Coming of Age</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Horror">Horror</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16}/>
                    </div>
                </div>

                <div className='col-span-1 rounded-2xl bg-[#FFF8E7] flex border border-[#e4d2c0] relative'>
                    <select value={status} onChange={(e)=>setstatus(e.target.value)} className='appearance-none focus:outline-none p-2 cursor-pointer w-full'>
                        <option value="All books" selected>All books</option>
                        <option value="available" >Available</option>
                        <option value="borrowed" >Borrowed</option>
                        <option value="pending_swap" >Pending swap</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                        <ChevronDown size={16}/>
                    </div>
                </div>

            </div>

        </div>
         </div>
        <div className='max-w-6xl mt-9 mb-5 space-y-4 grid grid-cols-4 gap-6 w-full relative items-stretch'>
            { filteredBooks.length > 0 ? (
            filteredBooks.map((book)=>(
                <ProductCard key={book.id} book={book}/>
            ))) : (
                <p>No books found</p>
            ) }
        </div>
</div>
  )
}

export default ExplorePage