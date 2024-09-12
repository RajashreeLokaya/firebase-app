import React from 'react';
import Header from '../components/Header'; // Assuming you have a Header component

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
