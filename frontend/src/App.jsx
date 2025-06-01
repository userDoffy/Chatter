import Signup from './components/pages/auth/signup';
import Login from './components/pages/auth/login';
import TwoFactorAuth from './components/pages/auth/TwoFactorAuth';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {

  return (
    <>
      <TwoFactorAuth />
      {/* Uncomment the component you want to display */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <TwoFactorAuth /> */}
    </>
  )
}

export default App
