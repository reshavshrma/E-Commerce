import React from "react";
import Logo from "../../../assets/black-website-logo.png";

const AboutHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center my-8">
      <img
        src={Logo}
        alt="Shopzo Logo"
        className="w-32 h-32 -p-1.5 md:mt-6 sm:ml-5 bg-gray-100 rounded-full shadow-lg object-cover hover:scale-105 transition-transform duration-300"
        data-aos="fade-down"
      />
    </div>
  );
};

export default AboutHeader;
