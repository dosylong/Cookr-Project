import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function MainPage({children}) {
  return (
    <>
      <CssBaseline />
      <Header />
        {children}
      <Footer />
    </>
  );
}