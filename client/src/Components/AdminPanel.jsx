"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from "../api/axios"; 

const QUOTES = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R.R. Martin" },
  { text: "Reading is dreaming with open eyes.", author: "Anonymous" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "To read is to voyage through time.", author: "Unknown" }
];

const AdminPanel = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/api/loans/pending-requests");
        setPendingRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const openApproveModal = (loanId) => {
    setSelectedLoanId(loanId);
    setIsModalOpen(true);
  };

  const handleConfirmApprove = async () => {
    if (!dueDate) {
      alert("Please select a due date for the return.");
      return;
    }

    try {
      await api.put(`/api/loans/approve/${selectedLoanId}`, { dueDate });
      setPendingRequests((prev) => prev.filter(req => req._id !== selectedLoanId));
      
      alert("Request approved! The borrower has been notified.");
      
      setIsModalOpen(false);
      setDueDate('');
      setSelectedLoanId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error during approval");
    }
  };

  const handleReject = async (loanId) => {
    try {
      await api.put(`/api/loans/reject/${loanId}`);
      setPendingRequests((prev) => prev.filter(req => req._id !== loanId));
      alert("Request declined.");
    } catch (error) {
      alert(error.response?.data?.message || "Error during rejection");
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F2E8D9] p-12 font-serif text-[#5D4037] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-16 flex justify-center">
          <div className="flex items-baseline gap-25 border-b border-[#D7C9B8] pb-4 px-8 w-fit">
            <div>
              <h1 className="text-4xl font-normal tracking-tight text-[#4a3728]">Admin Sanctum</h1>
            </div>
            <div className="text-sm italic opacity-40 font-serif">Alinéa &middot; MMXXVI</div>
          </div>
        </header>

         {/* --- QUOTES SECTION --- */}
         <div className="bg-[#EFE3D2] rounded-3xl p-16 min-h-[16rem] flex flex-col items-center justify-center border border-[#D7C9B8] shadow-sm overflow-hidden relative">
          <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#8D7B68] opacity-20"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#8D7B68] opacity-20"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-center max-w-2xl z-10"
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

          <div className="absolute bottom-6 opacity-5 select-none pointer-events-none">
             <span className="text-6xl">❦</span>
          </div>
        </div>
        <br></br>
        <br></br>

        {/* --- PENDING REQUESTS SECTION --- */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold opacity-60 mb-6 text-center">
            Pending Requests
          </h2>
          
          {isLoading ? (
            <p className="text-center italic opacity-60">Consulting the archives...</p>
          ) : pendingRequests.length === 0 ? (
            <div className="bg-[#EFE3D2]/50 rounded-2xl p-8 text-center border border-[#D7C9B8]/50 border-dashed">
              <p className="italic opacity-60">No pending requests at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <motion.div 
                  key={request._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#EFE3D2] p-6 rounded-2xl border border-[#D7C9B8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div>
                    <h3 className="text-xl font-medium text-[#2C2621] mb-1">
                      {request.physicalBook?.bookInfos?.title || "Unknown Book"}
                    </h3>
                    <p className="text-sm italic opacity-70">
                      Requested by <span className="font-semibold">{request.borrower?.username || request.borrower?.name || "A mysterious reader"}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleReject(request._id)}
                      className="px-5 py-2 rounded-xl text-sm font-sans font-medium text-[#6B2D21] border border-[#6B2D21]/20 hover:bg-[#6B2D21]/10 transition-colors"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={() => openApproveModal(request._id)}
                      className="px-5 py-2 rounded-xl text-sm font-sans font-medium bg-[#8D7B68] text-white shadow-md hover:bg-[#726252] transition-colors"
                    >
                      Accept Request
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- DUE DATE SELECTION MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#F2E8D9] rounded-3xl p-8 max-w-md w-full border border-[#D7C9B8] shadow-xl"
            >
              <h3 className="text-2xl font-normal text-[#4a3728] mb-2 text-center">Set a Due Date</h3>
              <p className="text-sm text-center italic opacity-70 mb-6">
                When should the borrower return this book?
              </p>

              <div className="mb-8">
                <input 
                  type="date" 
                  min={today}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-[#EFE3D2] border border-[#D7C9B8] rounded-xl px-4 py-3 text-[#5D4037] font-sans focus:outline-none focus:ring-2 focus:ring-[#8D7B68]/50"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3 rounded-xl text-sm font-sans font-medium text-[#4a3728] bg-transparent border border-[#D7C9B8] hover:bg-[#D7C9B8]/30 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmApprove}
                  className="flex-1 px-5 py-3 rounded-xl text-sm font-sans font-medium bg-[#8D7B68] text-white shadow-md hover:bg-[#726252] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;