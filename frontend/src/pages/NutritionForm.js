import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const NutritionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    weight: "",
    height: "",
    veg_or_nonveg: "Veg",
    goal: "Gain muscles",
    disease: "",
    country: "India",
    state: "Maharashtra",
    allergics: "",
    food_type: "Veg",
    Target_timeline: "3 months",
  });

  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/nutrition/", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setRecommendation(response.data.data.recommendation);
    } catch (err) {
      setError("Failed to get recommendations. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const renderNestedData = (data) => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{typeof item === "object" ? renderNestedData(item) : item}</li>
          ))}
        </ul>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(data).map(([key, value], index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <strong>{key.replace(/_/g, " ")}</strong>
                  </TableCell>
                  <TableCell>
                    {typeof value === "object" ? renderNestedData(value) : value.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <span>{data}</span>;
    }
  };

  return (
    <Box sx={{ width: "70%", margin: "50px auto", textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#4a0066", fontWeight: "bold" }}>
        Get Your Personalized Nutrition Plan
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              {key === "gender" || key === "veg_or_nonveg" || key === "goal" || key === "food_type" || key === "Target_timeline" ? (
                <FormControl fullWidth>
                  <InputLabel>{key.replace(/_/g, " ").toUpperCase()}</InputLabel>
                  <Select name={key} value={formData[key]} onChange={handleChange}>
                    {key === "gender" && ["Male", "Female"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    {key === "veg_or_nonveg" && ["Veg", "Non-Veg", "Veg & Non-Veg"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    {key === "goal" && ["Gain muscles", "Lose weight", "Maintain physique"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    {key === "food_type" && ["Veg", "Non-Veg"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    {key === "Target_timeline" && ["1 month", "3 months", "6 months", "1 year"].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label={key.replace(/_/g, " ").toUpperCase()}
                  name={key}
                  type={key === "age" || key === "weight" || key === "height" ? "number" : "text"}
                  value={formData[key]}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, backgroundColor: "#4a0066" }}>
          Get Recommendation
        </Button>
      </form>

      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {recommendation && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>Your Personalized Nutrition Plan</Typography>
          {Object.entries(recommendation).map(([key, value], index) => (
            <Card key={index} sx={{ mb: 3, backgroundColor: "#f9f9f9", boxShadow: 3, padding: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4a0066", textTransform: "capitalize" }}>
                  {key.replace(/_/g, " ")}
                </Typography>
                {renderNestedData(value)}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NutritionForm;