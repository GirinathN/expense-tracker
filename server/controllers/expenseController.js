const Expense = require("../models/Expense");

const createExpense = async (req, res) => {

    try {

        const {

            title,

            amount,

            category,

            description,

            date

        } = req.body;

        if (!title || !amount || !category) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields."

            });

        }

        const expense = await Expense.create({

            title,

            amount,

            category,

            description,

            date,

            user: req.user._id

        });

        res.status(201).json({

            success: true,

            message: "Expense created successfully.",

            expense

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createExpense

};