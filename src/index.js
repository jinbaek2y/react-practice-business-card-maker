import React from 'react';
import ReactDOM from 'react-dom';
import App from './compomemts/App/App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './compomemts/Login/Login';
import FirebaseService from './services/firebaseService';
import CloudinaryService from './services/cloudinaryService';

const firebase = new FirebaseService();
const cloudnary = new CloudinaryService();

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <>
        <Route path="/" element={<Login firebase={firebase} />} />
        {/* login info verify logic where in ? */}
        <Route exact path="/app/:userId/" element={<App firebase={firebase} cloudnary={cloudnary} />} />
        <Route path="*" element={<Navigate to="/" />}>
        </Route>
      </>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);