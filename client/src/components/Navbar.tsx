import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold text-gray-700">HealthCare</h1>
        <nav className="flex items-center space-x-4">
          {/* Links visible only when the user is signed out */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* Links visible only when the user is signed in */}
          <SignedIn>
            <div className="flex space-x-4">
              <button
                onClick={() => handleNavigation("/patient-form")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Patient Form
              </button>
              <button
                onClick={() => handleNavigation("/doctor-form")}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300"
              >
                Doctor Form
              </button>
              <button
                onClick={() => handleNavigation("/appointment-form")}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-300"
              >
                Appointment Form
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
