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
import EditCategory from "./pages/Category/EditCategory";
import DeleteCategory from "./pages/Category/DeleteCategory";
import ShowProduct from "./pages/Product/ShowProduct";
import EditProduct from "./pages/Product/EditProduct";
import AddVendor from "./pages/Vendor/AddVendor";
import ShowVendor from "./pages/Vendor/ShowVendor";
import EditVendor from "./pages/Vendor/EditVendor";
import DeleteVendor from "./pages/Vendor/DeleteVendor";
import ShowCategory from "./pages/Category/ShowCategory";
import UserAccount from "./pages/User/UserAccount";
import AdminHome from "./pages/Admin/AdminHome";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUser from "./pages/Admin/AdminUser";
import AdminVendor from "./pages/Admin/AdminVendor";
import AdminCategory from "./pages/Admin/AdminCategory";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminBooking from "./pages/Admin/AdminBooking";
import AllVendors from "./pages/Vendor/AllVendors";

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
    <Route path="/:id/edit-category" element={<EditCategory />}  />
    <Route path="/:id/delete-category" element={<DeleteCategory />}  />
    <Route path="/product/:id" element={<ShowProduct />}  />
    <Route path="/product/:id/edit" element={<EditProduct />}  />
    <Route path="/add-vendor" element={<AddVendor />}  />
    <Route path="/vendor/:id/account" element={<ShowVendor />}  />
    <Route path="/vendor/:id/account/edit" element={<EditVendor />}  />
    <Route path="/vendor/:id/account/delete" element={<DeleteVendor />}  />
    <Route path="/category/:id/:tag/products" element={<ShowCategory />}  />
    <Route path="/user/:id/account" element={<UserAccount />}  />

    <Route path="/admin/dashboard" element={<AdminDashboard />}  />

    <Route
            path="/admin"
            element={
                  <AdminHome />
            }
          >
            <Route path="users" element={<AdminUser />} />
            <Route path="vendors" element={<AdminVendor />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="products" element={<AdminProduct />} />
            <Route path="bookings" element={<AdminBooking />} />
            <Route path="feedbacks" element={<AdminFeedback />} />
            
          </Route>
            <Route path="/vendor" element={<AllVendors />} />

      </Routes>
    </>
  )
}

export default App
