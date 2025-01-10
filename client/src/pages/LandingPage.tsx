import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Grid, Card, CardContent } from "@mui/material";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Section 1: Introduction */}
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-100 to-white animate-gradient-bg relative overflow-hidden">
        <div className="text-center px-4">
          <Typography
            variant="h2"
            className="font-extrabold text-5xl text-red-600"
          >
            Welcome to MedEase
          </Typography>
          <Typography variant="body1" className="mt-4 text-lg text-red-600">
            Your one-stop solution for managing your health and well-being with
            ease and simplicity.
          </Typography>
        </div>

        {/* Animated "+" Red Sign for Hospitals */}
        <div className="absolute inset-0">
          <div className="absolute animate-fadeAndMove plus-sign1">+</div>
          <div className="absolute animate-fadeAndMove plus-sign2">+</div>
          <div className="absolute animate-fadeAndMove plus-sign3">+</div>
          <div className="absolute animate-fadeAndMove plus-sign4">+</div>
          <div className="absolute animate-fadeAndMove plus-sign5">+</div>
        </div>
      </section>

      {/* Section 2: Key Features */}
      <section className="py-16 bg-[#fffdfd] flex justify-center items-center min-h-screen">
        <div className="text-center max-w-6xl w-full">
          <Typography
            variant="h4"
            className="font-bold text-3xl text-red-500 mb-12"
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
                  className="h-60 hover:scale-105 hover:shadow-xl hover:shadow-[#ffcccc] transition-all duration-300 rounded-lg flex flex-col justify-center items-center p-6"
                  style={{
                    borderRadius: "12px", // Keep rounded corners for the cards
                    color: "white",
                  }}
                >
                  <CardContent className="h-full flex flex-col justify-center items-center">
                    <Typography
                      variant="h5"
                      className="font-semibold text-red-800 text-lg text-center"
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="mt-2 text-red-600 text-sm text-center"
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
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-100 to-white text-red-600">
        <Typography variant="h4" className="font-bold text-3xl">
          Take Control of Your Health Today!
        </Typography>
        <Typography variant="body1" className="mt-4 text-lg">
          Join us and start managing your health in the most effective way
          possible.
        </Typography>
        <button
          onClick={() => (window.location.href = "/sign-up")}
          className="mt-8 px-6 py-3 bg-red-500 rounded text-white hover:bg-red-600 transition duration-300"
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
