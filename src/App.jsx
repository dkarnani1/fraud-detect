import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Home from './Home';
import Admin from './Admin';
import FormComponent from './FormComponent'; // Assuming FormComponent.jsx is in the same directory

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/form" element={<FormComponent />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
