import { useState } from "react";

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

        catch (err) {

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

            <input

                type="text"

                placeholder="Title"

                value={title}

                onChange={(e) => setTitle(e.target.value)}

            />

            <br /><br />

            <input

                type="number"

                placeholder="Amount"

                value={amount}

                onChange={(e) => setAmount(e.target.value)}

            />

            <br /><br />

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

            <br /><br />

            <textarea

                placeholder="Description"

                value={description}

                onChange={(e) =>

                    setDescription(e.target.value)

                }

            />

            <br /><br />

            <input

                type="date"

                value={date}

                onChange={(e) => setDate(e.target.value)}

            />

            <br /><br />

            <button

                type="submit"

                disabled={loading}

            >

                {

                    loading ?

                    "Saving..."

                    :

                    "Add Expense"

                }

            </button>

        </form>

    );

}

export default ExpenseForm;