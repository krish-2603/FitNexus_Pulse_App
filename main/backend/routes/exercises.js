const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new exercise
router.post('/add', async (req, res) => {
  const { username, description, duration, date } = req.body;
  const newExercise = new Exercise({ username, description, duration, date });

  try {
    await newExercise.save();
    res.json({ message: "Exercise added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single exercise
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an exercise
router.delete('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercise deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an exercise
router.post('/update/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    await exercise.save();
    res.json({ message: "Exercise updated!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

