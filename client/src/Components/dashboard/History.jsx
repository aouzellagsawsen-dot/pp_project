import React from 'react'
import { Box } from 'lucide-react'

const History = () => {
  return (
    <div className='bg-[#FAF6F0] rounded-2xl h-80 flex flex-col justify-center items-center gap-1'>
        <div className='rounded-full bg-[#8D7B68]/[0.14] w-11 flex justify-center px-2 py-2'>
            <Box className='text-[#7A6A5A]' size={25}></Box>
        </div>
        <h1 className='font-sans mt-3'>Loan History</h1>
        <p className='text-[#7A6A5A] font-sans'>5 books borrowed these last 3 months</p>
        <button className='border rounded-xl px-4 py-1 border-[#d8c2ac] text-[#7A6A5A] text-[13px] font-semibold cursor-pointer hover:bg-white/33 mt-4'>See full activity</button>

        <div className='bg-[#FFF8E7]'>

        </div>
    </div>
  )
}

export default History