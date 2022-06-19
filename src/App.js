import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './components/Home/HomePage';
import Login from './components/Login/Login';
import SignupForm from './components/SignUpForm/SignupForm';
import firebaseConfig from './firebaseConfig';

function App() {
  const app = initializeApp(firebaseConfig);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/Signup" element={<SignupForm />}/>
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
