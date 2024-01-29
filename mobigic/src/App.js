import React from 'react';
import './App.css';
import Login from './components/Login'
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home'
import {  Routes, Route } from 'react-router-dom'; 
import Profile from './components/Profile';
 // Import Routes and Route from react-router-dom


function App() {
  return (
      <>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Navbar />} />  */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/profile" element={<Profile />} /> 
          </Routes>
      </>
   
  );
}

export default App;
