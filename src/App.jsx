// src/App.js
import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import PostDetails from './pages/Post-detalis';
import Profile from './pages/Profile';
   
const App = () => {
  return (
    <Router>
     <AppNavbar />
     
    
      <Routes>
        {/* <Route path="/dashboard" element={<AppNavbar />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
