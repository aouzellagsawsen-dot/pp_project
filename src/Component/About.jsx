"use client";
import React from 'react';
import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Leaf, Heart, ArrowRight, Star, BarChart3, TrendingUp, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const Members = [
  { name: "Abid Khalida", role: "Designer & Backend Developer" },
  { name: "Aouzellag Sawsen", role: "Designer & Frontend Developer" },
  { name: "Chelouah Mounia", role: "Designer & Frontend Developer" },
  { name: "Hamitouche Amel", role: "Designer & Backend Developer" }
];

const Stats = [
  { label: "Community Members", value: "100+", icon: <Users size={20} /> },
  { label: "Books in Circulation", value: "150+", icon: <BookOpen size={20} /> },
  { label: "Book Borrowed Rate", value: "88%", icon: <TrendingUp size={20} /> }, 
];

const Values = [
  { title: "Sustainable Reading", 
    desc: "Every second-hand book you borrow reduces the need for new printing, saving trees and water. Make your reading list green.",
    icon: <Leaf size={28} />},
  { title: "Hyper-Local Connections", 
    desc: "Meet fellow readers in your neighborhood. Turn digital connections into real-world discussions over a shared cup of coffee.",
    icon: <Globe size={28} />},
  { title: "Universal Access", 
    desc: "We believe culture should be free of charge. No subscriptions, no fees—just community trust.",
    icon: <Star size={28} />},
  { title: "Community Trust", 
    desc: "Our model thrives on respect. Treat shared books as if they were your own, ensuring they travel endlessly.",
    icon: <Heart size={28} />}
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F2E8D9] font-serif text-[#4a3728] overflow-x-hidden">
      
      {/* 1. HERO SECTION: OUR IMPETUS (What pushed us to create this site) */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <header className="mb-16 flex justify-center">
  <div className="flex items-baseline gap-12 border-b border-[#D7C9B8] pb-4 px-8 w-fit">
    
    <div>
      <h1 className="text-4xl font-normal tracking-tight text-[#4a3728]">
        Why we exist
      </h1>
    </div>

    <div className="text-sm italic opacity-40 font-serif">
      Alinéa &middot; MMXXVI
    </div>

  </div>
</header>
        <motion.h1 
          {...fadeIn}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 opacity-90"
        >
          For the stories that aren’t ready to end
        </motion.h1>
        <motion.p 
          {...fadeIn}
          className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed italic opacity-70"
        >
          Our homes are rich with silent histories, once cherished, now gathering dust. 
          We saw this wealth of culture separated from our communities by thin walls and silent streets. 
          Alinéa is the bridge we built to reconnect. It is a quiet rebellion against forgotten pages, turning the books we've loved into the conversations we've been missing.
           </motion.p>
      </section>

      {/* 2. LIVE IMPACT SECTION (Backend Data Simulation) */}
      <section className="py-20 px-6 bg-[#EFEAD8]/30">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
          {Stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-[#FAF7F2]/50 rounded-4xl border border-[#4a3728]/5 shadow-sm"
            >
              <div className="text-[#8D7B68] mb-3 flex justify-center items-center gap-2">
                  {stat.icon}
                  <h2 className="text-4xl font-bold">{stat.value}</h2>
              </div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-sans font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. OUR COMMITMENTS & BENEFITS (Combined) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-left">
            <h2 className="text-4xl md:text-5xl mb-6">Built on Shared Values</h2>
            <div className="w-24 h-px bg-[#4a3728] opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {Values.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }} // Slide right on hover
                className="bg-[#FAF7F2] p-10 rounded-[2.5rem] border border-[#4a3728]/10 shadow-sm transition-all flex gap-8 items-start"
              >
                <div className="text-[#8D7B68] shrink-0 mt-1">{item.icon}</div>
                <div>
                    <h3 className="text-2xl mb-4 font-medium">{item.title}</h3>
                    <p className="opacity-60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET THE FOUNDERS (4-member team) */}
      <section className="py-24 px-6 bg-[#F1EAD7]">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-16">The Minds Behind Alinéa</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {Members.map((member, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="group text-center"
                    >
                        <div className="aspect-square rounded-full bg-stone-300 overflow-hidden mb-6 mx-auto w-48 h-48 border-4 border-[#F2E8D9] group-hover:scale-110 transition-all duration-500">
                             {/* Placeholder for actual member photos */}
                             <div className="w-full h-full flex items-center justify-center text-4xl font-bold opacity-30 text-[#4a3728]">
                                {member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}
                             </div>
                        </div>
                        <h3 className="text-xl font-medium">{member.name}</h3>
                        <p className="text-[11px] uppercase tracking-widest text-[#8D7B68] mb-3">{member.role}</p>
                        <p className="text-xs opacity-60 max-w-62.5 mx-auto leading-relaxed">{member.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 px-6 border-t border-[#4a3728]/10 text-center opacity-40 text-[10px] uppercase tracking-[0.5em]">
        © 2026 Alinéa — No bookmarks were harmed.
      </footer>
    </div>
  );
};

export default AboutPage;