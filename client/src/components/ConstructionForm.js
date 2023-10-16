import React, { useState } from "react";
import "./ConstructionForm.css"; // Import the CSS file

import { Link } from "@material-ui/core";
import Construction from "./Construction";

const ConstructionForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    supplier: "",
    budget: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/Constructions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Record added successfully");
        // Optionally, you can redirect or update the UI as needed.
      } else {
        console.error("Error adding record");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="construction-form-container">
      <h2 className="construction-form-header">Add Construction Record</h2>
      <form className="construction-form" onSubmit={handleSubmit}>
        <div>
          <label className="construction-label">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="construction-input"
          />
        </div>
        <div>
          <label className="construction-label">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="construction-input"
          />
        </div>
        <div>
          <label className="construction-label">Supplier:</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="construction-input"
          />
        </div>
        <div>
          <label className="construction-label">Budget:</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="construction-input"
          />
        </div>
        <button type="submit" className="construction-button">
          Submit
        </button>
        <button className="construction-button" onClick={<Construction />}>
          View Construction
        </button>
      </form>
    </div>
  );
};

export default ConstructionForm;
