import { Book, MessageCircle, Star } from 'lucide-react'
import React, { useEffect } from 'react'
import api from '../../api/axios'
const PublicProfile = () => {
  
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const userName = localStorage.getItem('userName') || "Reader";
  return (
    <div className='bg-[#f1ead7] min-h-screen p-8 flex flex-col items-center'>
     
      <div className='bg-[#FAF6F0] rounded-3xl p-8 flex gap-8 w-full max-w-4xl shadow-sm'>
        
        <div className='relative'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm'>
            <img 
              src={userName.pdp} 
              alt="profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-4xl font-serif text-[#3d3125]'>{userName}</h1>
            <p className='text-[#8b7a67] mt-2 text-lg'>
              Biography
            </p>
          </div>

          {/* Stats : Livres et Rating */}
          <div className='flex gap-12'>
            <div className='flex flex-col'>
              <span className='text-2xl text-[#3d3125]'>12</span>
              <span className='text-[#8b7a67] text-sm'>Books Shared</span>
            </div>
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <Star className='fill-[#8b7a67] text-[#8b7a67]' size={24} />
                <span className='text-2xl text-[#3d3125]'>4.8</span>
              </div>
              <span className='text-[#8b7a67] text-sm'>Rating</span>
            </div>
          </div>

          {/* Bouton Message */}
          <button className='flex items-center gap-2 bg-[#8b7a67] hover:bg-[#7a6a5a] transition-colors rounded-full px-6 py-2.5 w-fit text-white cursor-pointer'>
            <MessageCircle size={20} />
            <span className='font-medium'>Send Message</span>
          </button>
        </div>
      </div>

      {/* Titre de la section du bas */}
      <div className='w-full max-w-4xl mt-12'>
        <div className='flex items-center gap-3 border-b border-[#dcd3bc] pb-4'>
            <Book className='text-[#8b7a67]' size={27}></Book>
          <h2 className='font-serif text-3xl text-[#5C544B]'>
            Books shared by {userName}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default PublicProfile