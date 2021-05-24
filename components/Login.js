import React,  { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
    const history = useHistory();
    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const singIn = (event)=> {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(
            auth => {
                history.replace('/');
            }).catch(error => alert(error.message));
    }

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then(
            auth => {
                if(auth){
                    history.replace('/');
                }

            }).catch(error => alert(error.message));
    }

    const emailChangeHandler =(event)=>{
        setEmail(event.target.value);
    }

    const passChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={emailChangeHandler}></input>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={passChangeHandler}></input>

                    <button type='submit' onClick={singIn}>Sign in</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__register' onClick={signUp}>Create your Amazon account</button>
            
            </div>
        </div>
    )
}

export default Login;
