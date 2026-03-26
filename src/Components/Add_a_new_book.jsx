import React, { useState } from 'react'
import { Download,Quote } from 'lucide-react'

const Add_a_new_book = () => {

  const [preview, setpreview] = useState(null)

 const handlePreview = (event) => {
    const file = event.target.files[0]    
    
  if (file){      //s'assurer que le user a sélectionné un fichier

   const reader = new FileReader()
    reader.onload = () => {
    setpreview(reader.result)
  }
  reader.readAsDataURL(file)
    }

 }


  return (
  <div className='bg-[#f1ead7] min-h-screen flex flex-col justify-center items-center'>
      
      <div className='w-full max-w-3xl px-1 mb-6 pt-5'>
          <h1 className='font-serif font-semibold text-4xl text-[#5C544B] tracking-tight pb-1'>Add a New Book</h1>
          <p className='italic font-sans text-[#5C544B]'>Share your books with the community</p>
        </div>

    <div className='mx-auto p-10 mb-10 max-w-3xl grid grid-cols-3 gap-8 bg-white/60 rounded-2xl'>

        <div className='col-span-1 flex flex-col pt-6'>
          <label className='text-[#7A6A5A] font-sans font-medium pb-3'>Book Cover</label>

          <label className="relative w-full h-68 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/40">

            <input type="file" className='hidden' accept="image/png,image/jpeg,image/jpg" onChange={handlePreview}/>

            <div className="flex flex-col items-center p-6 text-center"></div>
            <Download className='pb-2 text-[#7A6A5A]' size={30}></Download>
            <p className="text-sm font-medium text-gray-600 leading-tight font-sans px-2 text-center">Click to upload book cover</p>
            <p className="text-[10px] text-gray-400 mt-2 uppercase">PNG, JPG up to 5MB</p>
            <img id="image-preview" src={preview} alt="Aperçu" className="absolute inset-0 w-full h-full object-cover"/>
          </label>
        </div>

        <form className='rounded-2xl space-y-5 p-6 col-span-2 min-w-0'>

          <div className='flex gap-4'>
            <div>
            <label className='font-sans text-[#7A6A5A] font-medium'>Book Title</label>
            <input type="text" placeholder='Enter title' className='bg-[#FFFBF2] border border-[#EFE7D6] font-sans focus:outline-none w-full py-1 rounded-lg placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'/>
            </div>

            <div>
            <label className='font-sans text-[#7A6A5A] font-medium' htmlFor='author name'>Author name</label>
            <input id="author name" type="text" placeholder='Enter author name' className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none py-1 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'/>
            </div>
          </div>

            <div>
              <label className='text-[#7A6A5A] font-medium'>Genre</label>
            <select defaultValue="Select a genre" className='bg-[#FFFBF2] border border-[#EFE7D6] rounded-lg w-full py-1 focus:outline-none text-[#7A6A5A] pl-1.5'>
              <option value="" hidden disabled>Select a genre</option>
              <option value="Classic Fiction">Classic Fiction</option>
              <option value="Coming of Age">Coming of Age</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Science Fiction">Science Fiction</option>
            </select>
            </div>

            <div>
            <label className='font-sans text-[#7A6A5A] font-medium' htmlFor='description'>Description</label>
            <textarea id="description" placeholder='Tell us about the book ...' className='font-sans bg-[#FFFBF2] border border-[#EFE7D6] min-h-32 rounded-lg focus:outline-none w-full placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'/>
            </div>

          <div className='flex flex-col gap-2'>
              
             <div className='flex items-center gap-1'>
              <Quote size={12} strokeWidth={0.125} className='fill-[#7A6A5A] opacity-70'></Quote>
            <label className='uppercase font-sans text-[#7A6A5A] font-bold'>Famous quotes</label>
            </div> 
              
            <input placeholder='Enter a memorable line ...' className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none placeholder:pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'/>
            <input placeholder='Enter another line ...' className='w-full bg-[#FFFBF2] border border-[#EFE7D6] font-sans rounded-lg focus:outline-none placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans text-[#7A6A5A] pl-1.5'/>
          </div>

           </form>
      
           <div className="flex justify-end items-center gap-5 pt-1 col-span-2 col-start-2 pr-6">
            <button className='text-[#8D7B68] hover:text-[#d6c1aa] cursor-pointer'>Cancel</button>
            <button className='text-[#FFFFFF] rounded-xl bg-[#8D7B68] py-2 px-6 hover:bg-[#685847] cursor-pointer'>Add Book</button>
            </div>
      </div>
       
    </div>
  )
}

export default Add_a_new_book