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
        <h1>new_user</h1>
        <p className='text-[#7A6A5A]'>new_user@email.com</p>
        <button className='flex items-center gap-2 border text-[#7A6A5A]'>
          <Settings size={17}></Settings>
          <span>Edit the profile</span>
          </button>
        </div>
        </div>
        <div className='bg-[#f6edd9] rounded-xl pl-4 pr-4 mt-4 border ml-5 mr-5 border-[#8D7B68]/22'>
        <h1 className='font-sans pt-3 pb-2'>Bio</h1>
         <p className='text-[#7A6A5A] font-sans pb-3'>Book lover and avid reader. Always looking for my next great read!</p>
        </div>
      </div>
      <div className='bg-[#FAF6F0] rounded-2xl h-42 flex flex-col gap-4 pr-4'>
        <div className='w-full flex justify-between pt-3 cursor-pointer hover:bg-[#8D7B68]/5'>
          <Link className='font-sans pl-4'>My public profile</Link>
          <ChevronRight className='text-[#8D7B68]' size={20}></ChevronRight>
        </div>
        <div className='w-full flex justify-between cursor-pointer hover:bg-[#8D7B68]/5'>
          <Link className='font-sans pl-4' to="/notifications">Notifications</Link>
          <ChevronRight className='text-[#8D7B68]' size={20}></ChevronRight>
         </div>
         <div className='w-full flex justify-between cursor-pointer hover:bg-[#8D7B68]/5'> 
          <Link className='font-sans pl-4' to="./favorites">My favorites</Link>
          <ChevronRight className='text-[#8D7B68]' size={20}></ChevronRight>
          </div>
          <div className='w-full flex justify-between cursor-pointer hover:bg-[#8D7B68]/5'> 
          <Link className='font-sans pl-4'>Admin Panel</Link>
          <ChevronRight className='text-[#8D7B68]' size={20}></ChevronRight>
          </div>
      </div>
    </div>
  )
}

export default Profile