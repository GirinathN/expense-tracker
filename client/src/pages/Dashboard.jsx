import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await API.get("/users/profile");

                setUser(res.data.user);

            }

            catch (err) {

                setError("Session expired. Please login again.");

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

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

            {error && <p>{error}</p>}

            {user && (

                <>

                    <h3>Welcome, {user.name} </h3>

                    <p>Email: {user.email}</p>

                </>

            )}

            <button onClick={handleLogout}>

                Logout

            </button>

        </div>

    );

}

export default Dashboard;