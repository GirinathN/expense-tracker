import { useEffect, useState } from "react";

import InputField from "./InputField";
import Button from "./Button";

function ExpenseForm({

    expense,

    onSubmit,

    onCancel

}) {

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

    useEffect(() => {

        if (expense) {

            setTitle(expense.title);

            setAmount(expense.amount);

            setCategory(expense.category);

            setDescription(expense.description);

            setDate(expense.date.split("T")[0]);

        }

        else {

            setTitle("");

            setAmount("");

            setCategory("Food");

            setDescription("");

            setDate("");

        }

    }, [expense]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!title || !amount || !category) {

            setError("Please fill all required fields.");

            return;

        }

        try {

            setLoading(true);

            await onSubmit({

                title,

                amount: Number(amount),

                category,

                description,

                date

            });

            if (!expense) {

                setTitle("");

                setAmount("");

                setCategory("Food");

                setDescription("");

                setDate("");

            }

        }

        catch (error) {

            setError("Unable to save expense.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>

                {expense ? "Edit Expense" : "Add Expense"}

            </h2>

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

            <div
                style={{
                    display: "flex",
                    gap: "10px"
                }}
            >

                <Button

                    text={expense ? "Update Expense" : "Add Expense"}

                    loading={loading}

                    type="submit"

                />

                {

                    expense && (

                        <Button

                            text="Cancel"

                            type="button"

                            onClick={onCancel}

                        />

                    )

                }

            </div>

        </form>

    );

}

export default ExpenseForm;