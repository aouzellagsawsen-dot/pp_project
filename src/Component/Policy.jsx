const articles = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as your name, email address, profile picture, and books you list on the platform.",
    image: "/image.png.png",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our services, and communicate with you.",
    image: "/image.png.png",
  },
  {
    title: "Information Sharing",
    content: "We do not sell or rent your personal information to third parties. Your profile is visible to facilitate sharing.",
    image: "/image.png.png",
  },
  {
    title: "Data Security",
    content: "We implement appropriate security measures to protect your personal information. However, no method is 100% secure.",
    image: "/image.png.png",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, update, or delete your personal information at any time.",
    image: "/image.png.png",
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us.",
    image: "/image.png.png",
  },
];

const toRoman = (num) => {
  const map = ["I", "II", "III", "IV", "V", "VI"];
  return map[num - 1] || num;
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F1EAD7] flex flex-col items-center py-20 px-6 font-serif text-[#4a3728]">

      {/* Header - Style République des Lettres */}
      <header className="text-center mb-20 max-w-2xl">
        <p className="uppercase tracking-[0.4em] text-[10px] mb-3 opacity-60 font-serif">
          REPUBLIC OF LETTERS · ALINÉA
        </p>
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="h-1px w-12 bg-[#4a3728] opacity-20"></div>
          <span className="italic text-2xl font-light opacity-50">❦</span>
          <div className="h-1px w-12 bg-[#4a3728] opacity-20"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="italic text-lg opacity-80">
         - Six articles, each sealed with our pledge -
        </p>
        <div className="mt-8 flex justify-center gap-3 opacity-30 text-[15px]">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </header>

      {/* Grid des Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {articles.map((article, index) => (
          <article
            key={index}
            className="bg-[#fdfbf7] border border-[#e8dfd3] shadow-sm p-10 flex flex-col items-center text-center relative group transition-all duration-700 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Ornements d'angles discrets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#8D7B68] opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#8D7B68] opacity-50"></div>

            {/* Numérotation Romaine */}
            <p className="text-[11px] tracking-[0.3em] text-[#a08b76] mb-8 uppercase opacity-70">
              ARTICLE {toRoman(index + 1)}
            </p>

            <div className="h-px w-full bg-[#4a3728] opacity-20 mt-4 mb-8"></div>
            
            {/* Titre de l'Article */}
           <div className="min-h-17.5 flex items-center justify-center">
              <h2 className="text-2xl font-medium leading-tight text-[#3e2f25]">
               {article.title}
              </h2>
            </div>
            
            {/* Corps du texte (Italique pour le style manuscrit) */}
            <div className="flex-1 flex flex-col justify-center py-8">
              <p className="text-[15px] leading-relaxed opacity-85 italic font-light px-2">
               {article.content}
              </p>
            </div>

            <div className="h-px w-full bg-[#4a3728] opacity-20 mt-4 mb-8"></div>

            {/* Section du Sceau (Image) */}
            <div className="mt-auto flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* L'image transmise dans l'objet */}
                <img 
                  src={article.image} 
                  alt="Official Seal"
                  className="w-16 h-16 object-contain grayscale-[0.2] sepia-[0.2] transition-transform group-hover:scale-110 duration-500"
                />
                {/* Overlay pour simuler une texture de papier/cire par-dessus l'image */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] pointer-events-none opacity-50"></div>
              </div>
              
              <p className="text-[9px] mt-6 uppercase tracking-[0.2em] opacity-40 italic">
                Certified · Alinéa MMXXVI
              </p>
            </div>

            {/* Décoration de fond très subtile */}
            <div className="absolute bottom-6 left-6 text-[10px] opacity-[0.05]">✦</div>
          </article>
        ))}
      </div>

      {/* Footer Final */}
      <footer className="mt-24 text-center">
        <div className="h-px w-24 bg-[#4a3728] opacity-10 mx-auto mb-8"></div>
        <p className="text-[11px] text-[#8c7a6b] italic tracking-[0.15em] uppercase">
          Last sealed — Bejaïa, the twenty-seventh of February, <br className="md:hidden" /> two thousand and twenty-six
        </p>
      </footer>
    </div>
  );
}