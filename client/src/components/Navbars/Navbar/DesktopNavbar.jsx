import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaPowerOff } from "react-icons/fa6";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../UserContext/UserContext";
const DesktopNavbar = () => {
  const { user} = useUser();
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

 <li>
          <NavLink to={user ? `/user/${user._id}/account` : "/login"}>
            {user ? (
              <img src={user.image} alt={user.name} className="w-10 h-10   rounded-full hover:scale-110" />
            ) : (
              <FaUserCircle className="text-2xl text-black" />
            )}
          </NavLink>
      </li>

      {user ? (
        <button
          onClick={() => navigate("/logout")}
          className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:bg-red-600 hover:bg-opacity-60 flex items-center gap-2"
        >
          Logout <FaPowerOff className="text-black w-5 h-5" />
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:bg-green-600 hover:bg-opacity-60 flex items-center gap-2"
          >
            Login <RiShieldUserLine className="text-black w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-transparent px-3 py-3 rounded-lg hover:shadow-md hover:bg-blue-500 hover:bg-opacity-60 flex items-center gap-2"
          >
            Sign Up <PiUserCirclePlusBold className="text-black w-5 h-5" />
          </button>
        </div>
      )}
    </ul>
  );
};

export default DesktopNavbar;
