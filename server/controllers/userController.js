const User = require("../models/User");

const getUserProfile = async (req, res) => {

    res.status(200).json({

        success: true,

        user: req.user

    });

};

module.exports = {
    getUserProfile
};