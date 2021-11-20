import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './compomemts/login/login';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);