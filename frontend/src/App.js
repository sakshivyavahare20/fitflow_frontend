import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Services from "./pages/Services";
import FitnessForm from "./pages/FitnessForm";
import NutritionForm from "./pages/NutritionForm"; // ✅ Import Nutrition Form

function App() {
  return (
    <Router>
      <div>
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fitness" element={<FitnessForm />} />
          <Route path="/nutrition" element={<NutritionForm />} /> {/* ✅ Added NutritionForm Route */}
          <Route path="/profile" element={<h1 style={{ textAlign: "center" }}>Your Profile</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
