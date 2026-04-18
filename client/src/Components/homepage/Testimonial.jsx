import React from 'react';
import database from '../../data/db.json'; // On importe le JSON généré

const Testimonial = () => {
  // On récupère les témoignages du fichier JSON
  const { testimonials } = database;

  return (
    <section className="bg-[#F1EAD7] py-20 px-4 font-serif text-center">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-gray-300 w-16"></div>
            <p className="text-gray-500 tracking-widest text-xs uppercase">TESTIMONIALS</p>
            <div className="h-px bg-gray-300 w-16"></div>
          </div>
          <h2 className="text-5xl font-medium text-[#333] mb-4">What Our Readers Say</h2>
        </div>

        {/* Grille des avis */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-10 shadow-lg border border-gray-100 relative flex flex-col justify-between">
              
              <span className="absolute top-4 left-6 text-6xl text-[#E0D8C3] font-serif opacity-60">“</span>
              
              <div className="relative z-10">
                <div className="text-yellow-500 text-xl mb-6">★★★★★</div>
                <p className="text-[#555] leading-relaxed mb-10 italic text-[17px]">
                  « {item.text} »
                </p>
              </div>

              {/* Nom et Rôle générés par Faker */}
              <div className="border-t border-gray-200 pt-6 mt-auto">
                <h4 className="font-semibold text-lg text-[#333] mb-1">{item.name}</h4>
                <p className="text-xs text-gray-500 tracking-wider uppercase">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;