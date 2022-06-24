import React, { useState, useEffect } from 'react';
import {
    Link,
    useNavigate,
    } from "react-router-dom";
import axios from 'axios';

function Dashboard() {

    const [user, setUser] = useState({});
    
    let navigate = useNavigate();

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token,
        };

        await axios.get('profile')
        .then(res => {
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
        })
    }

    
    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
        
        fetchData();
    }, []);

    const logoutHanlder = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await axios.post('logout')
        .then(() => {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            navigate('/login');
        });
    }; 

    return (
        <div>
            <div className="b-example-divider"></div>

                <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/dashboard" className="nav-link px-2 link-secondary">Dashboard</Link></li>
                        <li><Link to="/categories" className="nav-link px-2 link-dark">Categories</Link></li>
                        <li><Link to="/books" className="nav-link px-2 link-dark">Books</Link></li>
                        <li><a href="#" className="nav-link px-2 link-dark">Members</a></li>
                        <li><a href="#" className="nav-link px-2 link-dark">Loans</a></li>
                    </ul>

                    {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                    </form> */}

                    <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>

                    {/* <div className="dropdown text-end">
                        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div> */}

                    </div>
                </div>
                </header>

            <body className='d-flex flex-column min-vh-100'>
                        <div id='content' className="container">
                <h4 className="card-title">Dashboard</h4>

                <div className="row row-cols-1 row-cols-md-4 g-4">
                    <div className="col">
                        <div className="card shadow-sm">
                        <div className="card-body bg-dark text-white">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">
                        <div className="card-body bg-secondary">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">
                        <div className="card-body bg-info">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card shadow-sm">
                        <div className="card-body bg-warning">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm text-left mt-2">
                    <div className="card-body">
                        <form className="row g-3">
                            <div className="col-auto">
                                <label htmlFor="name" className="visually-hidden">Name</label>
                                <input type="text" className="form-control" id="searchName" placeholder="Search" />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Submit</button>
                            </div>
                        </form>

                        <div className="table-responsive">
                            <table className="table table-hover table-bordered" id="table-name">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Book Name</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>John</td>
                                        <td>john@example.com</td>
                                        <td>Doe</td>
                                        <td className='text-center'>
                                            <button className='btn btn-info btn-sm'>
                                                Success
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>mary@example.com</td>
                                        <td>Moe</td>
                                        <td className='text-center'>
                                            <button className='btn btn-danger btn-sm'>
                                                Failed
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>july@example.com</td>
                                        <td>Dooley</td>
                                        <td className='text-center'>
                                            <button className='btn btn-warning btn-sm'>
                                                Pending
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </body>

            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <span className="text-muted">Place sticky footer content here.</span>
                </div>
            </footer>

        </div>
    )
}

export default Dashboard