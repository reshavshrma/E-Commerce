import React from "react"
import Home from "./pages/Home"
import {Routes , Route} from "react-router-dom";
import About from "./components/Navigation/About/About";
import Contact from "./components/Navigation/Contact/Contact";
import Policies from "./components/Navigation/Policies/Policies";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignUp";
function App() {


  return (
    <>
      <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/policies" element={<Policies/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<SignUp/>} />


      </Routes>
    </>
  )
}

export default App
