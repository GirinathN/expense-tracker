import { useState } from "react";

import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    return (
        <div>

            <h1>Login</h1>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button text="Login" />

        </div>
    );
}

export default Login;