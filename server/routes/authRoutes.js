const express = require("express");
const router = express.Router();

const {
    authTest,
    registerUser,
    loginUser
} = require("../controllers/authController");

router.get("/", authTest);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;