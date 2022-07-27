import React from 'react';
import { useState } from 'react';
import Login from '../component/auth/Login';
import Signup from '../component/auth/Signup';
import logo from '../assets/icon.svg';

const Auth = () => {
    const [loginOpen, setLoginOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)

    return (
        <div id='log'>

            {loginOpen === false && signupOpen === false ? (
                <div className='before-log'>
                    <div id='logo'>
                        <img src={logo} alt="Groupomania" />
                    </div>
                    <div id='button-log'>
                        <div className="button">
                            <button onClick={() => { setSignupOpen(true); setLoginOpen(false) }}>Inscription</button>
                        </div>
                        <div className="button">
                            <button onClick={() => { setLoginOpen(true); setSignupOpen(false) }} >Connection</button>
                        </div>
                    </div>
                </div>
            ) : (loginOpen === true ? (
                <div id='login'>
                    <Login loginOpen={loginOpen} setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen}/>
                </div>
            ) : (
                <div id='signup'>
                    <Signup signupOpen={signupOpen} setSignupOpen={setSignupOpen} setLoginOpen={setLoginOpen}/>
                </div>
            )


            )

            }

        </div>
    );
};

export default Auth;