const express = require("express");

const router = express.Router();

const {
    authTest
} = require("../controllers/authController");

router.get("/", authTest);

module.exports = router;