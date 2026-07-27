const authTest = (req, res) => {

    res.json({
        success: true,
        message: "Authentication Controller Working"
    });

};

module.exports = {
    authTest
};