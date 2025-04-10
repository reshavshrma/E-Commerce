import React from "react"
import Home from "./pages/Home"
import {Routes , Route} from "react-router-dom";
import About from "./components/Navigation/About/About";
import Contact from "./components/Navigation/Contact/Contact";
import Policies from "./components/Navigation/Policies/Policies";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/SignUp/SignUp";
import Logout from "./components/Logout/Logout";
import AddCategoryForm from "./pages/Category/AddCategoryForm";
import AddProductForm from "./pages/Product/AddProductForm";

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
    <Route path="/logout" element={<Logout/>} />
    <Route path="/add-category" element={<AddCategoryForm />}  />
    <Route path="/add-product" element={<AddProductForm />}  />

      </Routes>
    </>
  )
}

export default App
