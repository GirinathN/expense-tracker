const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

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
app.use("/api/expenses", expenseRoutes);

module.exports = app;