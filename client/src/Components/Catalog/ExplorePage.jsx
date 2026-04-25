import React, { useEffect, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import api from '../../api/axios.js'

const ExplorePage = () => {
    // 1. États pour les données du Back
    const [books, setBooks] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [search, setsearch] = useState("")
    const [genre, setgenre] = useState("All genres")
    const [status, setstatus] = useState("All books")

    // 2. Fonction de liaison avec le Back
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchBooks = async () => {
            try {
                // On appelle la route allBooks de ton controller
                const response = await api.get('/api/books/list'); 
                
                if (response.data.success) {
                    // On remplit notre state avec les vrais livres de la DB
                    setBooks(response.data.data);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des livres:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // 3. Filtrage (La logique reste la même, mais sur les données du Back)
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title?.toLowerCase().includes(search.toLowerCase()) ||
                              book.author?.toLowerCase().includes(search.toLowerCase());
        
       const matchesGenre = genre === "All genres" || 
                         (book.genre?.toLowerCase() === genre.toLowerCase());
        
        const matchesStatus = status === "All books" || book.status === status;
        
        return matchesSearch && matchesGenre && matchesStatus;
    });

    if (loading) {
        return <div className="min-h-screen bg-[#f1ead7] flex items-center justify-center font-serif italic">Loading library...</div>;
    }

    return (
        <div className='flex justify-center flex-col items-center min-h-screen bg-[#f1ead7]'>
            <div className='pl-67 flex flex-col w-full'>
                <div className='w-full max-w-3xl px-1 mb-6 pt-5'>
                    <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Explore Our Collection</h1>
                    <p className='italic font-sans text-[#5C544B]'>Discover your next favorite book from our community library</p>
                </div>

                {/* Section Filtres */}
                <div className='bg-[#FAF6F0] w-200 rounded-2xl p-6 shadow-md my-auto flex'>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className='bg-[#FFF8E7] rounded-2xl col-span-2 flex border border-[#e4d2c0]'>
                            <Search className='w-5 h-5 ml-2 mt-2 text-[#7A6A5A]' />
                            <input 
                                value={search} 
                                onChange={(e) => setsearch(e.target.value)} 
                                id="searchbar" 
                                placeholder='Search by title or author...' 
                                type="text" 
                                className='w-full bg-transparent placeholder:font-extralight pl-1.5 focus:outline-none'
                            />
                        </div>

                        {/* Dropdown Genre */}
                        <div className='col-span-1 rounded-2xl bg-[#FFF8E7] flex border border-[#e4d2c0] relative'>
                            <select value={genre} onChange={(e) => setgenre(e.target.value)} className='appearance-none bg-transparent focus:outline-none p-2 cursor-pointer w-full'>
                                <option value="All genres">All genres</option>
                                <option value="Classic Fiction">Classic Fiction</option>
                                <option value="Coming of Age">Coming of Age</option>
                                <option value="Dystopian">Dystopian</option>
                                <option value="Horror">Horror</option>
                                <option value="Historical Fiction">Historical Fiction</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Romance">Romance</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Others">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        {/* Dropdown Status */}
                        <div className='col-span-1 rounded-2xl bg-[#FFF8E7] flex border border-[#e4d2c0] relative'>
                            <select value={status} onChange={(e) => setstatus(e.target.value)} className='appearance-none bg-transparent focus:outline-none p-2 cursor-pointer w-full'>
                                <option value="All books">All books</option>
                                <option value="available">Available</option>
                                <option value="borrowed">Borrowed</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid des Livres provenant du Back */}
            <div className='max-w-6xl mt-9 mb-5 space-y-4 grid grid-cols-4 gap-6 w-full relative items-stretch px-6'>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <Link 
                            key={book._id} 
                            to={`/book/${book._id}`} 
                            className='min-w-[calc(33.333%-1rem)] block no-underline group/card'
                        >
                            <ProductCard book={book} />
                        </Link>
                    ))
                ) : (
                    <p className="col-span-4 text-center py-10 opacity-50 italic">No books found in the collection.</p>
                )}
            </div>
        </div>
    )
}

export default ExplorePage;