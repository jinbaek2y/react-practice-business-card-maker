import React from 'react';
import ReactDOM from 'react-dom';
import App from './compomemts/App/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './compomemts/Login/Login';
import FirebaseService from './services/firebaseService';
import CloudinaryService from './services/cloudinaryService';

const firebase = new FirebaseService();
const cloudnary = new CloudinaryService();

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App firebase={firebase} cloudnary={cloudnary} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);