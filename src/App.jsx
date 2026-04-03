import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Component/auth/SignIn';
import Header from './Component/layout/Header';
import Footer from './Component/layout/Footer';
import Policy from './Component/Policy';
import HomePage from './Component/homepage/HomePage';
import BookDescription from './Component/BookDescription';
import Message from './Component/Message';
import About from './Component/About';
import ForgotPassword from './Component/auth/ForgotPassword';


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
         
        </Routes>
      </main>

      <Footer />
    </div>
  );
}