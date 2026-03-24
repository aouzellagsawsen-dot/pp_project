import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import SignIn from './Component/auth/SignIn';
import Header from './Component/layout/Header';
import Footer from './Component/layout/Footer';
import Policy from './Component/Policy';
import HomePage from './Component/HomePage';
//import './App.css'

export default function App() {
  return (
    <>
     <Header />
     <Footer />
     <HomePage />
     <Policy />
     <SignIn /> 
    </>
  );
}