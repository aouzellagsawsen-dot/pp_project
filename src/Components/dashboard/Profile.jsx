import React from 'react'
import { User,Settings,ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='bg-[#FAF6F0] rounded-2xl h-60'>
        <div className='flex m-6'>
          <div className='rounded-full bg-[#7A6A5A] flex justify-center items-center border-amber-50 border-[3px] w-17 h-17'>
          <User className='text-[white] w-7 h-7' size={20}></User>
        </div>
        <div className='flex flex-col gap-2 ml-3.5'>
        <h1 className='text-[20px]'>new_user</h1>
        <p className='text-[#7A6A5A] text-[14px]'>new_user@email.com</p>
        <button className='flex items-center gap-2 border text-[#7A6A5A] rounded-2xl'>
          <Settings size={17} className='ml-3'></Settings>
          <span className='font-[8px] font-sans mr-3'>Edit the profile</span>
          </button>
        </div>
        </div>
        <div className='bg-[#f6edd9] rounded-xl pl-4 pr-4 mt-4 border ml-5 mr-5 border-[#8D7B68]/22'>
        <h1 className='font-sans pt-3 pb-2'>Bio</h1>
         <p className='text-[#7A6A5A] font-sans pb-3'>Book lover and avid reader. Always looking for my next great read!</p>
        </div>
      </div>
      <div className='bg-[#FAF6F0] rounded-2xl h-35 flex flex-col justify-center items-center border border-gray-200 overflow-hidden'>
        <Link className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>My public profile</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
        </Link>
        <Link  to="/notifications" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
          <span className='font-sans text-[15px]'>Notifications</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
         </Link>
         <Link  to="/favorites" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'> 
          <span className='font-sans text-[15px]'>My favorites</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
          </Link>
          <Link className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'> 
          <span className='font-sans text-[15px]'>Admin Panel</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
          </Link>
      </div>
    </div>
  )
}

export default Profile