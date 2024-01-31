// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './newsList';
import Login from '../authentication/login';
import Signup from '../authentication/signup';
import HiddenItems from './HiddenItems';
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hidden-items" element={<HiddenItems />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
