import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SpaIcon from "@mui/icons-material/Spa";

function Services() {
  const navigate = useNavigate(); // ✅ Initialize navigation function
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const services = [
    {
      title: "Fitness",
      icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#fff" }} />,
      video: "/fitnessvideo.mp4",
      description:
        "Get fit with personalized fitness plans and workouts. Start your fitness journey with a routine tailored just for you. Our expert trainers will guide you through exercises that target different muscle groups, helping you build strength, endurance, and flexibility. Whether you're a beginner or an advanced fitness enthusiast, we have a plan for you.",
    },
    {
      title: "Nutrition",
      icon: <RestaurantIcon sx={{ fontSize: 50, color: "#fff" }} />,
      video: "/nutritionvideo.mp4",
      description:
        "Fuel your body with healthy and balanced nutrition. Learn how to plan your diet according to your health goals, dietary restrictions, and daily nutritional needs. Get personalized recommendations to maintain a balanced lifestyle.",
    },
    {
      title: "Aerobics",
      icon: <DirectionsRunIcon sx={{ fontSize: 50, color: "#fff" }} />,
      video: "/aerobicsvideo.mp4",
      description: "Boost your cardio health with fun aerobics routines...",
    },
    {
      title: "Yoga",
      icon: <SelfImprovementIcon sx={{ fontSize: 50, color: "#fff" }} />,
      video: "/yogavideo1.mp4",
      description: "Relax your mind and body with yoga practices...",
    },
    {
      title: "Meditation",
      icon: <SpaIcon sx={{ fontSize: 50, color: "#fff" }} />,
      video: "/meditationvideo1.mp4",
      description: "Achieve inner peace with guided meditation...",
    },
  ];

  return (
    <div style={{ textAlign: "center", minHeight: "100vh", backgroundColor: "#010314" }}>
      <Box sx={{ width: "100%", height: "50px", background: "linear-gradient(90deg, #4a0066, #010314)" }}></Box>

      <Box sx={{ width: "80%", maxWidth: "1000px", margin: "20px auto", padding: "20px" }}>
        <Typography variant="h4" sx={{ color: "#D1C4E9", marginBottom: "30px", fontWeight: "bold" }}>
          Our Services
        </Typography>

        {services.map((service, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: index % 2 === 0 ? "row" : "row-reverse", marginBottom: "50px" }}>
            <Box sx={{ flex: 1, padding: "30px", color: "#fff", margin: "0 30px", background: "radial-gradient(circle at top, #010314 50%, #4a0066 90%)", textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                {service.icon}
                <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "1.5rem", marginLeft: "10px" }}>
                  {service.title}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ lineHeight: "1.5", marginBottom: "20px", fontSize: "1.1rem" }}>
                {service.description}
              </Typography>

              {/* ✅ Corrected Navigation for Fitness & Nutrition */}
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "8px", padding: "10px 20px", backgroundColor: "#4a0066", "&:hover": { backgroundColor: "#6a0080" } }}
                onClick={() => {
                  if (service.title === "Fitness") navigate("/fitness");
                  if (service.title === "Nutrition") navigate("/nutrition"); // ✅ Fix for Nutrition
                }}
              >
                Get Started
              </Button>
            </Box>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "450px", height: "250px", borderRadius: "12px", margin: "0 30px" }}>
              <video key={service.video} autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "2px solid #4a0066" }} src={service.video} />
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Services;
