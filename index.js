// Import the express module
const express = require("express");
const app = express();
const Message = require("./messageModel");

// Define a port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware to parse JSON
app.use(express.json());

// Define a test route
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/post", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json({ savedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
