import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { GrInstagram } from "react-icons/gr";
import Logo from "../../assets/white-website-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black to-gray-800 text-gray-300 py-10 px-5 sm:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* About Us */}
        <div>
          <img
            src={Logo}
            alt="UrbanHaven Logo"
            className="w-28 mb-3 transition-transform duration-300 hover:scale-105"
          />
          <p className="text-sm text-gray-400 leading-relaxed">
            UrbanHaven is your perfect getaway to luxurious yet affordable hotel experiences. Book top-rated accommodations from trusted vendors.
          </p>
        </div>

        {/* Our Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Vendors", "About", "Contact", "Blogs", "Policies"].map((item, i) => (
              <li key={i}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition-all duration-300"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Location */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Location</h3>
          <p className="text-sm text-gray-400">
            Sant Longowal Institute of Engineering and Technology,<br />
            Longowal, Punjab, India - 148106
          </p>
          <p className="mt-2 text-sm text-gray-400">Email: <a href="mailto:aniket08official@gmail.com" className="text-blue-400 hover:underline">aniket08official@gmail.com</a></p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              {
                icon: FaLinkedin,
                url: "https://www.linkedin.com/in/aniket-srivastava-0141b22b8/",
                color: "hover:bg-blue-600",
              },
              {
                icon: CgMail,
                url: "mailto:aniket08official@gmail.com",
                color: "hover:bg-red-600",
              },
              {
                icon: GrInstagram,
                url: "https://www.instagram.com/aniket_sriv_0810/",
                color: "hover:bg-pink-600",
              },
              {
                icon: FaGithub,
                url: "https://github.com/aniket-sriv-0810",
                color: "hover:bg-gray-700",
              },
            ].map(({ icon: Icon, url, color }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-zinc-700 rounded-full transition-all duration-300 ${color}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-700"></div>

      {/* Bottom Text */}
      <div className="text-center space-y-2 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link to="/about" className="text-blue-400 hover:text-cyan-500">
            UrbanHaven Hotels
          </Link>
          . All rights reserved.
        </p>
        <p>
          Developed and Maintained by{" "}
          <a
            href="https://www.linkedin.com/in/aniket-srivastava-0141b22b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            Aniket Srivastava
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
