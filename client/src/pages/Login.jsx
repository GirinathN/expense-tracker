import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";

import { validateEmail } from "../utils/validation";

import API from "../api/axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!validateEmail(email)) {

            setError("Invalid email.");

            return;

        }

        if (!password) {

            setError("Password required.");

            return;

        }

        try {

            setLoading(true);

            const res = await API.post("/auth/login", {

                email,

                password

            });

            localStorage.setItem("token", res.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Login failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

            {error && <p>{error}</p>}

            <InputField

                label="Email"

                type="email"

                placeholder="Enter email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

            />

            <InputField

                label="Password"

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <Button

                text="Login"

                loading={loading}

                type="submit"

            />

        </form>

    );

}

export default Login;