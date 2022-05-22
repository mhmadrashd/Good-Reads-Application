import React, { useContext, useEffect, useRef, useState } from 'react'
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext'
import { BoldLink, BoxContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'
import axios from '../accountBox/axiosWork';
import { setloginState, setUserData } from "../../../Redux/DataSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './Login.css'

const LOGIN_URL = `http://localhost:3000`;

const Login = () => {

    const { switchToSignUp } = useContext(AccountContext)
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
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
            dispatch(setloginState(true));
            sessionStorage.setItem("loginState", true)
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
            <form onSubmit={handleSubmit} className="FormContainer">
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
                <Marginer direction="vertical" margin={5} />
                <MutedLink href="#" >Forget your password?</MutedLink>
                <Marginer direction="vertical" margin="1.8em" />
                <br></br>
                <SubmitBTN type="submit" onClick={handleSubmit}>SIGN IN</SubmitBTN>
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#" >Don't have an account? <BoldLink href='#' onClick={switchToSignUp}>SIGN UP</BoldLink></MutedLink>
            </form>

        </BoxContainer>
    )
}

export default Login