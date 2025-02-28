const express = require("express");
const Workout = require("../models/Workout");

const router = express.Router();

// ➤ GET all workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

// ➤ POST a new workout
router.post("/", async (req, res) => {
  try {
    console.log("📥 Request Body:", req.body);  // ✅ Logs request data

    const { exercise, duration, calories } = req.body;
    if (!exercise || !duration || !calories) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newWorkout = new Workout({ exercise, duration, calories });
    const savedWorkout = await newWorkout.save();

    console.log("✅ Workout Saved:", savedWorkout); // ✅ Logs saved workout
    res.json(savedWorkout);
  } catch (error) {
    console.error("❌ Error adding workout:", error.message);  // ✅ Logs error message
    res.status(500).json({ error: "Something went wrong!" });
  }
});


// ➤ DELETE a workout
router.delete("/:id", async (req, res) => {
  try {
    console.log("🗑️ Deleting Workout ID:", req.params.id);  // ✅ Logs workout ID

    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    console.log("✅ Workout Deleted:", deletedWorkout); // ✅ Logs deleted workout
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting workout:", error.message);  // ✅ Logs error message
    res.status(500).json({ error: "Something went wrong!" });
  }
});


module.exports = router;
