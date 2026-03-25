import { BookOpen, Users, Repeat } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center justify-center px-6 py-20 font-serif text-[#4a3728]">
      
      {/* 1. Séparateur décoratif du haut (Ligne + Losange) */}
     <div className="flex items-center justify-center w-full max-w-xl gap-6 opacity-60">
      
      {/* Ligne de gauche avec dégradé (s'estompe vers la gauche) */}
      <div className="h-[1.5px] flex-1 bg-linear-to-r from-[#4a3728] to-transparent"></div>

      {/* Le Losange Central (4 petits carrés) */}
      <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
      </div>

      {/* Ligne de droite avec dégradé (s'estompe vers la droite) */}
      <div className="h-[1.5px] flex-1 bg-linear-to-r from-[#4a3728] to-transparent"></div>
      
    </div>
    <br></br>
    <br></br>

      {/* 2. Bloc Central : Titre et Sous-titre avec coins */}
      <div className="relative px-12 md:px-24 py-10 mb-8 group">
        
        {/* Coins décoratifs - Double Traits */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:left-1 after:w-full after:h-full after:border-t after:border-l after:border-[#4a3728]/30"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:top-1 after:right-1 after:w-full after:h-full after:border-t after:border-r after:border-[#4a3728]/30"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:left-1 after:w-full after:h-full after:border-b after:border-l after:border-[#4a3728]/30"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#4a3728]/60 after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-full after:h-full after:border-b after:border-r after:border-[#4a3728]/30"></div>

        <h1 className="text-7xl md:text-9xl font-normal text-[#8D7B68] tracking-tight text-center">
          Alinéa
        </h1>
        <h2 className="text-2xl md:text-5xl italic opacity-90 text-center mt-2">
          Where Stories Travel
        </h2>
      </div>

      {/* 3. Symboles décoratifs (Fleurons) */}
      <div className="flex items-center gap-3 opacity-70 mb-12 text-[15px]">
        <span>❦</span><span>✦</span>
        <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
      </div>
      <span>✦</span><span>❦</span>
      </div>

      {/* 4. Phrase d'accroche avec tirets cadratins */}
      <p className="max-w-2xl text-center text-lg text-[#4a3728] md:text-xl opacity-70 italic mb-16 px-4">
        - Join a community of book lovers -
        <br></br>
        - Borrow, lend, and discover your next favorite read -
      </p>

      {/* 5. Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-5">
        <button className="bg-[#8D7B68] text-[#F1EAD7] px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#7a6a59] transition-all shadow-md shadow-black/5">
          <span className="text-xs">✦</span> Explore Books
        </button>
        <button className="border border-[#4a3728]/70 px-10 py-4 rounded-full flex items-center gap-3 hover:bg-[#4a3728]/5 transition-all text-[#4a3728]/80">
          <span className="text-sm">✦</span> Join the Community
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="flex items-center justify-center w-full max-w-xl gap-6 opacity-60">
      
      {/* Ligne de gauche avec dégradé (s'estompe vers la gauche) */}
      <div className="h-[1.5px] flex-1 bg-linear-to-r from-[#4a3728] to-transparent"></div>

      {/* Le Losange Central (4 petits carrés) */}
      <div className="grid grid-cols-2 gap-0.5 rotate-45 transform">
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
        <div className="w-1.5 h-1.5 bg-[#4a3728]"></div>
      </div>

      {/* Ligne de droite avec dégradé (s'estompe vers la droite) */}
      <div className="h-[1.5px] flex-1 bg-linear-to-r from-[#4a3728] to-transparent"></div>
      
    </div>

      
      <section class="w-full max-w-6xl mt-32 space-y-20">
  <div class="text-center">
    <h2 class="text-5xl md:text-6xl font-normal text-[#4a3728] mb-4">How It Works</h2>
    <p class="text-lg italic opacity-70">Simple, elegant, and community-driven</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
    
    <div class="relative group">
     
      <div class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <BookOpen class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" /> 
        </div>

        <h3 class="text-2xl mb-4">Browse Books</h3>
        <p class="text-sm opacity-70 leading-relaxed">Explore our curated collection of books shared by our community members.</p>
      </div>
    </div>

    <div class="relative group">
      
      <div class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <Users class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" />  
        </div>

        <h3 class="text-2xl mb-4">Connect</h3>
        <p class="text-sm opacity-70 leading-relaxed">Request to borrow books and connect with fellow readers in your area.</p>
      </div>
    </div>

    <div class="relative group">
      
      <div class="bg-[#FAF7F2]/50 border border-[#4a3728]/10 rounded-[3rem] p-10 pt-16 text-center hover:border-[#4a3728]/30 transition-colors">
        
        <div class="flex justify-center mb-10">
          <Repeat class="w-10 h-10 text-[#4a3728] opacity-80 transition-opacity group-hover:opacity-100" />
        </div>
        <h3 class="text-2xl mb-4">Share & Repeat</h3>
        <p class="text-sm opacity-70 leading-relaxed">Enjoy your read, share your thoughts, and discover more stories.</p>
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
      






    </div>
  );
}