import React, { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Tableau explicite pour lier les noms aux bonnes URL
  const menuItems = [
    { name: 'My public profile', path: '/publicprofile' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Admin Panel', path: '/adminpanel' }
  ];

  return (
    <div className="w-full font-sans">
      <div className="bg-[#FDFBF7] rounded-[24px] border border-[#F2EBE1] overflow-hidden shadow-sm flex flex-col">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="w-full flex justify-between items-center p-5 hover:bg-[#F5EFE6] transition-colors border-b border-[#F2EBE1] last:border-0 text-[#3E2F2B] font-sans text-[15px] font-medium"
          >
            <span>{item.name}</span>
            <ChevronRight className="text-[#8D7B68]" size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;