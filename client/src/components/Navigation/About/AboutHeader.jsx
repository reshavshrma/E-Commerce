import React from "react";
import Logo from "../../../assets/black-website-logo.png";

const AboutHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center text-center my-8">
      <img
        src={Logo}
        alt="UrbanHaven Logo"
        className="w-28 h-28 md:mt-6 sm:ml-5 bg-gray-100 rounded-full shadow-lg object-cover hover:scale-105 transition-transform duration-300"
        data-aos="fade-down"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 sm:mt-0 sm:ml-6">
        About UrbanHaven
      </h1>
    </div>
  );
};

export default AboutHeader;
