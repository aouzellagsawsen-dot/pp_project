import { BookOpen, Heart, Bell, Search, User, MessageSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-[#FDF5E6] border-b border-stone-200 text-[#5D4037] backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-360 mx-auto px-12 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <BookOpen className="w-8 h-8 text-[#8D7B68]" strokeWidth={1.5} />
          <h1 className="text-3xl font-serif font-medium tracking-tight">Alinéa</h1>
        </a>

        {/* Navigation Links - Centrés grâce au flex-1 et justify-center */}
       <nav className="hidden md:flex flex-1 font-serif justify-center text-[#5D4037] items-center gap-10">
  <a  href="/explore" className=" hover:text-[#8D7B68] transition-colors ">
    Explore Books </a>
  <a href="/add-book" className=" hover:text-[#8D7B68] transition-colors ">
    Add Book </a>
  <a href="/about" className=" hover:text-[#8D7B68] transition-colors ">
    About</a>
</nav>

        {/* User Controls */}
        <div className="flex items-center gap-5 shrink-0">
          
          {/* Groupe d'icônes actionnables */}
          <div className="flex items-center gap-2 pr-5 border-r border-stone-300">
            {/* Bouton Favoris */}
            <a href="/favorites" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all hover:scale-110 text-[#5D4037]" title="Favoris">
              <Heart size={22} strokeWidth={1.5} />
            </a>

            {/* Bouton Notifications */}
            <a href="/notifications" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all relative group" title="Notifications">
              <Bell size={22} strokeWidth={1.5} />
              <span className="absolute top-2 right-2 bg-[#8B5E3C] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FDF5E6]">
                2
              </span>
            </a>

            {/* Bouton Recherche */}
            <a href="/search" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all" title="Rechercher">
              <Search size={22} strokeWidth={1.5} />
            </a>

            {/* Bouton Messages */}
            <a href="/messages" className="p-2 hover:bg-[#8D7B68]/10 rounded-full transition-all relative group" title="Messages">
              <MessageSquare size={22} strokeWidth={1.5} />
              {/* Optionnel : Petit point si tu as un nouveau message */}
              <span className="absolute top-2 right-2 bg-[#8B5E3C] w-2 h-2 rounded-full border border-[#FDF5E6]">
              </span>
            </a>
          </div>

          {/* Profil Utilisateur */}
          <a href="/profile" className="flex items-center gap-3 pl-2 group">
            <div className="w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center group-hover:ring-2 group-hover:ring-[#8D7B68] transition-all overflow-hidden">
              <User size={20} className="text-stone-500" />
            </div>
            <span className="text-sm font-medium group-hover:text-[#8D7B68] transition-colors italic">Username</span>
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;