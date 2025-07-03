import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Admin from "./components/Admin";
import SearchResults from "./components/SearchResults";
import Favourite from "./components/Favourite";  
import ContactPage from "./components/ContactPage";
import Setting from "./components/Setting";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/favourite" element={<Favourite />} />  
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    </Router>
  );
};

export default App;
