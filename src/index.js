import React from 'react';
import ReactDOM from 'react-dom';
import App from './compomemts/App/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './compomemts/Login/Login';
import FirebaseService from './services/firebaseService';

const firebase = new FirebaseService();

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App firebase={firebase} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);