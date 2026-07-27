const express = require("express");
const router = express.Router();

const {
    authTest,
    registerUser,
} = require("../controllers/authController");

router.get("/", authTest);
router.post("/register", registerUser);

module.exports = router;