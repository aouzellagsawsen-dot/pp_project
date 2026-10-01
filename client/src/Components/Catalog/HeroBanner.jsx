import React from 'react';
import { Link } from 'react-router-dom';

// Composant réutilisable pour les livres flottants
const FloatingBook = ({ className }) => (
    <div className={`absolute ${className}`}>
        <svg viewBox="0 0 45 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
            <rect width="45" height="60" rx="2" fill="#E6DDD0" />
            <line x1="8" y1="0" x2="8" y2="60" stroke="#D6CBB9" strokeWidth="1.5" />
            <line x1="14" y1="10" x2="32" y2="10" stroke="#D6CBB9" strokeWidth="1" strokeLinecap="round" />
            <line x1="14" y1="14" x2="26" y2="14" stroke="#D6CBB9" strokeWidth="1" strokeLinecap="round" />
        </svg>
    </div>
);

const HeroBanner = ({ isLoggedIn, booksCount = 0 }) => {
    return (
        <div className="relative w-full bg-[#f1ead7] pt-32 pb-12 px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start justify-center overflow-hidden">
            
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-20px) rotate(calc(var(--rot, 0deg) + 5deg)); }
                }
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-15px) rotate(calc(var(--rot, 0deg) - 5deg)); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                    50% { transform: translateY(-25px) rotate(calc(var(--rot, 0deg) + 8deg)); }
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
                .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
                .animate-float-fast { animation: float-fast 6s ease-in-out infinite; }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0; 
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
            `}</style>

            {/* --- LIVRES FLOTTANTS --- */}
            <FloatingBook className="w-[50px] top-[5%] left-[6%] animate-float-slow [--rot:-15deg] rotate-[-15deg] hidden sm:block" />
            <FloatingBook className="w-[40px] top-[45%] left-[3%] animate-float-medium [--rot:10deg] rotate-[10deg] hidden md:block" />
            <FloatingBook className="w-[45px] bottom-[10%] left-[18%] animate-float-fast [--rot:-8deg] rotate-[-8deg] hidden sm:block" />
            <FloatingBook className="w-[35px] bottom-[15%] left-[55%] animate-float-slow [--rot:15deg] rotate-[15deg]" />
            <FloatingBook className="w-[65px] bottom-[20%] right-[12%] animate-float-medium [--rot:-12deg] rotate-[-12deg]" />
            <FloatingBook className="w-[45px] top-[40%] right-[5%] animate-float-fast [--rot:22deg] rotate-[22deg] hidden md:block" />
            <FloatingBook className="w-[42px] top-[10%] right-[20%] animate-float-slow [--rot:-20deg] rotate-[-20deg] hidden lg:block" />

            {/* --- CONTENU PRINCIPAL --- */}
            <div className="max-w-[1200px] w-full mx-auto relative z-10 pl-0 md:pl-2">
                
                <span className="animate-fade-in-up delay-100 text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-[#b49b82] uppercase mb-5 block font-sans">
                    Shared Library
                </span>

                <h1 className="animate-fade-in-up delay-200 font-serif text-[3.5rem] sm:text-6xl md:text-[5.5rem] text-[#4a3728] leading-[1.15] mb-5 tracking-tight">
                    Discover,<br />
                    <span className="italic font-light">share</span>, read.
                </h1>

                <p className="animate-fade-in-up delay-300 font-sans text-[#7c7064] text-[15px] sm:text-base max-w-lg leading-relaxed mb-8">
                    {booksCount} {booksCount === 1 ? 'book available' : 'books available'} in your community. Lend your reads, borrow from others.
                </p>

                {isLoggedIn && (
                    <div className="animate-fade-in-up delay-400 flex flex-wrap items-center gap-4">
                        <Link
                            to="/AddNewBook"
                            className="flex items-center gap-1.5 bg-[#756455] hover:bg-[#5f5043] text-[#fbf8f3] font-sans text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300"
                        >
                            <span className="text-lg leading-none mb-[2px]">+</span>
                            <span>Add a book</span>
                        </Link>

                        <Link
                            to="/favorites"
                            className="flex items-center gap-2 bg-transparent hover:bg-[#e8dfcf] text-[#5f5043] border border-[#cfc3b3] font-sans text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300"
                        >
                            <span>View my wishlist</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroBanner;