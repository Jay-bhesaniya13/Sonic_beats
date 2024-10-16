import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
 import Home from "./components/Home";
import Admin from "./components/Admin";
 import SearchResults from "./components/SearchResults";
import PlayList from "./components/Playlist";

const App = () => {
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/playlist" element={<PlayList />} />
       </Routes>
    </Router>
    
  )
};

export default App;
