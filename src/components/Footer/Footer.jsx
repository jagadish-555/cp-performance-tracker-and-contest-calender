import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 mt-20 shadow-inner">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-lg font-medium text-center md:text-left mb-6 md:mb-0">
          © {new Date().getFullYear()} Jagadish Patil. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="mailto:jishwarpatil@gmail.com"
            aria-label="Email Jagadish"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-2xl"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/jagadish-555"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jagadish-patil-283747322/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
