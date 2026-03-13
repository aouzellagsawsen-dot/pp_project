import React from 'react'
import { BookOpen } from 'lucide-react';
import { Star } from 'lucide-react';
import {Sparkle} from 'lucide-react'

const Sign_up = () => {
  return (
    <div className='flex justify-between flex-col items-center min-h-screen bg-[#F1EAD7] gap-[2]'>
      
      <div className='flex items-center mt-16'>
      <BookOpen strokeWidth={2.5} size={32} className='text-[#5C544B]'> </BookOpen>
      <h1 className='text-[#8D7B68] text-center text-[30px] font-[Lora]'>Alinéa</h1>
      </div>
      <form className='my-auto flex font-[Lora] flex-col bg-[#FAF6F0] pb-20 max-w-[500] min-w-[450] max-h-[700] min-h-[650] px-6 py-12 rounded-[20px] font-extrabold gap-2.5'>
        <h1 className='text-[#5C544B] text-4xl font-serif font-semibold text-[32px] tracking-tight text-center'>Join Our Community</h1>
        <p className='text-[#7A6A5A] text-[16px] font-medium text-center'>- Start sharing and discovering amazing books -</p>

        <div>
        <label className='font-[Inter] text-[#7A6A5A] size-[14] font-medium' htmlFor="name" value="name">Full Name</label>
        <input className='bg-[#ffffff] rounded-xl w-full' type="text" placeholder="" id="name"></input>
        </div>

        <div>
        <label className='font-[Inter] text-[#7A6A5A] font-medium' htmlFor="email" value="email">Email</label>
        <input className='bg-[#ffffff] rounded-xl p-[50] w-full' type="email" placeholder="" id="email"/>
        </div>

        <div>
        <label  className='font-[Inter] text-[#7A6A5A] font-medium' htmlFor="password" value="password">Password</label>
        <input className='bg-[#ffffff] rounded-xl w-full' type="password" placeholder="" id="password"/>
        </div>

        <div>
        <label className='font-[Inter] text-[#7A6A5A] font-medium'>Confirm Password</label>
        <input className='bg-[#ffffff] rounded-xl w-full' type="password"/>
        </div>

        <div>
          <input type="checkbox"/>
             <label className='font-[Inter] text-[#7A6A5A] text-[14px] font-medium'> I agree to the Terms of Service and Privacy Policy</label>
        </div>

        <button className='bg-[#8D7B68] flex justify-center text-[#FFFFFF] font-[Inter] rounded-full font-medium text-center w-full h-[54]'>
          <Star strokeWidth={2.5} size={9}></Star>Create Account</button>
       <div className='space-y-4'>
        <p className='text-[#7A6A5A] font-medium text-center'>Already have an account ? Sign in</p> 
        </div>
      </form>

    <div className='flex justify-center space-y-4'>
      <Sparkle size={10} strokeWidth={2.5} className='text-[#5C544B]'/>
      <p className='text-[#5C544B] text-[14px]'>Back to Home</p>
      <Sparkle size={10} strokeWidth={2.5} className='text-[#5C544B]'/>
     </div> 
    </div>
  )
}

export default Sign_up