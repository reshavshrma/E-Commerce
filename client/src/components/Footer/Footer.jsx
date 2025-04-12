import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { GrInstagram } from "react-icons/gr";
import Logo from "../../assets/white-website-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black to-gray-900 text-gray-300 py-12 px-4 sm:px-8 lg:px-20 transition-all">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

        {/* 🌐 About Section */}
        <div className="flex flex-col items-start space-y-4">
          <img
            src={Logo}
            alt="UrbanHaven Logo"
            className="w-24 sm:w-28 object-contain transition-transform duration-300 hover:scale-105"
          />
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            UrbanHaven is your perfect getaway to luxurious yet affordable hotel experiences. Book top-rated accommodations from trusted vendors across India.
          </p>
        </div>

        {/* 🔗 Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Vendors", "About", "Contact", "Blogs", "Policies"].map((item, i) => (
              <li key={i}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* 📍 Location Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Location</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Sant Longowal Institute of Engineering and Technology,<br />
            Longowal, Punjab, India - 148106
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Email:{" "}
            <a
              href="mailto:aniket08official@gmail.com"
              className="text-blue-400 hover:underline"
            >
              aniket08official@gmail.com
            </a>
          </p>
        </div>

        {/* 📱 Social Section */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              {
                icon: FaLinkedin,
                url: "https://www.linkedin.com/in/aniket-srivastava-0141b22b8/",
                hover: "hover:bg-blue-600",
              },
              {
                icon: CgMail,
                url: "mailto:aniket08official@gmail.com",
                hover: "hover:bg-red-600",
              },
              {
                icon: GrInstagram,
                url: "https://www.instagram.com/aniket_sriv_0810/",
                hover: "hover:bg-pink-600",
              },
              {
                icon: FaGithub,
                url: "https://github.com/aniket-sriv-0810",
                hover: "hover:bg-gray-700",
              },
            ].map(({ icon: Icon, url, hover }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-zinc-700 rounded-full transition-all duration-300 ${hover}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-gray-700"></div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <Link to="/about" className="text-blue-400 hover:text-cyan-500 transition">
            UrbanHaven Hotels
          </Link>
          . All rights reserved.
        </p>
        <p>
          Developed and maintained by{" "}
          <a
            href="https://www.linkedin.com/in/aniket-srivastava-0141b22b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline transition"
          >
            Aniket Srivastava
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
