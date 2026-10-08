import React, { useState, useEffect } from 'react'
import { Box } from 'lucide-react'

const History = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace this URL with your actual backend endpoint
        const response = await fetch('http://localhost:5000/api/loans/my-history', {
          headers: {
            'Content-Type': 'application/json',
            // Pass the user authentication token
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setLoans(data.data);
        }
      } catch (error) {
        console.error("Error loading loan history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className='bg-[#FAF6F0] rounded-2xl p-6 flex flex-col justify-start items-center gap-1 w-full'>
        <div className='rounded-full bg-[#8D7B68]/[0.14] w-11 flex justify-center px-2 py-2'>
            <Box className='text-[#7A6A5A]' size={25}></Box>
        </div>
        <h1 className='font-sans mt-3 font-bold text-lg'>Loan History</h1>
        
        {loading ? (
            <p className='text-[#7A6A5A] font-sans text-sm mt-2'>Loading...</p>
        ) : (
            <>
                <p className='text-[#7A6A5A] font-sans text-sm mb-2'>
                    {loans.length} book(s) borrowed in total
                </p>

                {/* Books list container */}
                <div className='bg-[#FFF8E7] w-full rounded-xl p-3 flex flex-col gap-2 max-h-48 overflow-y-auto'>
                    {loans.length > 0 ? (
                        loans.map((loan) => (
                            <div key={loan._id} className='flex justify-between items-center border-b border-[#d8c2ac]/50 pb-2 last:border-none last:pb-0'>
                                <div className='flex flex-col text-left'>
                                    {/* Access title via relations: Loan -> PhysicalBook -> BookInfos */}
                                    <span className='font-semibold text-[14px] text-gray-800'>
                                        {loan.physicalBook?.bookInfos?.title || 'Unknown book'}
                                    </span>
                                    <span className='text-[11px] text-[#7A6A5A]'>
                                        Requested on: {new Date(loan.requestDate).toLocaleDateString('en-US')}
                                    </span>
                                </div>
                                
                                {/* Status badge based on loan.model.js enum */}
                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                                    loan.status === 'returned' ? 'bg-green-100 text-green-700' :
                                    loan.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                    loan.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-orange-100 text-orange-700' // For pending / overdue
                                }`}>
                                    {loan.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-sm text-[#7A6A5A] py-2'>
                            No loan history available.
                        </p>
                    )}
                </div>
            </>
        )}

        <button className='border rounded-xl px-4 py-1 border-[#d8c2ac] text-[#7A6A5A] text-[13px] font-semibold cursor-pointer hover:bg-[#8D7B68]/10 mt-4 transition-all'>
            See full activity
        </button>
    </div>
  )
}

export default History