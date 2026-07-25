import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <header>
            <nav>
                <h2>Expense Tracker</h2>

                <div>
                    <Link to="/">Home</Link>{" | "}
                    <Link to="/login">Login</Link>{" | "}
                    <Link to="/register">Register</Link>{" | "}
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;