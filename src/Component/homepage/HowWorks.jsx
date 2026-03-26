"use client"; 
import { motion } from "framer-motion";
import { BookOpen, Users, Repeat } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function HomePage() {
  return (
    
    <section class="w-full bg-[#F1EAD7] text-[#4a3728] mt-32 space-y-20">
        <div className="w-full max-w-7xl mx-auto px-6 space-y-20">
  <div class="text-center">
    <h2 class="text-5xl md:text-6xl font-normal text-[#4a3728] mb-4">How It Works</h2>
    <p class="text-lg italic opacity-70">Simple, elegant, and community-driven</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
    
    <div class="relative group">
     
      <motion.div {...fadeInUp}
       transition={{ ...fadeInUp.transition, delay: 0.1 }}
      class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <BookOpen class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" /> 
        </div>

        <h3 class="text-2xl font-semibold mb-4">Browse Books</h3>
        <p class="text-sm opacity-70 leading-relaxed">Explore our curated collection of books shared by our community members.</p>
      </motion.div>
    </div>

    <div class="relative group">
      
      <motion.div {...fadeInUp}
       transition={{ ...fadeInUp.transition, delay: 0.3 }}
      class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <Users class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" />  
        </div>

        <h3 class="text-2xl font-semibold mb-4">Connect</h3>
        <p class="text-sm opacity-70 leading-relaxed">Request to borrow books and connect with fellow readers in your area.</p>
      </motion.div>
    </div>

    <div class="relative group">
      
      <motion.div {...fadeInUp}
       transition={{ ...fadeInUp.transition, delay: 0.5 }}
      class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <Repeat class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" />
        </div>
        <h3 class="text-2xl font-semibold mb-4">Share & Repeat</h3>
        <p class="text-sm opacity-70 leading-relaxed">Enjoy your read, share your thoughts, and discover more stories.</p>
      </motion.div>
    </div>
    </div>

  </div>

  <div class="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40 pt-10">
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
    <div class="grid grid-cols-2 gap-0.5 rotate-45 transform">
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
    </div>
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
  </div>

</section>
      
  );
}