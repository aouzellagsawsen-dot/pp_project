import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import SignUp from './Components/SignUp';
import TermsOfUse from './Components/TermsOfUse';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import AddNewBook from './Components/AddNewBook'
import NotificationPanel from './Components/notifications/NotificationPanel';
import ExplorePage from './Components/Catalog/ExplorePage';
import Layout from './Components/dashboard/Layout';
import MyBooks from './Components/dashboard/MyBooks';
import Profile from './Components/dashboard/Profile';
import History from './Components/dashboard/History';
import Borrows from './Components/dashboard/Borrows';
import Favorites from './Components/Favorites';


//import './App.css'

export default function App() {
  return (
   <>
   <div>
    <Link to="/">S'inscrire </Link>
    <Link to="/terms"> Lire les conditions </Link>
    <Link to="/AddNewBook"> Ajouter un livre </Link>
    <Link to="/notifications"> Notifications</Link>
    <Link to="/explore"> Catalogue</Link>
    <Link to="/dashboard"> Dashboard</Link>
    </div>
     <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/terms" element={<TermsOfUse/>} />
        <Route path="/AddNewBook" element={<AddNewBook/>}/>
        <Route path="/notifications" element={<NotificationPanel />}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/dashboard" element={<Layout/>}>
            <Route path="borrows" element={<Borrows/>}/>
            <Route path="mybooks" element={<MyBooks/>}/>
            <Route path="history" element={<History/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="/favorites" element={<Favorites/>}/>
    </Routes>
    
    
    </>
  );

  
}