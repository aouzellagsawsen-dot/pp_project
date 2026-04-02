import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Reading is dreaming with open eyes.", author: "Anonyme" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "To read is to voyage through time.", author: "Unknown" }
];

const AdminPanel = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Carrousel de citations (toutes les 12 secondes)
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2E8D9] p-12 font-serif text-[#5D4037]">
      <div className="max-w-4xl mx-auto">
        
        {/* Titre discret */}
        <header className="mb-16 flex justify-center">
  
  <div className="flex items-baseline gap-25 border-b border-[#D7C9B8] pb-4 px-8 w-fit">
    
    <div>
      <h1 className="text-4xl font-normal tracking-tight text-[#4a3728]">Why we exist</h1>
    </div>

    <div className="text-sm italic opacity-40 font-serif">Alinéa &middot; MMXXVI</div>

  </div>
</header>

        {/* Section Citations - Devenue l'élément central */}
        <div className="bg-[#EFE3D2] rounded-3xl p-16 h-20 flex flex-col items-center justify-center border border-[#D7C9B8] shadow-sm overflow-hidden relative">
          
          {/* Ornement de coin */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#8D7B68] opacity-20"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#8D7B68] opacity-20"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-center max-w-2xl"
            >
              <p className="text-3xl md:text-xl italic font-light leading-relaxed mb-6 text-[#3E2F25]">
                "{QUOTES[quoteIndex].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-[#8D7B68] opacity-30"></div>
                <p className="text-xs uppercase tracking-[0.3em] opacity-60 font-bold">
                  {QUOTES[quoteIndex].author}
                </p>
                <div className="h-px w-8 bg-[#8D7B68] opacity-30"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Symbole de bas de page (Sceau Alinéa discret) */}
          <div className="absolute bottom-6 opacity-5 select-none">
             <span className="text-6xl">❦</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;