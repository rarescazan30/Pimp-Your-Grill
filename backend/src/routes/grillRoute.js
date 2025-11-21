const express = require("express");
const Grill = require("../models/Grill");

const router = express.Router(); // router allows us to define route handlers separately from index.js

// fetch all grills from the database
router.get("/", async (req, res) => {
  try {
    const grills = await Grill.find();
    res.json(grills);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new grill
router.post("/", async (req, res) => {
  try {
    const {
        model,
        fuelType,
        rating,
        createdBy,
        isAvailable,
        color,
        comesWithRecipes,
        recipes,
      } = req.body;
    
      const newGrill = new Grill({
        model,
        fuelType,
        rating,
        createdBy,
        isAvailable,
        color,
        comesWithRecipes,
        recipes,
    });

    const savedGrill = await newGrill.save();

    res.status(201).json(savedGrill);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGrill = await Grill.findByIdAndDelete(id);
        if (!deletedGrill) {
            return res.status(404).json({ message: "Grill not found" });
        }
        res.json({ message: "Grill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
