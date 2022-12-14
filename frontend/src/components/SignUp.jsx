import React, { useState, useEffect } from 'react';

//packages
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//component
import { REGISTER_USER } from '../service/Service';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     *  Register user (signup) add data (name,email, password)
     */
    const handleUserRegister = async () => {
        try {
            const { data } = await REGISTER_USER({ name, email, password })
            localStorage.setItem('user', JSON.stringify(data.result));
            localStorage.setItem('token', JSON.stringify(data.auth));
            navigate('/');
            toast.success("Registration successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
            setName('');
            setEmail('');
            setPassword('');
        } catch ({
            // Destructuring
            data: { error: { result = "" } },
        }) {
            toast.error(result, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    /**
     * not move home page without signup
     */
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/')
        }
    });

    return (
        <div className='register-from'>
            <h1>Register</h1>
            <input
                className='inputbox'
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
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
                onClick={handleUserRegister}
                className='signupbutton'
                type='button'
            >
                Sign Up
            </button>
        </div>
    );
}

export default SignUp;

















/**
     *  register user
     * @param {object} event
     */
    // const handleSignUp = async (event) => {
    //     let result = await fetch('http://localhost:5000/signup', {
    //         method: 'post',
    //         body: JSON.stringify({ name, email, password }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });

    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     result = await result.json();
    //     localStorage.setItem('user', JSON.stringify(result.result));
    //     localStorage.setItem('token', JSON.stringify(result.auth));
    //     toast.success("Registration successfully", {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //     })
    //     navigate('/');
    // };