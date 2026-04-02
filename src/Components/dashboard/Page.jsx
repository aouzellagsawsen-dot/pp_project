import React from 'react'
import { User,Plus,Heart,Star,Box,Book,BookOpen,Clock,Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

const Page = () => {

  // const [tab, settab] = useState(initialStyle)
  // const changeColorTab = () => {
  //   if(){
  //     settab()
  //   }
  //   else{
  //     settab()
  //   }
  // }


  return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col items-center'>
      <div className='w-full mt-5 mx-auto px-85'>
       <div className='flex gap-6 w-full max-w-5xl px-1 pt-5 mb-10 justify-between'>
        <div className='flex'>
          <div className='rounded-full bg-[#7A6A5A] flex justify-center items-center border-amber-50 border-[3px] w-17 h-17'>
          <User className='text-[white] w-7 h-7' size={20}></User>
        </div>
        <div className='flex flex-col ml-5'>
          <p className='text-[#8D7B68] text-[13px] mb-0.5'>Hello</p>
          <h1 className='text-[28px]'>user</h1>
          <p className='text-[#8D7B68] mt-0.5 text-[14px]'>Your space of reading is waiting for you</p>
          </div>
        </div>
        <Link className='bg-[#7A6A5A] text-[white] font-semibold flex rounded-2xl py-2.75 px-5.5 gap-2 m-5' to="/Add_a_new_book">
          <Plus size={20}></Plus>
          <span>Add a book</span>
        </Link>
      </div> 

      <div className='grid grid-cols-4 gap-4 justify-center'>
          <div className='flex flex-col bg-white/60 rounded-[20px] p-5 gap-3 col-span-1'>
            <div>
            <Book className='text-[#8D7B68]' size={17}></Book>
            </div>
            <p className='text-[#7A6A5A]'>Shared books</p>
          </div>
          <div className='flex flex-col bg-[#FFF8E7] rounded-[20px] p-5 gap-3 col-span-1'>
            <div>
            <Box className='text-[#8D7B68]' size={17}></Box>
            </div>
            <p className='text-[#7A6A5A]'>Ongoing</p>
          </div>
          <div className='flex flex-col bg-white/60 rounded-[20px] p-5 gap-3 col-span-1'>
          <div>
            <Heart className='text-[#8D7B68]' size={17}></Heart>
            </div>
            <p className='text-[#7A6A5A]'>Favorites</p>
          </div>
          <div className='flex flex-col bg-[#FFF8E7] rounded-[20px] p-5 gap-3 col-span-1'>
            <div>
            <Star className='text-[#8D7B68]' size={17}></Star>
            </div>
            <p className='text-[#7A6A5A]'>Average rating</p>
          </div>
      </div>

      <div className='mt-8'>
        <div className='flex flex-col gap-7'>
          <div className='flex gap-3 text-[#7A6A5A]'>
            <Box size={20}></Box>
            <p className='font-[13px] font-sans'>Borrows</p>
          </div>
          <div className='flex gap-3 text-[#7A6A5A]'>
            <BookOpen size={20}></BookOpen>
            <p className='font-[13px] font-sans'>My books</p>
          </div>
          <div className='flex gap-3 text-[#7A6A5A]'>
            <Clock size={20}></Clock>
            <p className='font-[13px] font-sans'>History</p>
          </div>
          <div className='flex gap-3 text-[#7A6A5A]'>
            <Settings size={20}></Settings>
            <p className='font-[13px] font-sans'>Profile</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Page