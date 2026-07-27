import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

import {
    validateEmail,
    validatePassword
} from "../utils/validation";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {

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

        setLoading(true);

        setTimeout(() => {

            console.log({

                name,

                email,

                password

            });

            setLoading(false);

        }, 1000);

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
                onChange={(e)=>setName(e.target.value)}
            />

            <InputField
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <InputField
                label="Password"
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <InputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
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