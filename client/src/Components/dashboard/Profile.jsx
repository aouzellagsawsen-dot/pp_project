import React, { useEffect, useState } from 'react'
import { User,Settings,ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {

  const [ModelOpen, setModelOpen] = useState(false)

  const [formData, setformData] = useState(...formData)

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const handleCancel = () => {
    setModelOpen(false)
  }   

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

        <button onClick={()=> setModelOpen(true)} className='flex items-center gap-2 border text-[#7A6A5A] rounded-2xl cursor-pointer hover:bg-[#8D7B68]/5'>
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
        <Link  to="/dashboard/publicprofile" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'>
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
          <Link to="/adminpanel" className='w-full flex justify-between items-center cursor-pointer hover:bg-[#8D7B68]/5 border-b border-gray-300 p-1.5'> 
          <span className='font-sans text-[15px]'>Admin Panel</span>
          <ChevronRight className='text-[#8D7B68]' size={17}></ChevronRight>
          </Link>
      </div>

      {ModelOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
        onClick={(e)=>{
          if(e.target === e.currentTarget){
            setModelOpen(false)
          }
        }}>
          <div className="bg-[#FAF6F0] p-6 rounded-xl w-full max-w-lg relative shadow-2xl mx-4">
            <button onClick={()=>{
              setModelOpen(false)
            }} className='cursor-pointer absolute top-4 right-5 text-2xl text-gray-500 hover:text-gray-800 focus:outline-none'>&times;</button>

            <h2 className='font-serif text-2xl text-[#8D7B68] pb-4'>Edit the profile</h2>

            <div>

              <div>
                <label className='font-sans text-[#7A6A5A] font-medium'>Username</label>
                <input className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                placeholder='Enter your username' type="text"
                ></input>
              </div>

              <div>
                <label className='font-sans text-[#7A6A5A] font-medium'>Email</label>
                <input className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                placeholder='Enter your email' type="email"
                ></input>
              </div>

              <div>
                <label className='font-sans text-[#7A6A5A] font-medium'>Bio</label>
                <textarea className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'
                placeholder='Insert your bio here ...'
                ></textarea>
              </div>
            </div>

            <div className='flex gap-3'>
            <button type='button' className='text-[#8D7B68] hover:text-[#d6c1aa] cursor-pointer' onClick={handleCancel}>Cancel</button>
            <button className='text-[#FFFFFF] rounded-xl bg-[#8D7B68] py-2 px-6 hover:bg-[#685847] cursor-pointer'>Save</button>
            </div>
          </div>
        </div>
      )}





    </div>
  )
}

export default Profile