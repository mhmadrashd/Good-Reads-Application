import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import './SignUpForm.css'
import Marginer from '../accountBox/Marginer'
import { AccountContext } from '../accountBox/AccountContext';
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitBTN } from '../accountBox/Common'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../accountBox/axiosWork';
import { useNavigate } from 'react-router';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firbase/firebase";
import { v4 } from "uuid";
import MsgDialogs from '../../../assets/handleErrors';


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

const USER_REGEX = /^[A-z][A-z0-9-_]{2,19}$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const IMG_REGEX = /\.(jpg|jpeg|png|gif)$/;
const REGISTER_URL = 'http://localhost:3000';

const SignUpForm = (props) => {

    const { switchToSignIn } = useContext(AccountContext)

    /* New Work */
    const fNameRef = useRef();
    const errRef = useRef();

    /* First Name Input Validation and Focusing */
    const [fname, setFname] = useState('');
    const [validFName, setValidFName] = useState(false);
    const [fnameFocus, setFnameFocus] = useState(false);

    /* Last Name Input Validation and Focusing */
    const [lname, setLname] = useState('');
    const [validLname, setValidLname] = useState(false);
    const [lnameFocus, setLnameFocus] = useState(false);

    /* E-Mail Input Validation and Focusing */
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);

    /* Password and matchPassword Input Validation and Focusing */
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    /* Image Input Validation and Focusing */
    const [img, setImg] = useState('');
    const [validImg, setValidImg] = useState(false);
    const [ImgFocus, setImgFocus] = useState(false);

    /* Output Message for Success and Error messages */
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    /* Submit Focusing when Component Load */
    useEffect(() => {
        fNameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(fname);
        setValidFName(result);
    }, [fname]);


    useEffect(() => {
        const result = USER_REGEX.test(lname);
        setValidLname(result);
    }, [lname]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd
        setValidMatch(match);
    }, [pwd, matchPwd]);


    useEffect(() => {
        const result = IMG_REGEX.test(img);
        setValidImg(result);
    }, [img]);

    useEffect(() => {
        setErrMsg('');
    }, [fname, lname, email, pwd, matchPwd, img])

    const [imageUpload, setImageUpload] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const FirstName = USER_REGEX.test(fname);
        const LastName = USER_REGEX.test(lname);
        const Email = EMAIL_REGEX.test(email);
        const Password = PWD_REGEX.test(pwd);
        const Image = IMG_REGEX.test(img);

        if (!FirstName || !LastName || !Email || !Password || !Image) {
            setErrMsg("Invalid Entry");
            return;
        }

        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/user/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    //send this url with data
                    return url;
                }).then((url) => {
                    axios.post(`${REGISTER_URL}/user`,
                        {
                            fName: fname,
                            lName: lname,
                            email,
                            password: pwd,
                            img: url,
                        }
                    )
                }).then(function () {
                    window.location.reload();
                    setSuccess(true);
                    setFname('');
                    setLname('');
                    setEmail('');
                    setPwd('');
                    setMatchPwd('');
                    setImg('');
                }).catch((error) => {
                    if (!error?.response) {
                        setErrMsg('No Server Response');
                    } else if (error.response?.status === 409) {
                        setErrMsg('Email Taken');
                    } else {
                        setErrMsg('Registration Failed')
                    }
                    errRef.current.focus();

                    console.log(error);
                })
            });
    }

    /* Ending of New Work */

    return (
        <BoxContainer>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <FormContainer onSubmit={handleSubmit}>
                <Input type="text" placeholder="First Name"
                    id='fname'
                    ref={fNameRef} autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    required aria-invalid={validFName ? "false" : "true"}
                    aria-describedby="uidnote" onFocus={() => setFnameFocus(true)}
                    onBlur={() => setFnameFocus(false)} />

                <p id="uidnote" className={fnameFocus && fname && !validFName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 20 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores and hyphens allowed.</p>

                <Input type="text" placeholder="Last Name"
                    id='lname'
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    required aria-invalid={validLname ? "false" : "true"}
                    aria-describedby="uidnote" onFocus={() => setLnameFocus(true)}
                    onBlur={() => setLnameFocus(false)} />

                <p id="uidnote" className={lnameFocus && lname && !validLname ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 20 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores and hyphens allowed.</p>

                <Input type="email" placeholder="Enter Your Email"
                    id='email'
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote" onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)} />

                <p id="uidnote" className={EmailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email must be in the form of (aa@aa.aa).</p>

                <Input type="password" placeholder="Enter Your Password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)} />

                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>

                <Input type="password" placeholder="Confirm Your Password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} />

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field. </p>

                <InputFile type="file" placeholder="Upload Your Picture"
                    id='image'
                    autoComplete="off"
                    onChange={(e) => {
                        setImg(e.target.value)
                        setImageUpload(e.target.files[0])
                    }}
                    required aria-invalid={validImg ? "false" : "true"}
                    aria-describedby="uidnote" onFocus={() => setImgFocus(true)}
                    onBlur={() => setImgFocus(false)} />

                <p id="uidnote" className={ImgFocus && img && !validImg ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Image must be in the form of (jpg, jpeg, png or gif).</p>

            </FormContainer>
            <Marginer direction="vertical" margin={5} />
            <SubmitBTN onClick={handleSubmit} type="submit" disabled={!validFName || !validLname || !validEmail || !validPwd || !validMatch || !validImg ? true : false} >SIGN UP</SubmitBTN>
            <Marginer direction="vertical" margin="1em" />
            {props.default ?
                <MutedLink href="#" >
                    Already have an account?
                    <BoldLink href='#' onClick={switchToSignIn}>SIGN IN</BoldLink>
                </MutedLink>
                : ""}
        </BoxContainer>
    )
}

export default SignUpForm