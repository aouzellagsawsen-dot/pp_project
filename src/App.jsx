import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Sign_up from './Components/Sign_up';
import Terms_of_use from './Components/Terms_of_use';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import Add_a_new_book from './Components/Add_a_new_book';
import NotificationCard from './Components/notifications/NotificationCard';

//import './App.css'

export default function App() {
  return (
   <>
   <div>
    <Link to="/">S'inscrire </Link>
    <Link to="/terms"> Lire les conditions </Link>
    <Link to="/Add_a_new_book"> Ajouter un livre </Link>
    <Link to="/NotificationCard"> Notifications</Link>
    </div>
     <Routes>
        <Route path="/" element={<Sign_up/>} />
        <Route path="/terms" element={<Terms_of_use/>} />
        <Route path="/Add_a_new_book" element={<Add_a_new_book/>}/>
        <Route path="/NotificationCard" element={<NotificationCard/>}/>
    </Routes>
    
    
    </>
  );

  
}