import React, { useContext, useEffect, useRef, useState } from 'react'
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext'
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'
import axios from '../accountBox/axiosWork';
import { setIsSigned, setUserData } from "../../../Redux/DataSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const LOGIN_URL = `http://localhost:3000`;

const Login = () => {

    const { switchToSignUp } = useContext(AccountContext)
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const { isSigned } = useSelector((state) => state.DataReducer);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${LOGIN_URL}/user/login`,
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        ).then((response) => {
            dispatch(setIsSigned(isSigned));
            dispatch(setUserData(response.data));
            navigate("/");
            setEmail('');
            setPassword('');
        }).catch((error) => {
            setErrMsg(error.response?.data.message);
            errRef.current.focus();
        })

    }

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    return (
        <BoxContainer>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <FormContainer onSubmit={handleSubmit}>
                <br />
                <Input type="email" placeholder="Enter Your Email"
                    id="username"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required />
                <br />
                <Input type="password" placeholder="Enter Your Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required />
            </FormContainer>
            <Marginer direction="vertical" margin={5} />
            <MutedLink href="#" >Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.8em" />
            <br></br>
            <SubmitBTN type="submit" onClick={handleSubmit}>SIGN IN</SubmitBTN>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#" >Don't have an account? <BoldLink href='#' onClick={switchToSignUp}>SIGN UP</BoldLink></MutedLink>
        </BoxContainer>
    )
}

export default Login