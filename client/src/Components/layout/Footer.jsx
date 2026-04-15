import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ isLoggedIn }) => {
  return (
    <footer className="bg-[#FDF5E6] text-[#5D4037] pt-16 pb-8 px-12 border-t border-stone-200 font-sans">
      <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 relative z-10">
            <BookOpen className="w-7 h-7 text-[#8D7B68]" strokeWidth={1.5} />
            <h1 className="text-2xl font-serif font-medium tracking-tight">Alinéa</h1>
          </div>

          <p className="text-[14px] leading-relaxed max-w-xs opacity-80 italic">
            {isLoggedIn 
              ? "Happy reading! Share your latest discoveries with the Alinéa community."
              : "Where stories travel. Join our community of book lovers and share the joy of reading."
            }
          </p>
          <p className="text-[11px] pt-2 opacity-70">
            Made with <span className="text-[#8D7B68]">🤎</span> for book enthusiasts
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans font-bold text-base mb-2">Quick Links</h3>
          <nav className="flex flex-col space-y-4 font-serif text-[#7A5C41] font-medium tracking-wide">
            <Link to="/catalog" className="hover:text-[#8D7B68] transition-colors">Explore Books</Link>
            
            {isLoggedIn && (
              <>
                <Link to="/AddNewBook" className="hover:text-[#8D7B68] transition-colors">Add a Book</Link>
                <Link to="/dashboard" className="hover:text-[#8D7B68] transition-colors">Dashboard</Link>
                <Link to="/ContactUs" className="hover:text-[#8D7B68] transition-colors">Contact Us</Link>
              </>
            )}
          </nav>
        </div>

        {/* Legal */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-sans font-bold text-base mb-2">Legal</h3>
          <nav className="flex flex-col space-y-4 font-serif text-[#7A5C41] font-medium tracking-wide">
            <Link title="Terms" to="/terms" className="hover:text-[#8D7B68] transition-colors">Terms of Service</Link>
            <Link to="/Policy" className="hover:text-[#8D7B68] transition-colors">Privacy Policy</Link>
          </nav>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-360 mx-auto mt-16 pt-8 border-t border-stone-200/50 text-center">
        <p className="text-[11px] tracking-widest opacity-60 uppercase">
          © {new Date().getFullYear()} Alinéa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;