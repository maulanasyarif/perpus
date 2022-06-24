import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Admin/Dashboard';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Books from './Components/Admin/Books';
import Categories from './Components/Admin/Categories';

import axios from 'axios';
axios.defaults.baseURL = "http://api-perpustakaan.test:8080/api/";

function App() {
  return (
    <div className="App">
        <Router>

            <Routes>
              <Route path={'/login'} element={<Login/>}></Route>
              <Route path={'/register'} element={<Register/>}></Route>


              <Route path={'/dashboard'} element={<Dashboard/>}></Route>
              <Route path={'/books'} element={<Books/>}></Route>
              <Route path={'/categories'} element={<Categories/>}></Route>

            </Routes>

        </Router>
    </div>
  );
}

export default App;
