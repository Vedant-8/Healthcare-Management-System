import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Card, CardContent, Grid } from "@mui/material";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Section 1: Introduction */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-200">
        <div className="text-center px-4">
          <Typography
            variant="h2"
            className="font-extrabold text-5xl text-gray-800"
          >
            Welcome to HealthCare
          </Typography>
          <Typography variant="body1" className="mt-4 text-lg text-gray-700">
            Your one-stop solution for managing your health and well-being with
            ease and simplicity.
          </Typography>
        </div>
      </section>

      {/* Section 2: Key Features */}
      <section className="py-16 bg-gray-50">
        <Typography
          variant="h4"
          className="text-center font-bold text-3xl text-gray-800 mb-8"
        >
          Key Features
        </Typography>
        <Grid container spacing={4} className="px-8 max-w-7xl mx-auto">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={4}
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardContent>
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Personalized Health Logs
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600">
                  Record and track your health data for a comprehensive overview
                  of your well-being.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={4}
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardContent>
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Appointment Management
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600">
                  Schedule and track appointments with ease, ensuring you're
                  always on time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={4}
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardContent>
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-800"
                >
                  Expert Health Recommendations
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-600">
                  Receive personalized recommendations to improve your health.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>

      {/* Section 3: Call to Action */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-indigo-400 text-white">
        <Typography variant="h4" className="font-bold text-3xl">
          Take Control of Your Health Today!
        </Typography>
        <Typography variant="body1" className="mt-4 text-lg">
          Join us and start managing your health in the most effective way
          possible.
        </Typography>
        <button
          onClick={() => (window.location.href = "/sign-up")}
          className="mt-8 px-6 py-3 bg-blue-500 rounded text-white hover:bg-blue-600 transition duration-300"
        >
          Sign Up Now
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
