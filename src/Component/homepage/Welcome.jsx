"use client"; 
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; 

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function HomePage() {

  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center px-6 py-20 font-serif text-[#4a3728]">
      
      {/* 2. Bloc Central : Titre et Sous-titre avec coins */}
      <div className="relative px-12 md:px-24 py-10 mb-8 group">
        
        {/* Coins décoratifs - Double Traits */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:left-1 after:w-full after:h-full after:border-t after:border-l after:border-[#4a3728]/30"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:right-1 after:w-full after:h-full after:border-t after:border-r after:border-[#4a3728]/30"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:left-1 after:w-full after:h-full after:border-b after:border-l after:border-[#4a3728]/30"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-full after:h-full after:border-b after:border-r after:border-[#4a3728]/30"></div>

        <h1 className="text-7xl md:text-9xl font-normal text-[#8D7B68] tracking-tight text-center">
          Alinéa
        </h1>
        <h2 className="text-2xl md:text-5xl italic opacity-90 text-center mt-2">
          Where Stories Travel
        </h2>
      </div>

      {/* 3. Symboles décoratifs (Fleurons) */}
      <div className="flex items-center gap-3 opacity-70 mb-12 text-[15px]">
        <span>❦</span><span>✦</span>
        <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
      </div>
      <span>✦</span><span>❦</span>
      </div>

      {/* 4. Phrase d'accroche avec tirets cadratins */}
      <p className="max-w-2xl text-center text-lg text-[#4a3728] md:text-xl opacity-70 italic mb-16 px-4">
        - Join a community of book lovers -
        <br></br>
        - Borrow, lend, and discover your next favorite read -
      </p>

      {/* 5. Boutons d'action */}
      <motion.div {...fadeInUp}
       transition={{ ...fadeInUp.transition, delay: 0.1 }}
       className="flex flex-col sm:flex-row gap-5">
        <div className="flex gap-4">
          <Link  to="/explore" 
             className="bg-[#8D7B68] text-[#F1EAD7] px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#7a6a59] transition-all shadow-md shadow-black/5">
            <span className="text-xs">✦</span> Explore Books
          </Link>
          <Link  to="/signup" 
               className="border border-[#4a3728]/70 px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#4a3728]/5 transition-all text-[#4a3728]/80" >
            <span className="text-sm">✦</span> Join the Community
          </Link>
        </div>
      </motion.div>

      <br></br>
      <br></br>

      <div className="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40 pt-10">
      <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
      <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
      </div>
      <div className="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
    </div>
    </div>

    

  );    
}