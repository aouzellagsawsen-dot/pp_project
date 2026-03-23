import React from 'react'
import { Sparkles} from 'lucide-react' 
import Cachet from './Cachet.png'

const Terms_of_use = () => {

  const CG = "'Cormorant Garamond', serif";
  return (
    <div className='bg-[#f1ead7] flex justify-center items-center min-h-screen'>
        
      <div className='relative flex flex-col bg-white/60 max-w-2xl m-6 border border-[#a88257] pt-14 px-16 pb-16 rounded-sm'>

      <div className='absolute top-1 left-1 h-10 w-10 border-t border-l border-[#a88257]'></div>
      <div className='absolute bottom-1 left-1 h-10 w-10 border-b border-l border-[#a88257]'></div>
      <div className='absolute top-1 right-1 h-10 w-10 border-t border-r border-[#a88257]'></div>
      <div className='absolute bottom-1 right-1 h-10 w-10 border-b border-r border-[#a88257]'></div>

            <div className='p-6 pl-px flex flex-col items-center text-left'>

              <h1 className='text-[#8B6A45] pb-10 font-[11px] pt-0.5 tracking-wider uppercase'>Republic of letters Alinéa</h1>

              <div className="flex items-center justify-center gap-3 mb-6 w-full">
                  <div className="h-[1.5px] flex-1 bg-linear-to-r from-transparent via-[#8B6A45]/20 to-[#8B6A45]"/>
                  <span className="font-[Cormorant_Garamond] text-[#8B6A45] text-[18px] opacity-70">❧</span>
                  <div className="h-[1.5px] flex-1 bg-linear-to-l from-transparent via-[#8B6A45]/20 to-[#8B6A45]" />
              </div>

              <h1 className='text-[36px] font-[Cormorant Garamond] font-extralight tracking-wider'>Terms of Use</h1>

              <h1 className='italic text-[#8B6A45] pb-7 pt-2'>Of the charter that governs our literary community</h1>

                  <div className='flex items-center justify-center gap-2 mb-6 w-full'>
                    <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#8B6A45]/35"/>
                    <span className='flex'>
                    <Sparkles className='text-[#8B6A45] fill-[#8B6A45] opacity-70' strokeWidth={0.5} size={14}/>
                    <Sparkles className='text-[#8B6A45] fill-[#8B6A45] opacity-70' strokeWidth={0.5} size={14}/>
                    <Sparkles className='text-[#8B6A45] fill-[#8B6A45] opacity-70' strokeWidth={0.5} size={14}/>
                    </span>
                    <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#8B6A45]/35"/>
                  </div>

                <div className='text-[#8B6A45] mb-10 italic w-full text-center px-4 text-[13px]'>Made in Bejaia, the seventeenth day of February, two thousand and twenty-six</div>
                <p className='ml-4 font-[Cormorant Garamond] font-light italic leading-[1.80]'>
                  To every member of the Alinéa community,
                <br></br>
                The present conditions have been drafted in a spirit of clarity and good faith, 
                so that every reader may engage freely and with full confidence within our literary sharing circle. 
                We invite you to read them with the same care you would give to the pages of a treasured book.</p>
            </div>
                
              <ol className='list-[upper-roman] flex gap-2 flex-col ml-8 space-y-4 list-outside'>
                
                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Acceptance of terms</h1>
                      <p className='font-[Cormorant Garamond] font-light'>By accessing Alinéa and using our services, you agree to be bound by these conditions. 
                        If you do not adhere to these terms in their entirety, 
                        we kindly ask that you refrain from using the platform.</p>
                        <div className='h-px flex-1 bg-linear-to-b from-transparent via-[#8B6A45]/20 to-[#8B6A45]/35 mt-10 mb-2'></div>
                    </li>

                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Book Lending & Sharing</h1>
                      <p className='font-[Cormorant Garamond] font-light'>Each member is responsible for the works they put into circulation. 
                        Every loan must be conducted in good faith. The book must be returned in the same condition in which it was received, 
                        within the timeframe agreed upon between the parties.</p>
                        <div className='h-px flex-1 bg-linear-to-b from-transparent to-[#8B6A45]/35 mt-10 mb-2'></div>
                    </li>

                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Code of Conduct</h1>
                      <p className='font-[Cormorant Garamond] font-light'>The Alinéa community is founded upon mutual respect. Any disrespectful, abusive, 
                        or conduct contrary to our values will result in the immediate suspension of the account concerned, without prior notice.</p>
                        <div className='h-px flex-1 bg-linear-to-b from-transparent to-[#8B6A45]/35 mt-10 mb-2'></div>
                    </li>

                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Liability</h1>
                      <p className='font-[Cormorant Garamond] font-light'>Alinéa is a platform connecting book enthusiasts. 
                        We cannot be held responsible for disputes, damages, 
                        or losses arising from exchanges between members.</p>
                        <div className='h-px flex-1 bg-linear-to-b from-transparent to-[#8B6A45]/35 mt-10 mb-2'></div>
                    </li>

                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Amendments</h1>
                      <p className='font-[Cormorant Garamond] font-light'>We reserve the right to amend these conditions at any time. 
                        Any substantial modification shall be communicated to active members through the appropriate channels.</p>
                        <div className='h-px flex-1 bg-linear-to-b from-transparent to-[#8B6A45]/35 mt-10 mb-2'></div>
                        
                    </li>

                    <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
                      <h1>Contact</h1>
                      <p className='font-[Cormorant Garamond] font-light'>For any questions regarding these conditions, please do not hesitate to reach us through our dedicated contact page. 
                        Our team pledges to respond in the most timely manner.</p>
                    </li>
              </ol>

            <div className="flex items-center justify-center gap-3 mb-4 w-full mt-10">
                  <div className="h-[1.5px] flex-1 bg-linear-to-r from-transparent via-[#8B6A45]/20 to-[#8B6A45]"/>
                  <span className="font-[Cormorant_Garamond] text-[#8B6A45] text-[18px] opacity-70">❦</span>
                  <div className="h-[1.5px] flex-1 bg-linear-to-l from-transparent via-[#8B6A45]/20 to-[#8B6A45]" />
              </div>  
            
            <div className='ml-8 italic mb-10 mt-3'>
              <p className='italic mt-4 font-[Cormorant Garamond] font-light'>In witness whereof, we have caused this act to be sealed with our official mark,
              for the use and benefit of all members of our community.</p>
              <p className='font-[Cormorant Garamond] font-light text-[#8B6A45]'>- The Alinéa Team</p>
             </div>
             
             <div className='flex flex-col items-center'>
              <img src={Cachet} className='w-25 h-25'></img>
              <caption className='text-[#8B6A45] italic text-[12px] pt-1'>Official Seal · Alinéa, MMXXVI</caption>
              </div>
          </div>
    </div>
  )
}

export default Terms_of_use