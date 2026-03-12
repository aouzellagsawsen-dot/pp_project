import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'

export default function App() {
  return (
   <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-5 gap-6 text-center">
  <h1 className="text-5xl font-bold text-blue-400 hover:scale-110 transition">
    C'est prêt ! 🚀
  </h1>
  <p className="text-xl text-slate-300">
    L'espacement et Tailwind fonctionnent enfin.
  </p>
  <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-500/20">
    Bouton de Test
  </button>
</div>
  );
}