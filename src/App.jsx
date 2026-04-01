import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './Component/auth/SignIn';
import Header from './Component/layout/Header';
import Footer from './Component/layout/Footer';
import Policy from './Component/Policy';
import HomePage from './Component/homepage/HomePage';
import BookDescription from './Component/BookDescription';
import AdminPanel from './Component/AdminPanel';

export default function App() {
  return (
    <>
      <Header /> 

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDescription />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <Footer />
    </>
  );
}