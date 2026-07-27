const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

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

module.exports = app;