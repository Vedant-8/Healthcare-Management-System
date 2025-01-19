import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="bg-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <h1
  className="text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition duration-300 flex items-center gap-2"
  onClick={() => handleNavigation("/")}
  style={{ fontFamily: "'Inter', sans-serif" }}
>
  <MedicalServicesIcon sx={{ fontSize: "2rem" }} />
  MedEase
</h1>

        <nav className="flex items-center space-x-4">
          {/* Links visible only when the user is signed out */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* Links visible only when the user is signed in */}
          <SignedIn>
            <div className="flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
