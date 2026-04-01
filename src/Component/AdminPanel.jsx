import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Reading is dreaming with open eyes.", author: "Anonyme" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "To read is to voyage through time.", author: "Unknown" }
];

const INITIAL_REQUESTS = [
  { id: 1, title: "The Silent Patient", genre: "THRILLER", author: "Alex Michaelides", user: "Sophie Leroux", date: "14 Feb 2026", status: 'approved' },
  { id: 2, title: "Middlemarch", genre: "CLASSIC", author: "George Eliot", user: "Karim Benali", date: "15 Feb 2026", status: 'rejected' },
  { id: 3, title: "The Name of the Rose", genre: "HISTORICAL", author: "Umberto Eco", user: "Inès Dupont", date: "16 Feb 2026", status: 'approved' },
];

const AdminPanel = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  // Carrousel de citations (toutes les 12 secondes)
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const toggleStatus = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: req.status === 'approved' ? 'rejected' : 'approved' } : req
    ));
  };

  return (
    <div className="min-h-screen bg-[#F2E8D9] p-8 font-serif text-[#5D4037]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl mb-8 opacity-80">Admin Panel</h1>

        {/* Section Citations (Remplace les 4 carrés) */}
        <div className="bg-[#EFE3D2] rounded-2xl p-8 mb-8 h-32 flex items-center justify-center border border-[#D7C9B8] shadow-sm overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-xl italic font-medium">"{QUOTES[quoteIndex].text}"</p>
              <p className="text-sm mt-2 opacity-60">— {QUOTES[quoteIndex].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Onglet unique */}
        <div className="flex gap-4 mb-8">
          <button className="bg-[#8C6A5E] text-[#F2E8D9] px-6 py-2 rounded-full text-sm font-medium shadow-md">
            Pending Requests
          </button>
        </div>

        {/* Liste des requêtes */}
        <div className="space-y-4">
          {requests.map((book) => (
            <div key={book.id} className="bg-[#EFE3D2] rounded-3xl p-6 flex items-center justify-between border border-[#D7C9B8] shadow-sm relative overflow-hidden group">
              {/* Liseré décoratif à gauche */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${book.status === 'approved' ? 'bg-green-800/30' : 'bg-red-800/30'}`} />
              
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <span className="text-[10px] border border-[#A68A7D] px-2 py-0.5 rounded-full opacity-60 uppercase tracking-widest">
                    {book.genre}
                  </span>
                </div>
                <p className="italic opacity-70">by {book.author}</p>
                <p className="text-xs mt-4 opacity-50 uppercase tracking-tighter">
                  Submitted by <span className="font-bold">{book.user}</span> • {book.date}
                </p>
              </div>

              <div className="flex items-center gap-12">
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${book.status === 'approved' ? 'text-green-800/60' : 'text-red-800/60'}`}>
                  {book.status === 'approved' ? 'Sealed & Approved' : 'Void & Rejected'}
                </span>

                <div className="flex gap-4">
                  {/* Bouton Approved (Cachet) */}
                  <button 
                    onClick={() => toggleStatus(book.id)}
                    className="flex flex-col items-center gap-1 group/btn"
                  >
                    <div className={`w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${book.status === 'approved' ? 'border-transparent' : 'border-[#D7C9B8]'}`}>
                      {book.status === 'approved' && (
                        <motion.div 
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-12 h-12 bg-[#6B2D21] rounded-full flex items-center justify-center shadow-inner border border-[#4A1F17]"
                          style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}
                        >
                          <span className="text-[#F2E8D9] text-[8px] font-serif font-bold text-center leading-tight">OFFICIAL<br/>SEAL</span>
                        </motion.div>
                      )}
                    </div>
                    <span className={`text-[10px] italic ${book.status === 'approved' ? 'text-[#6B2D21]' : 'opacity-40'}`}>Approve</span>
                  </button>

                  {/* Bouton Reject */}
                  <button 
                    onClick={() => toggleStatus(book.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${book.status === 'rejected' ? 'border-red-900/40 bg-red-900/5' : 'border-dashed border-[#D7C9B8]'}`}>
                       {book.status === 'rejected' ? (
                         <div className="text-red-900 opacity-60 text-xl font-bold">✕</div>
                       ) : null}
                    </div>
                    <span className={`text-[10px] italic ${book.status === 'rejected' ? 'text-red-900' : 'opacity-40'}`}>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;