import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result)
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
            toast.success("Login successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            toast.error("Please enter current Email and Password ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/')
        }
    });

    return (
        <div className='login-from'>
            <h1>Login</h1>
            <input
                className='inputbox'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                className='inputbox'
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button
                onClick={handleLogin}
                className='loginbutton'
                type='button'
            >
                Login
            </button>
        </div>
    );
}

export default Login;
