import React, { useContext, useEffect, useRef, useState } from 'react'
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext'
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'
import axios from '../accountBox/axiosWork';

const LOGIN_URL = '/auth';

const Login = () => {
    
    const {switchToSignUp} = useContext(AccountContext)

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ email, pwd, roles, accessToken });
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    return (
        <BoxContainer>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <FormContainer onSubmit={handleSubmit}>
                <br/>
                <Input type="email" placeholder="Enter Your Email"                             
                        id="username"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
                <br/>
                <Input type="password" placeholder="Enter Your Password"                             
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required />
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