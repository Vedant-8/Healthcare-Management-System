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
      <section className="py-16 bg-blue-50 flex justify-center items-center min-h-screen">
        <div className="text-center max-w-6xl w-full">
          <Typography
            variant="h4"
            className="font-bold text-3xl text-gray-800 mb-12"
          >
            Key Features
          </Typography>
          <br />
          <Grid container spacing={6} justifyContent="center" className="px-4">
            {[
              {
                title: "Personalized Health Logs",
                description:
                  "Record and track your health data for a comprehensive overview of your well-being.",
              },
              {
                title: "Appointment Management",
                description:
                  "Schedule and track appointments with ease, ensuring you're always on time.",
              },
              {
                title: "Expert Health Recommendations",
                description:
                  "Receive personalized recommendations to improve your health.",
              },
              {
                title: "Secure Medical Records",
                description:
                  "Keep all your medical data safe and easily accessible whenever you need it.",
              },
              {
                title: "Health Insights & Trends",
                description:
                  "Analyze your health progress with detailed insights and trend tracking.",
              },
              {
                title: "24/7 Support",
                description:
                  "Access support anytime to assist you with your health management.",
              },
            ].map((feature, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Card
                  elevation={6}
                  className="h-60 hover:scale-105 transition-transform duration-300 animate-fadeIn rounded-lg flex flex-col justify-center items-center p-6"
                  style={{
                    borderRadius: "12px", // Keep rounded corners for the cards
                    color: "white",
                  }}
                >
                  <CardContent className="h-full flex flex-col justify-center items-center">
                    <Typography
                      variant="h5"
                      className="font-bold text-gray-800 text-lg text-center"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="mt-2 text-gray-600 text-sm text-center"
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
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
