import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle, FaUser, FaBars, FaTimes, FaPaperPlane , FaPowerOff , FaStoreAlt , FaStore, FaTags } from "react-icons/fa";
import { RiQuestionAnswerFill, RiShieldUserLine, RiArticleFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { useUser } from "../../UserContext/userContext";


const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);


  const menuItems = [
    { to: "/admin", label: "Admin Dashboard", tooltip: "Admin" ,icon: <MdAdminPanelSettings />, role: "admin" },
    { to: "users", label: "All Users Details", tooltip: "Users"  , icon: <FaUser />},
    { to: "vendors", label: "All Vendors Details", tooltip: "Vendors" ,icon: <FaUser /> },
    { to: "categories", label: "AllCategories Details", tooltip: "Categories" , icon: <FaUser /> },
    { to: "products", label: "All Products Details", tooltip: "Products" , icon: <FaUser />},
    { to: "bookings", label: "All Bookings Details", tooltip: "Bookings" , icon: <FaUser />},
    { to: "feedbacks", label: "All Feedbacks Details", tooltip: "Feedbacks" , icon: <FaUser />},
  ];

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="absolute right-4 sm:right-8 2xl:hidden text-black focus:outline-none "
        onClick={toggleMenu}
        data-aos="fade-up"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-full h-max text-white z-50 bg-gradient-to-t from-zinc-800 to-gray-900 p-6 shadow-lg transition-all duration-300">
          <button className="absolute top-4 right-7 sm:right-10 text-white  sm:py-3" onClick={toggleMenu}>
            <FaTimes size={24} />
          </button>

          <ul className="mt-8 space-y-7 p-4 text-sm sm:text-xl flex flex-col items-center justify-center">
            {user?.role === "admin" && (
              <li className="opacity-80 flex items-center justify-center p-2.5 gap-2 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
                <MdAdminPanelSettings className="text-xl" />
                <NavLink to="/admin" onClick={toggleMenu}>
                  Admin Panel
                </NavLink>
              </li>
            )}
            {menuItems.map(({ to, label, icon }) => (
              <li key={to} className="opacity-80 flex items-center justify-center p-2.5 gap-2.5 bg-gray-800 rounded-2xl w-60 hover:text-yellow-400">
                {icon}
                <NavLink to={to} onClick={toggleMenu}>
                  {label}
                </NavLink>
              </li>
            ))}

           {/* Button Group */}
           
             <button
                       onClick={() => navigate("add-category")}
                       className=" bg-purple-600 bg-opacity-50 p-2.5 text-sm rounded-lg hover:shadow-md hover:bg-opacity-80 text-white flex justify-end items-center gap-2"
                     >
                       Add Categories <FaUser className="w-5 h-5" />
                     </button>
           
                     <button
                       onClick={() => navigate("add-vendor")}
                       className="bg-orange-600 bg-opacity-50 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
                     >
                       Add Vendors <FaUser className="w-5 h-5" />
                     </button>
                     <button
                       onClick={() => navigate("add-product")}
                       className="bg-orange-600 bg-opacity-50 p-2.5 rounded-lg text-sm hover:shadow-md hover:bg-opacity-80 text-white flex items-center gap-2"
                     >
                       Add Products <FaUser className="w-5 h-5" />
                     </button>
           
           
                    <button
                                   onClick={() => navigate("/logout")}
                                   className="bg-red-500 px-4 py-2 rounded-lg w-48 hover:bg-red-600 flex justify-center items-center gap-2 sm:w-60"
                                 >
                                   Logout <FaPowerOff className="text-white w-5 h-5" />
                                 </button>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
