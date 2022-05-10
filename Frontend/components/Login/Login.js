import React , {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-import { connect } from 'react-redux'


import React from 'react'
import  './Login.css'

const Login=({history})=>{
    const [Username ,setUsername]=useState('');
    const [password, setpasswod]=useState('');
    const dispatch=useDispatch();


    //check
    const userLoginDetails = useSelector(state =>state.userLogin);
    const {loading ,userInfo , error}= userLoginDetails;
    
    console.log(loading, userInfo,error);

    useEffect(()=>{
        if (userInfo){
        history.push('/');

    } }
    ,[dispatch,userInfo,history])

    //submit

    const submitFormHandler =e=>{
        e.preventDefault();
        dispatch(loginUser(Username,password));
        console.log(Username,password);
    };
    


return (
<div className='container'>
<div className='adminForm'>
<h2>Welcome To Admin Panel</h2>
<form  onSubmit={submitFormHandler} className='form'>
<div class="input-icons">
                <i class="fa fa-user icon">
              </i>
    <input className="inputForm"  value={Username} onChange ={e=> setUsername(e.target.value)} type="text" placeholder='Enter Your Username' />
    </div>
    <div class="input-icons">
                <i class="fa fa-key icon">
              </i>
    <input className="inputForm"  value={password} onChange={e=> setpasswod(e.target.value)}  type="password" placeholder='Enter Your Password'/>
    </div>
    <div className='btnlogin'>
<button  type='submit'>Log In </button>
</div>
</form>

</div>
</div>
)
}

export default Login