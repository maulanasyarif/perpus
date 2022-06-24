import React from 'react';
import {Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const [isShown, setIsSHown] = useState(false);

    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };

    const login = async (e) => {
        e.preventDefault();

        await axios.post('auth/login', {
            email: email,
            password: password
        }).then(res => {
            localStorage.setItem('token', res.data.token.original.access_token);
            navigate('/dashboard');
        });
    }

    return (
        <div>
            <div className="container">
                <div className="col d-flex justify-content-center col-md-12 py-4">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body shadow-lg bg-loght rounded">
                                <form onSubmit={login}>
                                    
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" name="email" id='email' value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control mb-2' placeholder='example@gmail.com' />
                                    
                                    <label htmlFor="email">Password</label>
                                    <input type={isShown ? "text" : "password"} name="password" id='password' value={ password } onChange={ (e) => setPassword(e.target.value) } className='form-control mb-2' placeholder='*********' />
                                        <div className="custom-control custom-checkbox mt-1">
                                            <input type="checkbox" checked={isShown} onChange={togglePassword} label="Show password" className="custom-control-input show-password" id="customCheck1" />&nbsp;
                                            <label className="custom-control-label" htmlFor="customCheck1">Show Password</label>
                                        </div>
                                    <div className="btn-group mt-3">
                                        <button className='btn btn-sm btn-primary' type='submit'>Submit</button>
                                        <Link to="/register" className='btn btn-sm btn-success'>Register</Link>
                                    </div>
                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
