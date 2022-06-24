import React, { useState, useEffect } from 'react';
import {
    Link,
    useNavigate,
    } from "react-router-dom";
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

function Categories() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, setCategory] = useState({});

    let navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': 'Bearer ' + token,
        };

        await axios.get('officer/category')
        .then(res => {
            setCategory(res.results);
        })
        console.log(category);

    }

    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
        
        fetchData();
    });

    const logoutHanlder = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await axios.post('logout')
        .then(() => {

            localStorage.removeItem('token');

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
                    <button onClick={logoutHanlder} className="btn btn-md btn-danger">LOGOUT</button>
                    </div>
                </div>
                </header>

                <body className='d-flex flex-column min-vh-100'>
                    <div id='content' className="container">
                    <h4 className="card-title">Categories</h4>

                    <div className="card shadow-sm text-left mt-2">
                        <div className="card-body">
                            <form className="row g-3">
                                <div className="col-auto">
                                    <label htmlFor="name" className="visually-hidden">Name</label>
                                    <input type="text" className="form-control" id="searchName" placeholder="Search" />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                                    <Button className="btn btn-secondary mb-3" onClick={handleShow}>
                                        Add
                                    </Button>
                                </div>
                            </form>

                            <div className="table-responsive">
                                <table className="table table-hover table-bordered" id="table-name">
                                    <thead>
                                        <tr>
                                            <th>Category Code</th>
                                            <th>Category Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
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

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="category_code">
                    <Form.Label>Category code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="0123456"
                        autoFocus
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category_name">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="example category"
                        autoFocus
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

                <footer className="footer mt-auto py-3 bg-light">
                    <div className="container">
                        <span className="text-muted">Place sticky footer content here.</span>
                    </div>
                </footer>
        </div>
    );
}

export default Categories;
