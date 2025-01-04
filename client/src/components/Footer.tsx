import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-300 to-blue-300 text-center py-4">
      <p className="text-gray-700 text-sm">
        © {new Date().getFullYear()} HealthCare. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
