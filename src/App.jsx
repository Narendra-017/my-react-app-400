import { useState } from 'react'
import Register from './Components/Register'
import Login from './Components/Login';
import Home from "./Components/Home"
import {BrowserRouter , Route , Routes} from "react-router-dom";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element= {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
