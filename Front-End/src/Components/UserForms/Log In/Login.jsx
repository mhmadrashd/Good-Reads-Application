import React, { useContext } from 'react'
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext'
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'

const Login = () => {
    
    const {switchToSignUp} = useContext(AccountContext)

    return (
        <BoxContainer>
            <FormContainer>
                <br/>
                <Input type="email" placeholder="Enter Your Email"/>
                <br/>
                <Input type="password" placeholder="Enter Your Password"/>
                </FormContainer>
                <Marginer direction="vertical" margin={5} />
                <MutedLink href="#" >Forget your password?</MutedLink>
                <Marginer direction="vertical" margin="1.8em" />
                <br></br>
                <SubmitBTN type="submit">SIGN IN</SubmitBTN>
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#" >Don't have an account? <BoldLink href='#' onClick={switchToSignUp}>SIGN UP</BoldLink></MutedLink>
        </BoxContainer>
    )
}

export default Login