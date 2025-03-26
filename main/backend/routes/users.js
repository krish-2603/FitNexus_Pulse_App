const router = require('express').Router();
const User = require('../models/user.model');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/add', async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  try {
    await newUser.save();
    res.json({ message: "User added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
