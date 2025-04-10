import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
const DesktopNavbar = () => {
  const navigate = useNavigate();


  const navItems = [
    { to: "/admin", label: "Admin", tooltip: "Admin" },
    { to: "/vendor", label: "Vendor", tooltip: "Vendor" },
    { to: "/", label: "Home", tooltip: "Home" },
    { to: "/category", label: "Categories", tooltip: "Categories" },
  ];



  return (
    <ul className="hidden capitalize lg:flex absolute right-9 gap-9 items-center" data-aos="fade-up">

      {navItems.map(({ to, label, tooltip }) => (
        <li key={to} className="  hover:scale-110 hover:font-semibold">
            <NavLink to={to} className="hover:text-black  ">
              {label}
            </NavLink>
        </li>
      ))}
      
      <li  className="  hover:scale-110 hover:font-semibold">
            <NavLink to="/cart" className=" flex gap-1 justify-center items-center ">
              Cart <TiShoppingCart className="flex justify-center items-center"/>
            </NavLink>
        </li>
      
      
 <li className="">
  <FaUserCircle className=" text-2xl"/>
 </li>
    </ul>
  );
};

export default DesktopNavbar;
