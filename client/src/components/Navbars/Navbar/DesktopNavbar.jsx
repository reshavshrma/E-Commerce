import React from "react";
import { NavLink, useNavigate } from "react-router-dom";


const DesktopNavbar = () => {
  const navigate = useNavigate();


  const navItems = [
    { to: "/", label: "Home", tooltip: "Home" },
    { to: "/contact", label: "Connect", tooltip: "Contact Us" },
    { to: "/about", label: "About Us", tooltip: "About Us" },
    { to: "/all-blogs", label: "Blogs", tooltip: "Our Blogs" },
  ];



  return (
    <ul className="hidden capitalize lg:flex absolute right-7 gap-9 items-center" data-aos="fade-up">

      {navItems.map(({ to, label, tooltip }) => (
        <li key={to} className="hover:scale-110 hover:font-semibold">
            <NavLink to={to} className="hover:text-yellow-500  ">
              {label}
            </NavLink>
        </li>
      ))}

    </ul>
  );
};

export default DesktopNavbar;
