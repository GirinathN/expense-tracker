import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [expenses, setExpenses] = useState([]);

    const [editingExpense, setEditingExpense] = useState(null);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] = useState("All");

    const [sortBy, setSortBy] = useState("latest");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const profile = await API.get("/users/profile");

            setUser(profile.data.user);

            const expenseRes = await API.get("/expenses");

            setExpenses(expenseRes.data.expenses);

        }

        catch {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            navigate("/login");

        }

        finally {

            setLoading(false);

        }

    };

    const addExpense = async (expenseData) => {

        const res = await API.post("/expenses", expenseData);

        setExpenses([res.data.expense, ...expenses]);

    };

    const deleteExpense = async (id) => {

        const confirmDelete = window.confirm("Delete this expense?");

        if (!confirmDelete) return;

        await API.delete(`/expenses/${id}`);

        setExpenses(

            expenses.filter((expense) => expense._id !== id)

        );

    };

    const filteredExpenses = useMemo(() => {

        let data = [...expenses];

        // Search
        data = data.filter((expense) =>

            expense.title

                .toLowerCase()

                .includes(search.toLowerCase())

        );

        // Category Filter
        if (categoryFilter !== "All") {

            data = data.filter(

                (expense) => expense.category === categoryFilter

            );

        }

        // Sorting
        switch (sortBy) {

            case "latest":

                data.sort(

                    (a, b) =>

                        new Date(b.date) -

                        new Date(a.date)

                );

                break;

            case "oldest":

                data.sort(

                    (a, b) =>

                        new Date(a.date) -

                        new Date(b.date)

                );

                break;

            case "highest":

                data.sort(

                    (a, b) => b.amount - a.amount

                );

                break;

            case "lowest":

                data.sort(

                    (a, b) => a.amount - b.amount

                );

                break;

            default:

                break;

        }

        return data;

    }, [expenses, search, categoryFilter, sortBy]);

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>Dashboard</h1>

            <h3>

                Welcome, {user?.name}

            </h3>

            <button onClick={handleLogout}>

                Logout

            </button>

            <hr />

            <ExpenseForm

                expense={editingExpense}

                onExpenseAdded={addExpense}

            />

            <hr />

            <h2>Your Expenses</h2>

            <input

                type="text"

                placeholder="Search Expenses"

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <br /><br />

            <select

                value={categoryFilter}

                onChange={(e) =>

                    setCategoryFilter(e.target.value)

                }

            >

                <option>All</option>

                <option>Food</option>

                <option>Transport</option>

                <option>Shopping</option>

                <option>Bills</option>

                <option>Entertainment</option>

                <option>Healthcare</option>

                <option>Education</option>

                <option>Salary</option>

                <option>Other</option>

            </select>

            <br /><br />

            <select

                value={sortBy}

                onChange={(e) =>

                    setSortBy(e.target.value)

                }

            >

                <option value="latest">

                    Latest

                </option>

                <option value="oldest">

                    Oldest

                </option>

                <option value="highest">

                    Highest Amount

                </option>

                <option value="lowest">

                    Lowest Amount

                </option>

            </select>

            <br /><br />

            {

                filteredExpenses.length === 0 ?

                (

                    <p>No expenses found.</p>

                )

                :

                (

                    filteredExpenses.map((expense) => (

                        <ExpenseCard

                            key={expense._id}

                            expense={expense}

                            onEdit={setEditingExpense}

                            onDelete={deleteExpense}

                        />

                    ))

                )

            }

        </div>

    );

}

export default Dashboard;