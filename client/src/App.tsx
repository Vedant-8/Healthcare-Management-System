import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import LandingPage from "./pages/LandingPage";
import PatientForm from "./forms/PatientForm";
import DoctorForm from "./forms/DoctorForm";
import AppointmentForm from "./forms/AppointmentForm";

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient-form" element={<PatientForm />} />
            <Route path="/doctor-form" element={<DoctorForm />} />
            <Route path="/appointment-form" element={<AppointmentForm />} />
          </Routes>
      </SignedIn>
    </Router>
  );
}
