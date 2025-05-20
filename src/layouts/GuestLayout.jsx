import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const GuestLayout = () => {
  return (
    <>
      <NavBar/>
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default GuestLayout;
