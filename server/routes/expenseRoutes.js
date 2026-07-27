const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createExpense

} = require("../controllers/expenseController");

router.post("/", protect, createExpense);

module.exports = router;