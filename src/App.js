import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./routes";
import "./App.css";
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-center" autoClose={2000} />
      </BrowserRouter>
  );
};

export default App;
