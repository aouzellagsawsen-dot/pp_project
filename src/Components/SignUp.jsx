import React, { useEffect, useState } from 'react'
import { BookOpen,Star,ChevronLeft,Feather,Sparkles,Eye,EyeOff} from 'lucide-react';
import { Link, useLocation, useNavigate} from 'react-router-dom';

const Sign_up = ({ setIsLoggedIn }) => {
  const [nameInput, setNameInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const [showPassword, setShowPassword] = useState(false)

  const toggleVisibility = () =>{
    setShowPassword(!showPassword)
  }


  const handleSubmit = (e) => {
  e.preventDefault(); // Indispensable
 
  const nameToSave = username.value || username; 
  
  localStorage.setItem('userName', nameToSave);
  if (setIsLoggedIn) {
    setIsLoggedIn(true);
  }
  
  localStorage.setItem('isLoggedIn', 'true');
  const destination = location.state?.from || "/welcome";
  navigate(destination);
};

  return (
    <div className='flex justify-between flex-col items-center min-h-screen bg-[#f1ead7] gap-[2]'>
      
      <div className="absolute top-10 right-10 w-24 h-24 text-stone-300 rotate-12">
        <Feather strokeWidth={0.5} size={80}/></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 text-stone-300 rotate-12">
        <Feather strokeWidth={0.5} size={100}/></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 text-stone-300 opacity-50">
        <Sparkles strokeWidth={0.5} size={40}/></div>

      <div className='flex items-center mt-16 gap-2 mb-6'>
      <BookOpen strokeWidth={2.5} size={32} className='text-[#8D7B68]'></BookOpen>
      <h1 className='text-[#5c544b] text-center text-[30px] font-serif'>Alinéa</h1>
      </div>
      
    <div className='top-0 absolute left-0 translate-x-3 translate-y-3 text-[#d8b486]'>
      <Sparkles size={24} strokeWidth={1}/>
      </div>

      <div className='bottom-0 absolute right-0 -translate-x-3 -translate-y-3 text-[#d8b486]'>
      <Sparkles size={24} strokeWidth={1}/>
      </div>

      <form onSubmit={handleSubmit}
      className='my-auto flex font-[Lora] flex-col bg-white/60 pb-20 max-w-[500] min-w-[450] max-h-[700] min-h-[650] px-6 py-12 rounded-[20px] font-extrabold gap-2.5'>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-[#8D7B68]"></div>
          <Feather size={14} strokeWidth={1.5} className="text-[#8D7B68]" />
          <div className="h-px w-16 bg-linear-to-r from-transparent to-[#8D7B68]"></div>
        </div>

        <h1 className='text-[#5C544B] text-4xl font-serif font-semibold text-[32px] tracking-tight text-center'>Join Our Community</h1>
        <p className='text-[#7A6A5A] text-[16px] font-medium text-center italic'>- Start sharing and discovering amazing books -</p>

        <div>
        <label className='font-sans text-[#7A6A5A] size-[14] font-medium' htmlFor="username" value="username" required>Username</label>
        <input className='pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none text-[#7A6A5A] bg-[#FFFBF2] rounded-xl w-full' type="text" placeholder=" Enter your username" id="username"></input>
        </div>
        
        <div>
        <label className='font-sans text-[#7A6A5A] size-[14] font-medium' htmlFor="name" value="name" required>Full Name</label>
        <input className='pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none text-[#7A6A5A] bg-[#FFFBF2] rounded-xl w-full' type="text" placeholder=" Enter your full name" id="name"></input>
        </div>

        <div>
        <label className='font-sans text-[#7A6A5A] font-medium' htmlFor="email" value="email" required>Email</label>
        <input className='pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl p-[50] h-5 w-full text-[#7A6A5A]' type="email" placeholder=" Enter your email" id="email"/>
        </div>

        <div>
        <label  className='font-sans text-[#7A6A5A] font-medium' htmlFor="password" value="password">Password</label>
        <div className='flex gap-2'>
        <input className='pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-bold placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl w-full h-5 text-[#7A6A5A]' type={showPassword ? "text" : "password"} placeholder=" ......" id="password"/>
        <button  type="button" onClick={toggleVisibility}>
          {showPassword ? <EyeOff size={20} className='text-[#7A6A5A]'></EyeOff> : <Eye size={20} className='text-[#7A6A5A]'></Eye>}
        </button>
        </div>
        </div>

        <div>
        <label className='font-sans text-[#7A6A5A] font-medium'>Confirm Password</label>
        <input className='pl-1.5 placeholder:text-[#e6cbb2] placeholder:font-extralight placeholder:font-sans border border-[#EFE7D6] focus:outline-none bg-[#FFFBF2] rounded-xl w-full text-[#7A6A5A]' type="password"/>
        </div>

        <div>
          <input type="checkbox" required/>
             <label className='font-sans text-[#7A6A5A] text-[14px] font-normal'> I agree to the Terms of Service and Privacy Policy</label>
        </div>

       <div>
        <button type="submit"
        className='bg-[#8D7B68] text-[#FFFFFF] font-sans rounded-full font-medium text-center w-full py-2 px-0.5 flex justify-center items-center gap-1 shadow-2xl'>
          <Star strokeWidth={2.5} size={9}></Star><span className='font-medium'>Create Account</span>
        </button>
      </div>

       <div className='mt-1.5 mb-0.5'>
        <p className='text-[#7A6A5A] font-medium text-center'>Already have an account ? <Link className='underline cursor-pointer' to="/signin">Sign in</Link></p> 
      </div>
    </form>

    <div className='flex items-center mb-3.5 gap-0.5 mt-3.5'>
      <ChevronLeft size={13} className='text-[#5C544B]'/>
      <Link className='text-[#5C544B] text-[14px] hover:underline cursor-pointer' to="/">Back to Home</Link>
      
     </div> 
    </div>
  )
}

export default Sign_up