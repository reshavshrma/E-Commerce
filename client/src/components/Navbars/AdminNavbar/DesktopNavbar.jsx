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
    { to: "users", label: "Users", tooltip: "Users" },
    { to: "vendors", label: "Vendors", tooltip: "Vendors" },
    { to: "categories", label: "Categories", tooltip: "Categories" },
    { to: "products", label: "Products", tooltip: "Products" },
    { to: "bookings", label: "Bookings", tooltip: "Bookings" },
    { to: "feedbacks", label: "Feedbacks", tooltip: "Feedbacks" },
  ];



  return (
    <ul className=" hidden capitalize 2xl:flex absolute right-9 gap-9 items-center" data-aos="fade-up">

      {navItems.map(({ to, label, tooltip }) => (
        <li key={to} className="  hover:scale-110 hover:font-semibold">
            <NavLink to={to} className="hover:text-black  ">
              {label}
            </NavLink>
        </li>
      ))}
  {/* Button Group */}

  <button
            onClick={() => navigate("add-category")}
            className=" bg-purple-600 bg-opacity-50 p-2.5 text-sm rounded-lg hover:shadow-md hover:bg-opacity-80 text-white flex justify-end items-center gap-2"
          >
            Add Categories <BsBuildingFillAdd className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate("add-vendor")}
            className="bg-orange-600 bg-opacity-50 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
          >
            Add Vendors <AiFillFileAdd className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("add-product")}
            className="bg-orange-600 bg-opacity-50 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
          >
            Add Products <AiFillFileAdd className="w-5 h-5" />
          </button>


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
