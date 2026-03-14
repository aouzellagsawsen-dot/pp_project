import React from 'react'
import { BookOpen } from 'lucide-react';
import { Star } from 'lucide-react';
import {House} from 'lucide-react'
import { LayoutGrid } from 'lucide-react';
import {Sparkle} from 'lucide-react'

const Sign_up = () => {
  return (
    <div className='flex justify-between flex-col items-center min-h-screen bg-[#F1EAD7] gap-[2]'>
      
      <div className='flex items-center mt-16 gap-2 mb-6'>
      <BookOpen strokeWidth={2.5} size={32} className='text-[#8D7B68]'></BookOpen>
      <h1 className='text-[#5c544b] text-center text-[30px] font-serif'>Alinéa</h1>
      </div>
      
      <form className='my-auto flex font-[Lora] flex-col bg-white/60 pb-20 max-w-[500] min-w-[450] max-h-[700] min-h-[650] px-6 py-12 rounded-[20px] font-extrabold gap-2.5'>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-[#8D7B68]"></div>
          <LayoutGrid size={14} strokeWidth={4} className="text-[#8D7B68]" />
          <div className="h-px w-16 bg-linear-to-r from-transparent to-[#8D7B68]"></div>
        </div>

        <h1 className='text-[#5C544B] text-4xl font-serif font-semibold text-[32px] tracking-tight text-center'>Join Our Community</h1>
        <p className='text-[#7A6A5A] text-[16px] font-medium text-center italic'>- Start sharing and discovering amazing books -</p>

        <div>
        <label className='font-sans text-[#7A6A5A] size-[14] font-medium' htmlFor="name" value="name" required>Full Name</label>
        <input className='placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans focus:ring-1 border border-[#EFE7D6] focus:outline-none text-[#7A6A5A] bg-[#FFFBF2] rounded-xl w-full border-[' type="text" placeholder=" enter your full name" id="name"></input>
        </div>

        <div>
        <label className='font-sans text-[#7A6A5A] font-medium' htmlFor="email" value="email" required>Email</label>
        <input className='placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl p-[50] w-full text-[#7A6A5A]' type="email" placeholder=" enter your email" id="email"/>
        </div>

        <div>
        <label  className='font-sans text-[#7A6A5A] font-medium' htmlFor="password" value="password">Password</label>
        <input className='placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl w-full text-[#7A6A5A]' type="password" placeholder="" id="password"/>
        </div>

        <div>
        <label className='font-sans text-[#7A6A5A] font-medium'>Confirm Password</label>
        <input className='placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl w-full text-[#7A6A5A]' type="password"/>
        </div>

        <div>
          <input type="checkbox" required/>
             <label className='font-sans text-[#7A6A5A] text-[14px] font-normal'> I agree to the Terms of Service and Privacy Policy</label>
        </div>

       <div>
        <button className='bg-[#8D7B68] text-[#FFFFFF] font-[Inter] rounded-full font-medium text-center w-full py-2 px-0.5 flex justify-center items-center gap-1 shadow-2xl'>
          <Star strokeWidth={2.5} size={9}></Star><span className='font-medium'>Create Account</span></button>
      </div>

       <div className='mt-1.5 mb-0.5'>
        <p className='text-[#7A6A5A] font-medium text-center'>Already have an account ? <span className='underline'>Sign in</span></p> 
      </div>
    </form>

    <div className='flex items-center mb-3.5 gap-0.5 mt-3.5'>
      <House size={13} className='text-[#5C544B]'/>
      <p className='text-[#5C544B] text-[14px] hover:underline'>Back to Home</p>
      
     </div> 
    </div>
  )
}

export default Sign_up