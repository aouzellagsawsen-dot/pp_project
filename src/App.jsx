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
import ContactUs from './Components/ContactUs';
import Favorites from './Components/Favorites';
import ExplorePage from './Components/Catalog/ExplorePage';
import Layout from './Components/dashboard/Layout'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> 
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDescription />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/Message" element={<Message />} />
          <Route path="/About" element={<About />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/terms" element={<TermsOfUse/>} />
          <Route path="/AddNewBook" element={<AddNewBook/>}/>
          <Route path="/notifications" element={<NotificationPanel/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/catalog" element={<ExplorePage/>}/>
          <Route path="/dashboard" element={<Layout/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}