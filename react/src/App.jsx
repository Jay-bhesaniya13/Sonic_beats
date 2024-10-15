import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import MusicList from "./components/musicList";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Admin from "./components/SearchResults";
import SearchResults from "./components/SearchResults";

const App = () => {
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Admin" element={<Admin />} />
       </Routes>
    </Router>
    
  )
};

export default App;
