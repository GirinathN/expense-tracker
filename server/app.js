const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;