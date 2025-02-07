import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, CircularProgress, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const FitnessForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    fitness_level: "beginner",
    activity_level: "moderately_active",
    goal: "maintenance",
    specific_area: "",
    target_timeline: "6_months",
    medical_conditions: "",
    injuries_or_physical_limitation: "",
    exercise_setting: "gym",
    sleep_pattern: "6_to_8",
    stress_level: 5, // Default value to prevent missing data
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Form Data:", JSON.stringify(formData)); // ✅ Debugging

    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/fitness/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API Response:", response.data);
      setRecommendation(response.data);
    } catch (err) {
      console.error("API Error:", err.response?.data);
      setError("Failed to get recommendations. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "50px auto", textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#4a0066", fontWeight: "bold" }}>
        Get Your Personalized Fitness Plan
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        
        {/* Gender Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Weight (kg)" type="number" name="weight" value={formData.weight} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
        <TextField label="Height (cm)" type="number" name="height" value={formData.height} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />

        {/* Fitness Level Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Fitness Level</InputLabel>
          <Select name="fitness_level" value={formData.fitness_level} onChange={handleChange}>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>

        {/* Activity Level Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Activity Level</InputLabel>
          <Select name="activity_level" value={formData.activity_level} onChange={handleChange}>
            <MenuItem value="sedentary">Sedentary</MenuItem>
            <MenuItem value="lightly_active">Lightly Active</MenuItem>
            <MenuItem value="moderately_active">Moderately Active</MenuItem>
            <MenuItem value="very_active">Very Active</MenuItem>
          </Select>
        </FormControl>

        {/* Goal Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Goal</InputLabel>
          <Select name="goal" value={formData.goal} onChange={handleChange}>
            <MenuItem value="weight_loss">Weight Loss</MenuItem>
            <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="improve_endurance">Improve Endurance</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Specific Area of Focus" name="specific_area" value={formData.specific_area} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

        {/* Target Timeline Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Target Timeline</InputLabel>
          <Select name="target_timeline" value={formData.target_timeline} onChange={handleChange}>
            <MenuItem value="1_month">1 Month</MenuItem>
            <MenuItem value="3_months">3 Months</MenuItem>
            <MenuItem value="6_months">6 Months</MenuItem>
            <MenuItem value="1_year">1 Year</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Medical Conditions" name="medical_conditions" value={formData.medical_conditions} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

        <TextField label="Injuries or Physical Limitations" name="injuries_or_physical_limitation" value={formData.injuries_or_physical_limitation} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

        {/* Exercise Setting Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Exercise Setting</InputLabel>
          <Select name="exercise_setting" value={formData.exercise_setting} onChange={handleChange}>
            <MenuItem value="home">Home</MenuItem>
            <MenuItem value="gym">Gym</MenuItem>
            <MenuItem value="outdoor">Outdoor</MenuItem>
          </Select>
        </FormControl>

        {/* Sleep Pattern Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Sleep Pattern</InputLabel>
          <Select name="sleep_pattern" value={formData.sleep_pattern} onChange={handleChange}>
            <MenuItem value="less_than_6">Less than 6 hours</MenuItem>
            <MenuItem value="6_to_8">6 to 8 hours</MenuItem>
            <MenuItem value="more_than_8">More than 8 hours</MenuItem>
          </Select>
        </FormControl>

        {/* Stress Level Input */}
        <TextField label="Stress Level (1-10)" type="number" name="stress_level" value={formData.stress_level} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, backgroundColor: "#4a0066" }}>
          Get Recommendation
        </Button>
      </form>

      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {recommendation && (
        <Box sx={{ mt: 4, textAlign: "left", backgroundColor: "#f4f4f4", padding: 3, borderRadius: 2 }}>
          <Typography variant="h5">Your Personalized Fitness Plan:</Typography>
          <Typography><strong>BMI:</strong> {recommendation.bmi.toFixed(2)} ({recommendation.bmi_category})</Typography>
          <Typography sx={{ mt: 2, whiteSpace: "pre-line", fontFamily: "monospace" }}>
            {recommendation.recommendation_text}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FitnessForm;
