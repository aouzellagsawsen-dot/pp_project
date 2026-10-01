import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import HeroBanner from './HeroBanner';
import { Link } from 'react-router-dom';
import api from '../../api/axios.js';

const GENRES = [
    { label: "All", value: "All" }, { label: "Classic Fiction", value: "Classic Fiction" },
    { label: "Coming of Age", value: "Coming of Age" }, { label: "Dystopian", value: "Dystopian" },
    { label: "Fantasy", value: "Fantasy" }, { label: "Historical Fiction", value: "Historical Fiction" },
    { label: "Mystery", value: "Mystery" }, { label: "Romance", value: "Romance" },
    { label: "Science Fiction", value: "Science Fiction" }, { label: "Others", value: "Others" }
];
const LANGUAGES = ["All", "French", "English", "Arabic"];
const FORMATS = [
    { label: "All formats", value: "All" }, { label: "Paper", value: "Physical" },
    { label: "PDF", value: "PDF" }, { label: "Paper + PDF", value: "Both" }
];
const STATUS = [
    { label: "All statuses", value: "All" }, { label: "Available", value: "available" },
    { label: "Borrowed", value: "borrowed" }, { label: "Reserved", value: "pending_swap" }
];

const ExplorePage = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const [books, setBooks] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [language, setLanguage] = useState("All");
    const [format, setFormat] = useState("All");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("rating");

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12; // Modifiable (ex: 12 ou 18 livres)

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBooks = async () => {
            try {
                const response = await api.get('/api/books/list'); 
                if (response.data.success) {
                    setBooks(response.data.data);
                }
            } catch (error) {
                console.error("Error loading books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    // Réinitialiser la page quand un filtre change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, genre, language, format, status, sortBy]);

    let processedBooks = books.filter((book) => {
        const matchesSearch = book.title?.toLowerCase().includes(search.toLowerCase()) ||
                              book.author?.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genre === "All" || book.genre === genre;
        const matchesLanguage = language === "All" || book.language === language;
        const matchesFormat = format === "All" || 
            (format === "Physical" && book.format?.includes('Physical') && !book.format?.includes('PDF')) ||
            (format === "PDF" && book.format?.includes('PDF') && !book.format?.includes('Physical')) ||
            (format === "Both" && book.format?.includes('Physical') && book.format?.includes('PDF'));
        const matchesStatus = status === "All" || book.status === status;
        
        return matchesSearch && matchesGenre && matchesLanguage && matchesFormat && matchesStatus;
    });

    processedBooks.sort((a, b) => {
        if (sortBy === "rating") return (b.averageRating || 0) - (a.averageRating || 0);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
        return 0;
    });

    // Calcul des données paginées
    const totalPages = Math.ceil(processedBooks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBooks = processedBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="min-h-screen w-full bg-[#f1ead7] flex items-center justify-center font-serif italic text-[#7A6A5A]">Loading library...</div>;
    }

    return (
        <div className='flex flex-col items-center w-full min-h-screen bg-[#f1ead7] pb-16'>
            
            <HeroBanner isLoggedIn={isLoggedIn} booksCount={books.length} />

            <div className='w-full px-6 sm:px-8 md:px-12 lg:px-16 mb-4 mt-8'>
                <div className='flex flex-col md:flex-row gap-3 items-center justify-center max-w-[1400px] mx-auto'>
                    <div className='flex-1 w-full bg-white rounded-full flex items-center border border-[#e4d2c0] px-4 py-3 shadow-sm'>
                        <Search className='w-5 h-5 text-[#7A6A5A] mr-3' />
                        <input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder='Title, author, genre...' 
                            type="text" 
                            className='w-full bg-transparent outline-none text-[#4a3728] placeholder-[#a89f91]'
                        />
                    </div>

                    <div className='flex gap-3 w-full md:w-auto'>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-full border transition-colors shadow-sm font-medium
                                ${showFilters ? 'bg-[#7A6A5A] text-white border-[#7A6A5A]' : 'bg-[#FAF6F0] text-[#7A6A5A] border-[#e4d2c0] hover:bg-[#F0EBE1]'}`}
                        >
                            <Filter size={18} />
                            Filters
                        </button>

                        <div className='relative flex-1 md:flex-none'>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)} 
                                className='w-full appearance-none bg-white text-[#4a3728] border border-[#e4d2c0] rounded-full px-6 py-3 pr-10 outline-none cursor-pointer shadow-sm font-medium'
                            >
                                <option value="rating">Top rated</option>
                                <option value="title">Title A→Z</option>
                                <option value="recent">Most recent</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6A5A] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className='w-full px-6 sm:px-8 md:px-12 lg:px-16 mb-8'>
                    <div className='bg-[#FAF6F0] rounded-[2rem] p-8 border border-[#e4d2c0] shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1400px] mx-auto items-start'>
                        <div>
                            <h3 className='text-xs font-bold text-[#a89f91] uppercase tracking-wider mb-3'>GENRE</h3>
                            <div className='flex flex-wrap gap-2'>
                                {GENRES.map(g => (
                                    <button 
                                        key={g.value} 
                                        onClick={() => setGenre(g.value)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                                            ${genre === g.value ? 'bg-[#7A6A5A] text-white shadow-md' : 'bg-[#EAE2D1]/50 text-[#7A6A5A] hover:bg-[#EAE2D1]'}`}
                                    >
                                        {g.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className='text-xs font-bold text-[#a89f91] uppercase tracking-wider mb-3'>LANGUAGE</h3>
                            <div className='flex flex-wrap gap-2'>
                                {LANGUAGES.map(l => (
                                    <button 
                                        key={l} 
                                        onClick={() => setLanguage(l)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                                            ${language === l ? 'bg-[#7A6A5A] text-white shadow-md' : 'bg-[#EAE2D1]/50 text-[#7A6A5A] hover:bg-[#EAE2D1]'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className='text-xs font-bold text-[#a89f91] uppercase tracking-wider mb-3'>FORMAT</h3>
                            <div className='flex flex-wrap gap-2'>
                                {FORMATS.map(f => (
                                    <button 
                                        key={f.value} 
                                        onClick={() => setFormat(f.value)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                                            ${format === f.value ? 'bg-[#7A6A5A] text-white shadow-md' : 'bg-[#EAE2D1]/50 text-[#7A6A5A] hover:bg-[#EAE2D1]'}`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className='text-xs font-bold text-[#a89f91] uppercase tracking-wider mb-3'>STATUS</h3>
                            <div className='flex flex-wrap gap-2'>
                                {STATUS.map(s => (
                                    <button 
                                        key={s.value} 
                                        onClick={() => setStatus(s.value)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                                            ${status === s.value ? 'bg-[#7A6A5A] text-white shadow-md' : 'bg-[#EAE2D1]/50 text-[#7A6A5A] hover:bg-[#EAE2D1]'}`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* GRILLE DE LIVRES */}
            <div className='w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-6 sm:px-8 md:px-12 lg:px-16'>
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <Link key={book._id} to={`/book/${book._id}`} className='block no-underline group/card'>
                            <ProductCard book={book} />
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 flex flex-col items-center">
                        <Search className="w-12 h-12 text-[#a89f91] mb-4 opacity-50" />
                        <p className="text-lg font-serif italic text-[#7A6A5A]">No books match these criteria.</p>
                        <button 
                            onClick={() => {
                                setSearch(""); setGenre("All"); setLanguage("All"); setFormat("All"); setStatus("All");
                            }}
                            className="mt-4 px-6 py-2 bg-[#EAE2D1] text-[#7A6A5A] rounded-full hover:bg-[#d8ceb8] transition-colors"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>

            {/* BARRE DE PAGINATION (1/3, 2/3...) */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2.5 rounded-full border border-[#e4d2c0] bg-white text-[#7A6A5A] hover:bg-[#FAF6F0] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="px-5 py-2 rounded-full bg-[#FAF6F0] border border-[#e4d2c0] text-[#7A6A5A] font-serif italic text-sm font-medium shadow-sm">
                        {currentPage} / {totalPages}
                    </div>

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2.5 rounded-full border border-[#e4d2c0] bg-white text-[#7A6A5A] hover:bg-[#FAF6F0] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

        </div>
    );
};

export default ExplorePage;