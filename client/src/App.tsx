import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Maps from "./pages/Maps";
import Directions from "./components/Directions";
import AppointmentForm from "./forms/AppointmentForm";
import HospitalDashboard from "./pages/HospitalDashboard";


export default function App() {
  return (
    <Router>
      {/* For signed-out users, show the landing page */}
      <SignedOut>
        <LandingPage />
      </SignedOut>

      {/* For signed-in users, show authenticated content with routes */}
      <SignedIn>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nearby-hospitals" element={<Maps />} />
            <Route path="/directions" element={<Directions />} />
            <Route path="/appointment-form" element={<AppointmentForm />}/>
            <Route path="/dashboard" element={<HospitalDashboard />} />
          </Routes>
      </SignedIn>
    </Router>
  );
}
