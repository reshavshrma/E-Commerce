import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaPowerOff } from "react-icons/fa6";
import { RiShieldUserLine } from "react-icons/ri";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../UserContext/userContext";
import { BsBuildingFillAdd } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
const DesktopNavbar = () => {
  const { user} = useUser();
  const navigate = useNavigate();


  const navItems = [
    { to: "/admin", label: "Admin", tooltip: "Admin" },
    { to: `/user/${user?._id}/account`, label: "Account", tooltip: "Account" },
    { to: `/user/${user?._id}/account/wishlists`, label: "Wishlists", tooltip: "Wishlists" },
    { to: `/user/${user?._id}/account/bookings`, label: "Bookings", tooltip: "Bookings" },
  ];



  return (
    <ul className=" hidden capitalize lg:flex absolute right-9 gap-9 items-center" data-aos="fade-up">

      {navItems.map(({ to, label, tooltip }) => (
        <li key={to} className="  hover:scale-110 hover:font-semibold">
            <NavLink to={to} className="hover:text-black  ">
              {label}
            </NavLink>
        </li>
      ))}
  {/* Button Group */}


        <button
      onClick={() => navigate("/logout")}
      className="bg-transparent px-4 py-3 rounded-lg hover:shadow-md hover:cursor-pointer hover:bg-red-600 hover:bg-opacity-60 flex items-center gap-2 group transition-all duration-100"
    >
      <span className="text-black group-hover:text-white">Logout</span>
      <FaPowerOff className="text-black w-5 h-5 group-hover:text-white transition-all duration-200" />
    </button>
     
    </ul>
  );
};

export default DesktopNavbar;
