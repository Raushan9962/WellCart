import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Nav from './component/Nav.jsx'


function App() {

  return (
    <>     
    <Nav/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App
