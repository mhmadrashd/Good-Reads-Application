import React, { useContext } from 'react'
import styled from 'styled-components';
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext';
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'

const InputFile = styled.input`
    width: 100%;
    height: 45px;
    outline:none;
    border: 1px solid rgba(200,200,200,0.3);
    padding:0px 10px;
    margin-bottom:10px ;
    border-bottom: 1.4px solid transparent ;
    transition: all, 200ms ease-in-out;
    font-size: 15px;
    color : gray;
    cursor: pointer;
    &::-webkit-file-upload-button {
    background: rgb(241,196,15);
    border: 0;
    padding: 0.5em 2em;
    cursor: pointer;
    color: #fff;
    border-radius: .2em;
  }

  &::-ms-browse {
    background: rgb(241,196,15);
    border: 0;
    padding: 1em 2em;
    cursor: pointer;
    color: #fff;
    border-radius: .2em;
  }

    &::placeholder{
        color: rgba(200,200,200,1);
    }
    &:not(last-of-type){
        border-bottom: 1.5px solid rgba(200,200,200,0.4);
    }
    &:focus{
        outline: none;
        border-bottom: 2px solid rgb(241,196,15) ;
    }
`;


const SignUpForm = () => {

    const {switchToSignIn} = useContext(AccountContext)


    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="First Name"/>
                <Input type="text" placeholder="Last Name"/>
                <Input type="email" placeholder="Enter Your Email"/>
                <Input type="password" placeholder="Enter Your Password"/>
                <Input type="password" placeholder="Confirm Your Password"/>
                <InputFile type="file" placeholder="Upload Your Picture"/>
            </FormContainer>
            <Marginer direction="vertical" margin={5} />
            <SubmitBTN type="submit">SIGN UP</SubmitBTN>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#" >Already have an account? <BoldLink href='#' onClick={switchToSignIn}>SIGN IN</BoldLink></MutedLink>
        </BoxContainer>
    )
}

export default SignUpForm