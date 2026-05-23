import SignUp from './Components/SignUp';
import TermsOfUse from './Components/TermsOfUse';
import AddNewBook from './Components/AddNewBook';
import NotificationPanel from './Components/notifications/NotificationPanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Components/auth/SignIn';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import Policy from './Components/Policy';
import HomePage from './Components/homepage/HomePage';
import BookDescription from './Components/BookDescription';
import Message from './Components/Message';
import About from './Components/About';
import ForgotPassword from './Components/auth/ForgotPassword';
import ResetPassword from './Components/auth/ResetPassword';  
import ContactUs from './Components/ContactUs';
import Favorites from './Components/Favorites';
import ExplorePage from './Components/Catalog/ExplorePage';
import AdminPanel from './Components/AdminPanel';
import Layout from './Components/dashboard/Layout'
import MyBooks from './Components/dashboard/MyBooks';
import History from './Components/dashboard/History';
import Profile from './Components/dashboard/Profile';
import Borrows from './Components/dashboard/Borrows';
import BienvenuePage from './Components/homepage/BienvenuePage';
import { useEffect, useState } from 'react';
import api, { fetchAndSetCsrfToken } from './api/axios';
import PublicProfile from './Components/dashboard/PublicProfile';
import { FavoritesProvider } from './Components/contexts/FavoritesContext';

export default function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAndSetCsrfToken();
  }, []);


  return (
    <FavoritesProvider>
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDescription isLoggedIn={isLoggedIn} />} />
          <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/About" element={<About />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/terms" element={<TermsOfUse/>} />
          <Route path="/AddNewBook" element={<AddNewBook/>}/>
          <Route path="/notifications" element={<NotificationPanel/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/adminpanel" element={<AdminPanel/>}/>
          <Route path="/catalog" element={<ExplorePage/>}/>
          <Route path="/welcome" element={<BienvenuePage/>} />
          <Route path="/dashboard" element={<Layout/>}>
            <Route path="borrows" element={<Borrows/>} />
            <Route path="mybooks" element={<MyBooks />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard/publicprofile" element={<PublicProfile />} />
        </Routes>
        
      </main>
      <Footer isLoggedIn={isLoggedIn}/>
    </div>
    </FavoritesProvider>
  );
}