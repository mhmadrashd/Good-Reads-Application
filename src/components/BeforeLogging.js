import React, { useState } from 'react';
import LogIn from './LogIn';
import SignUpComponent from './SignUpComponent';

const BeforeLogging = () => {
  const [showSignUp, setSignUpShow] = useState(false);
  const handleSignUpClose = () => setSignUpShow(false);
  const handleSignUpShow = () => setSignUpShow(true);

  const [showLogIn, setLogInShow] = useState(false);
  const handleLogInClose = () => setLogInShow(false);
  const handleLogInShow = () => setLogInShow(true);

  return (
    <>
      <div className="w-50 m-auto  ">
        <button
          onClick={handleSignUpShow}
          className="btn btn-outline-warning btn-success btn-rounded  m-2 btn_logging "
        >
          SignUp
        </button>
        <button
          onClick={handleLogInShow}
          className="btn btn-outline-warning btn-success btn-rounded  m-2  btn_logging"
        >
          LogIn
        </button>
      </div>
      <SignUpComponent
        clicked={showSignUp}
        handleSignUpClose={handleSignUpClose}
      />
      <LogIn clicked={showLogIn} handleLogInClose={handleLogInClose} />
    </>
  );
};

export default BeforeLogging;
