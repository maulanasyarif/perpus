import React from 'react';
import {Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

    // const [input, setInput] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     error_list: []
    // });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const [isShown, setIsSHown] = useState(false);

    const togglePassword = () => {
        setIsSHown((isShown) => !isShown);
    };

    // const handleInput = (e) => {
    //     e.persist();
    //     setInput({...input, [e.target.name]: e.target.value })
    // }

    const regis = async (e) => {
        e.preventDefault();

        // const data = {
        //     name:setInput.name,
        //     email:setInput.email,
        //     password:setInput.password,
        // }

        await axios.post('auth/register', {
            name: name,
            email: email,
            password: password
        });
        navigate('/login');
    }

    
    return (
        <div>
            <div className="container">
                <div className="col d-flex justify-content-center col-md-12 py-4">
                    <div className="col-md-5">
                        <div className="card shadow border">
                            <div className="card-body shadow-lg bg-loght rounded">
                                <form onSubmit={regis}>
                                    <label htmlFor="email">Name</label>
                                    <input type="text" name="name" id='name' value={ name } onChange={ (e) => setName(e.target.value) } className='form-control mb-2' placeholder='Mark Otto' />
                                    
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
                                        <Link to="/login" className='btn btn-sm btn-success'>Login</Link>
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

export default Register;
