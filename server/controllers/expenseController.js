const Expense = require("../models/Expense");

// Create Expense
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

// Get All Expenses
const getExpenses = async (req, res) => {

    try {

        const expenses = await Expense.find({

            user: req.user._id

        }).sort({

            date: -1

        });

        res.status(200).json({

            success: true,

            count: expenses.length,

            expenses

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

    createExpense,

    getExpenses

};