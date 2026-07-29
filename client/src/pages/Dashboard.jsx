import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import DashboardCard from "../components/DashboardCard";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpensePieChart from "../charts/ExpensePieChart";
import MonthlyBarChart from "../charts/MonthlyBarChart";

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

            const profileRes = await API.get("/users/profile");

            setUser(profileRes.data.user);

            const expenseRes = await API.get("/expenses");

            setExpenses(expenseRes.data.expenses);

        }

        catch (error) {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            navigate("/login");

        }

        finally {

            setLoading(false);

        }

    };

    const saveExpense = async (expenseData) => {

        try {

            if (editingExpense) {

                const res = await API.put(

                    `/expenses/${editingExpense._id}`,

                    expenseData

                );

                setExpenses(

                    expenses.map((expense) =>

                        expense._id === editingExpense._id

                            ? res.data.expense

                            : expense

                    )

                );

                setEditingExpense(null);

            }

            else {

                const res = await API.post(

                    "/expenses",

                    expenseData

                );

                setExpenses([

                    res.data.expense,

                    ...expenses

                ]);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const deleteExpense = async (id) => {

        const confirmDelete = window.confirm(

            "Delete this expense?"

        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/expenses/${id}`);

            setExpenses(

                expenses.filter(

                    (expense) => expense._id !== id

                )

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    const totalIncome = useMemo(() => {

        return expenses

            .filter(

                (expense) =>

                    expense.category === "Salary"

            )

            .reduce(

                (total, expense) =>

                    total + expense.amount,

                0

            );

    }, [expenses]);

    const totalExpense = useMemo(() => {

        return expenses

            .filter(

                (expense) =>

                    expense.category !== "Salary"

            )

            .reduce(

                (total, expense) =>

                    total + expense.amount,

                0

            );

    }, [expenses]);

    const balance = useMemo(() => {

        return totalIncome - totalExpense;

    }, [totalIncome, totalExpense]);

    const monthlyExpense = useMemo(() => {

        const today = new Date();

        return expenses

            .filter((expense) => {

                const expenseDate = new Date(expense.date);

                return (

                    expense.category !== "Salary"

                    &&

                    expenseDate.getMonth() === today.getMonth()

                    &&

                    expenseDate.getFullYear() ===

                    today.getFullYear()

                );

            })

            .reduce(

                (total, expense) =>

                    total + expense.amount,

                0

            );

    }, [expenses]);

    const filteredExpenses = useMemo(() => {

        let data = [...expenses];

        data = data.filter((expense) =>

            expense.title

                .toLowerCase()

                .includes(search.toLowerCase())

        );

        if (categoryFilter !== "All") {

            data = data.filter(

                (expense) =>

                    expense.category === categoryFilter

            );

        }

        switch (sortBy) {

            case "latest":

                data.sort(

                    (a, b) =>

                        new Date(b.date)

                        -

                        new Date(a.date)

                );

                break;

            case "oldest":

                data.sort(

                    (a, b) =>

                        new Date(a.date)

                        -

                        new Date(b.date)

                );

                break;

            case "highest":

                data.sort(

                    (a, b) =>

                        b.amount - a.amount

                );

                break;

            case "lowest":

                data.sort(

                    (a, b) =>

                        a.amount - b.amount

                );

                break;

            default:

                break;

        }

        return data;

    }, [

        expenses,

        search,

        categoryFilter,

        sortBy

    ]);

    const recentTransactions = useMemo(() => {

        return filteredExpenses.slice(0, 5);

    }, [filteredExpenses]);

    const categorySummary = useMemo(() => {

        return expenses.reduce(

            (summary, expense) => {

                if (

                    expense.category === "Salary"

                ) {

                    return summary;

                }

                summary[expense.category] =

                    (summary[expense.category] || 0)

                    + expense.amount;

                return summary;

            },

            {}

        );

    }, [expenses]);

    if (loading) {

        return <h2>Loading...</h2>;

    }

        return (

        <div

    style={{

        padding:"30px",

        maxWidth:"1400px",

        margin:"0 auto"

    }}

>

            <h1>Dashboard</h1>

            <h3>

                Welcome, {user?.name} 

            </h3>

            <button onClick={handleLogout}>

                Logout
            </button>

            <hr />

            {/* Dashboard Summary Cards */}

            <div

                style={{

                    display: "grid",

                    gridTemplateColumns: "repeat(4,1fr)",

                    gap: "20px",

                    margin: "25px 0"

                }}

            >

                <DashboardCard

                    title="Total Income"

                    value={`₹${totalIncome}`}

                />

                <DashboardCard

                    title="Total Expense"

                    value={`₹${totalExpense}`}

                />

                <DashboardCard

                    title="Balance"

                    value={`₹${balance}`}

                />

                <DashboardCard

                    title="This Month"

                    value={`₹${monthlyExpense}`}

                />

            </div>

            <hr />

            <ExpenseForm

                expense={editingExpense}

                onSubmit={saveExpense}

                onCancel={() => setEditingExpense(null)}

            />

            <hr />

            <h2>Recent Transactions</h2>

            <div

                style={{

                    display: "flex",

                    gap: "15px",

                    flexWrap: "wrap",

                    marginBottom: "20px"

                }}

            >

                <input

                    type="text"

                    placeholder="Search expenses..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

                <select

                    value={categoryFilter}

                    onChange={(e) =>

                        setCategoryFilter(e.target.value)

                    }

                >

                    <option value="All">All</option>

                    <option value="Food">Food</option>

                    <option value="Transport">Transport</option>

                    <option value="Shopping">Shopping</option>

                    <option value="Bills">Bills</option>

                    <option value="Entertainment">Entertainment</option>

                    <option value="Healthcare">Healthcare</option>

                    <option value="Education">Education</option>

                    <option value="Salary">Salary</option>

                    <option value="Other">Other</option>

                </select>

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

            </div>
                        <hr />

            {

                recentTransactions.length === 0 ?

                (

                    <p>No expenses found.</p>

                )

                :

                (

                    recentTransactions.map((expense) => (

                        <ExpenseCard

                            key={expense._id}

                            expense={expense}

                            onEdit={setEditingExpense}

                            onDelete={deleteExpense}

                        />

                    ))

                )

            }

            <hr />

            <hr />

<h2>

    Analytics

</h2>

<div

    style={{

        display: "grid",

        gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",

        gap: "20px",

        marginTop: "20px"

    }}

>

    <div>

        <h3>

            Expense Distribution

        </h3>

        <ExpensePieChart

            categorySummary={categorySummary}

        />

    </div>

    <div>

        <h3>

            Monthly Expense Trend

        </h3>

        <MonthlyBarChart

            expenses={expenses}

        />

    </div>

</div>

<hr />

<h2>

    Category Summary

</h2>

{

    Object.keys(categorySummary).length === 0 ?

    (

        <p>

            No expense categories available.

        </p>

    )

    :

    (

        Object.entries(categorySummary).map(

            ([category, amount]) => (

                <p key={category}>

                    <strong>

                        {category}

                    </strong>

                    {" : "}

                    ₹{amount}

                </p>

            )

        )

    )

}
        </div>

    );

}

export default Dashboard;