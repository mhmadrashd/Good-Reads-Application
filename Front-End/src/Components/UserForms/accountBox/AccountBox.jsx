import React, { useState } from 'react'
import styled from 'styled-components';
import Login from '../LogIn/Login';
import { motion } from 'framer-motion';
import { AccountContext } from './AccountContext';
import SignUpForm from '../SignUp/SignUpForm';


const BoxContainer = styled.div`
    display: flex;
    width: 480px;
    min-height:650px;
    flex-direction: column;
    border-radius: 19px;
    background-color:#fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height:200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height:850px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius:50%;
    transform: rotate(60deg);
    top: -450px;
    left: -180px;
    background: rgb(241,196,15);
    background: linear-gradient(58deg, rgba(241,196,15,1) 20%, rgba(243,172,18,1) 100%);
`;

const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: -10% 0%;
`;

const HeaderText = styled.h2`
    font-size: 40px;
    font-weight: 600;
    line-height: 1.2;
    color: #fff ;
    z-index: 1;
    margin: 0;
`;

const Info = styled.h5`
    font-size: 20px;
    font-weight: 500;
    color: #fff ;
    z-index: 1;
    margin: 0px;
    margin-top:7px;
    opacity: 0.9;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

const backDropVariants = {
  expanded: {
    width: "250%",
    height: "1700px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "160%",
    height: "850px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
    top: "-600px",
    left: "-180px",

  }
};


const expandingTransition = {
  type: "spring",
  duration: 1.6,
  stiffness: 30,
}

const AccountBox = () => {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1000);
  }

  const switchToSignUp = () => {
    playAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400)
  }

  const switchToSignIn = () => {
    playAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400)
  }

  const contextValue = { switchToSignUp, switchToSignIn };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop initial={false}
            animate={expanded ? "expanded" : "collapsed"}
            variants={backDropVariants}
            transition={expandingTransition} />
          {active === 'signin' && <HeaderContainer>
            <HeaderText>Welcome</HeaderText>
            <HeaderText>Back</HeaderText>
            <Info>You can SIGN IN Here</Info>
          </HeaderContainer>}
          {active === 'signup' && <HeaderContainer>
            <HeaderText>Create</HeaderText>
            <HeaderText>Account</HeaderText>
            <Info>You can SIGN UP Here</Info>
          </HeaderContainer>}
        </TopContainer>
        <InnerContainer>
          {active === 'signin' && <Login />}
          {active === 'signup' && <SignUpForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  )
}

export default AccountBox