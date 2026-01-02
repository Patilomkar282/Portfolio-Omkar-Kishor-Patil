import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  return (
    <Router>
      <CustomCursor />
      <ChatWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
