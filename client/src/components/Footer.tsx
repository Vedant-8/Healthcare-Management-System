import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-500 text-center py-4">
      <p className="text-white text-sm hover:text-gray-300 transition duration-300">
        © {new Date().getFullYear()} MedEase. All rights reserved. 
      </p>
      <p className="text-white text-sm hover:text-gray-300 transition duration-300">
        Made by Postonauts
      </p>
    </footer>
  );
};

export default Footer;
