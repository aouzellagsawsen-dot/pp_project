import React from 'react'
import { Sparkle,BookOpen } from 'lucide-react' 

const Terms_of_use = () => {
  return (
    <div className='bg-[#f1ead7] flex justify-center items-center'>
      
      <div className='align-top'>
        <div className='flex'>
        <BookOpen/>
        <h1>Alinèa</h1>
        </div>
        <a href="">Explore Books</a>
        <a href="">Add a book</a>
        <a href="">About</a>
      </div>
      <div className='flex justify-center items-center bg-white/60 gap-5 max-w-2xl m-6 border border-[#a88257]'>

        <div className='p-6'>
          <h1 className='text-[#8B6A45]'>REPUBLIC OF LETTERS  ALINEA</h1>

          <h1 className='text-[36px]'>Terms of Use</h1>

          <h1 className='italic text-[#8B6A45]'>Of the charter that governs our literary community</h1>
          <div className='flex'>
            <Sparkle className='text-[#8B6A45]' strokeWidth={2} size={15}/>
            <Sparkle className='text-[#8B6A45]' strokeWidth={2} size={15}/>
            <Sparkle className='text-[#8B6A45]' strokeWidth={2} size={15}/>
          </div>
          <div className='italic'>
            <div className='text-[#8B6A45] mb-4.5'>Made in Bejaia, the seventeenth day of February, two thousand and twenty-six</div>
            <p className='ml-4 font-[Cormorant Garamond] font-light'>To every member of the Alinéa community,
              <br></br>
            The present conditions have been drafted in a spirit of clarity and good faith, 
            so that every reader may engage freely and with full confidence within our literary sharing circle. 
            We invite you to read them with the same care you would give to the pages of a treasured book.</p>
          </div>

          <ol className='list-[upper-roman] flex gap-2 flex-col ml-4 space-y-4'>
            
            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Acceptance of terms</h1>
              <p className='font-[Cormorant Garamond] font-light'>By accessing Alinéa and using our services, you agree to be bound by these conditions. 
                If you do not adhere to these terms in their entirety, 
                we kindly ask that you refrain from using the platform.</p>
            </li>

            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Book Lending & Sharing</h1>
              <p className='font-[Cormorant Garamond] font-light'>Each member is responsible for the works they put into circulation. 
                Every loan must be conducted in good faith. The book must be returned in the same condition in which it was received, 
                within the timeframe agreed upon between the parties.</p>
            </li>

            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Code of Conduct</h1>
              <p className='font-[Cormorant Garamond] font-light'>The Alinéa community is founded upon mutual respect. Any disrespectful, abusive, 
                or conduct contrary to our values will result in the immediate suspension of the account concerned, without prior notice.</p>
            </li>

            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Liability</h1>
              <p className='font-[Cormorant Garamond] font-light'>Alinéa is a platform connecting book enthusiasts. 
                We cannot be held responsible for disputes, damages, 
                or losses arising from exchanges between members.</p>
            </li>

            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Amendments</h1>
              <p className='font-[Cormorant Garamond] font-light'>We reserve the right to amend these conditions at any time. 
                Any substantial modification shall be communicated to active members through the appropriate channels.</p>
            </li>

            <li className='marker:text-[#8B6A45] marker:font-light marker:text-lg pl-5'>
              <h1>Contact</h1>
              <p className='font-[Cormorant Garamond] font-light'>For any questions regarding these conditions, please do not hesitate to reach us through our dedicated contact page. 
                Our team pledges to respond in the most timely manner.</p>
            </li>

          </ol>
        </div>
       </div>
    </div>
  )
}

export default Terms_of_use