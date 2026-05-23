"use client"; 
import React from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Welcome = () => {
  return (
    <section className=" w-full bg-[#F1EAD7] text-[#4a3728] pb-0 mb-0 text-center">
    <div className="max-w-4xl mx-auto flex-col items-center">

        <div class="flex items-center justify-center w-full max-w-xl mx-auto gap-6 opacity-40 pt-10">
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
    <div class="grid grid-cols-2 gap-0.5 rotate-45 transform">
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
      <div class="w-1.5 h-1.5 bg-[#4a3728]"></div><div class="w-1.5 h-1.5 bg-[#4a3728]"></div>
    </div>
    <div class="h-px flex-1 bg-linear-to-l from-[#4a3728] to-transparent"></div>
  </div>
  <br />
  <br />

        {/* Titre Principal */}
        <h2 className="text-6xl font-medium text-[#333] mb-6 tracking-tight">
          Ready to Start Your Journey?
        </h2>

        {/* Petites icônes décoratives sous le titre */}
        <div className="flex justify-center gap-3 text-[#8B7E66] mb-8 text-sm">
          <span>❦</span>
          <span>✦</span>
          <span className="text-lg">❖</span>
          <span>✦</span>
          <span>❦</span>
        </div>

        {/* Texte de description */}
        <p className="text-[#666] text-lg mb-12 flex items-center justify-center gap-3 italic">
          - Join Alinéa today and become part of a community that loves sharing stories -
        </p>
       <motion.div {...fadeInUp}
         transition={{ ...fadeInUp.transition, delay: 0.1 }}
         className="flex flex-col sm:flex-row gap-5">
         <Link to="/signup" 
          className="inline-flex  items-center gap-2 bg-[#8C7A63] hover:bg-[#766652] text-white px-10 py-4 rounded-full shadow-lg transition-all duration-300 mx-auto text-lg no-underline hover:scale-105">
          <span className="text-sm">✦</span>
          Get Started for Free
         </Link>
        </motion.div>
        <br />
        <br />

    </div>
     </section>
  );
};

export default Welcome;