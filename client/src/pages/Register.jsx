import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import API from "../api/axios";

import {
    validateEmail,
    validatePassword
} from "../utils/validation";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!name || !email || !password || !confirmPassword) {

            setError("All fields are required.");

            return;
        }

        if (!validateEmail(email)) {

            setError("Enter a valid email.");

            return;
        }

        if (!validatePassword(password)) {

            setError("Password should be at least 6 characters.");

            return;
        }

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;
        }

        try {

            setLoading(true);

            await API.post("/auth/register", {

                name,

                email,

                password

            });

            alert("Registration Successful!");

            navigate("/login");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h1>Create Account</h1>

            {error && <p>{error}</p>}

            <InputField
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
                label="Password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
                text="Register"
                loading={loading}
                type="submit"
            />

        </form>

    );

}

export default Register;