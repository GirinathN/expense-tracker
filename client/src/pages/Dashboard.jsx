import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import ExpenseCard from "../components/ExpenseCard";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const profile = await API.get("/users/profile");

                setUser(profile.data.user);

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

        loadDashboard();

    }, [navigate]);

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

            <h2>

                Welcome,

                {user?.name}

            </h2>

            <button

                onClick={handleLogout}

            >

                Logout

            </button>

            <hr />

            <h2>Your Expenses</h2>

            {

                expenses.length === 0 ?

                (

                    <p>No expenses found.</p>

                )

                :

                (

                    expenses.map((expense) => (

                        <ExpenseCard

                            key={expense._id}

                            expense={expense}

                        />

                    ))

                )

            }

        </div>

    );

}

export default Dashboard;