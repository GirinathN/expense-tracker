import { useState } from "react";

import InputField from "./InputField";
import Button from "./Button";

function ExpenseForm({ onExpenseAdded }) {

    const [title, setTitle] = useState("");

    const [amount, setAmount] = useState("");

    const [category, setCategory] = useState("Food");

    const [description, setDescription] = useState("");

    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const categories = [

        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Healthcare",
        "Education",
        "Salary",
        "Other"

    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!title || !amount || !category) {

            setError("Please fill all required fields.");

            return;

        }

        try {

            setLoading(true);

            await onExpenseAdded({

                title,

                amount: Number(amount),

                category,

                description,

                date

            });

            setTitle("");

            setAmount("");

            setCategory("Food");

            setDescription("");

            setDate("");

        }

        catch (error) {

            setError("Unable to add expense.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Add Expense</h2>

            {error && <p>{error}</p>}

            <InputField

                label="Title"

                type="text"

                placeholder="Expense Title"

                value={title}

                onChange={(e) => setTitle(e.target.value)}

            />

            <InputField

                label="Amount"

                type="number"

                placeholder="Expense Amount"

                value={amount}

                onChange={(e) => setAmount(e.target.value)}

            />

            <div>

                <label>Category</label>

                <br />

                <select

                    value={category}

                    onChange={(e) => setCategory(e.target.value)}

                >

                    {

                        categories.map((item) => (

                            <option

                                key={item}

                                value={item}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

            </div>

            <InputField

                label="Date"

                type="date"

                value={date}

                onChange={(e) => setDate(e.target.value)}

            />

            <div>

                <label>Description</label>

                <br />

                <textarea

                    rows="4"

                    placeholder="Expense Description"

                    value={description}

                    onChange={(e) =>

                        setDescription(e.target.value)

                    }

                />

            </div>

            <br />

            <Button

                text="Add Expense"

                loading={loading}

                type="submit"

            />

        </form>

    );

}

export default ExpenseForm;