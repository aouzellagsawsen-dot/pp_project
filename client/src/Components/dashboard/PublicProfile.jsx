import { Book, MessageCircle, Star, User} from 'lucide-react'
import React from 'react'

const PublicProfile = () => {
  return (
    <div className='bg-[#f1ead7] min-h-screen flex flex-col items-center'>

        <div className='bg-[#FAF6F0] rounded-2xl h-35 flex mt-5 mx-auto px-85'>

            <div className='flex m-6 ml-3.5'>
                <div className='rounded-full overflow-hidden flex justify-center items-center border-amber-50 border-[3px] w-17 h-17'>
                    <img src="" alt="profile picture" className='w-full h-full object-cover'></img>
                </div>
            </div>

            <div className='flex flex-col gap-4'>
            <h1 className='text-[20px]'>new_user</h1>
             <p className='text-[#7A6A5A] text-[17px]'>Biography</p>
             <div className='flex'>
                <div className='flex flex-col'>
                    <h2>12</h2>
                    <p className='text-[#7A6A5A] text-[14px]'>Books shared</p>
                </div>
                {/*<div className='flex'>
                    <Star></Star>
                    <h2>4.8</h2>
                </div>*/}
             </div>
             <button className='flex gap-2 bg-[#7A6A5A] rounded-2xl text-white justify-center'>
                <MessageCircle size={15} className='ml-3 mt-1'></MessageCircle>
                <span className='font-sans font-semibold'>Send a message</span>
             </button>
             </div>
        </div>
        <div className='w-full max-w-4xl mt-12'>
            <div className='flex items-center gap-3 border-b border-[#dcd3bc] pb-4'>
             <Book className='text-[#7A6A5A] mt-2 mr-2.5' size={28}></Book>   
            <h1 className='font-serif font-light text-4xl text-[#5C544B] tracking-tight pb-1'>Books shared by ?</h1>
            </div>
        </div>
    </div>
  )
}

export default PublicProfile