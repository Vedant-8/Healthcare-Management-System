import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Include the sidebar if necessary
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Sidebar />
        <main>
          <Routes>
            <Route
              path="/"
              element={<h1>Welcome to Healthcare Management System</h1>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard userId="1" />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
