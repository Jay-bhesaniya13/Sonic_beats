import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/Register'
import MusicList from "./components/musicList";
import Home from "./components/Home";
import Admin from "./components/Admin";

const App = () => {
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
    
  )
};

export default App;
