import React from "react";
import { AiFillInstagram, AiFillTwitterSquare, AiFillGithub, AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStoreIos } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="text-center bg-orange-400 p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="my-3 flex items-center flex-col md:flex-row">

        <div className="mb-2 md:mb-0 text-left">
          <h1 className="mb-2 ml-1 text-lg font-medium">Our Social Networks</h1>
          <div className="flex flex-wrap gap-2">

            <a href="https://www.linkedin.com/login" target="blank">
              <AiFillLinkedin className="text-white text-4xl hover:transform hover:scale-110 transition duration-300 ease-in-out" /></a>

            <a href="https://twitter.com/i/flow/login" target="blank">
              <AiFillTwitterSquare className="text-white text-4xl hover:transform hover:scale-110 transition duration-300 ease-in-out " /></a>

            <a href="https://www.instagram.com/accounts/login/?hl=en" target="blank">
              <AiFillInstagram className="text-white text-4xl hover:transform hover:scale-110 transition duration-300 ease-in-out" /></a>

            <a href="https://github.com/login" target="blank">
              <AiFillGithub className="text-white text-4xl hover:transform hover:scale-110 transition duration-300 ease-in-out" /></a>

            <a href="https://www.youtube.com" target="blank">
              <AiFillYoutube className="text-white text-4xl hover:transform hover:scale-110 transition duration-300 ease-in-out" /></a>
          </div>
        </div>

      </div>

      <div className="text-left">

        <h3><span className="font-medium">Call</span> - 1800-00-0000</h3>
        <h3><span className="font-medium">Mail</span> - help@roadsafe.com</h3>
        <h3 className="font-medium">Get our App</h3>
        <div className="flex space-x-4 mt-1">
          <a href='https://drive.google.com/uc?export=download&id=1sEU4bvkMhGQkzwFHhGEWJIk8aejKkZRU' target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <IoLogoGooglePlaystore size={32} className="text-black hover:transform hover:scale-110 transition duration-300 ease-in-out" />
          </a>
          <a href='https://drive.google.com/uc?export=download&id=10l7p8rLa9fi6l1qMNPchVslq0XFVq2vv' target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <FaAppStoreIos size={32} className="text-black hover:transform hover:scale-110 transition duration-300 ease-in-out" />
          </a>
        </div>
        {/* <a href="https://drive.google.com/uc?export=download&id=10l7p8rLa9fi6l1qMNPchVslq0XFVq2vv" target="blank"></a> */}
      </div>
    </div>

  );
};

export default Footer;
