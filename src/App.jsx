import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Sign_up from './Components/Sign_up';
import Terms_of_use from './Components/Terms_of_use';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';

//import './App.css'

export default function App() {
  return (
   <>
   <div>
    <Link to="/">S'inscrire </Link>
    <Link to="/terms">Lire les conditions</Link>
    </div>
     <Routes>
        <Route path="/" element={<Sign_up/>} />
        <Route path="/terms" element={<Terms_of_use/>} />
    </Routes>
    
    
    </>
  );

  
}