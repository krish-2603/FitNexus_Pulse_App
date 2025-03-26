const User = require("./models/user.model"); // Import User model
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
      const users = await User.find(); // Fetch users from MongoDB
      console.log("Fetched users:", users); // ✅ Debugging line
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}); 

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // ✅ Fix deprecated parser warning
      useUnifiedTopology: true, // ✅ Fix server discovery warning
      writeConcern: { w: "majority" }, // ✅ Fix writeConcern warning
    })
    console.log("✅ MongoDB Connected Successfully")
  } catch(err) {
    console.log("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}
connectDB();

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to FitNexus Backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
