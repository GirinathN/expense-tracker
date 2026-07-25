const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

app.get("/api/hello", (req, res) => {
    res.json({
        success: true,
        message: "Hello from Express!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});