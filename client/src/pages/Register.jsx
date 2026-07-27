import { useState } from "react";

import InputField from "../components/InputField";
import Button from "../components/Button";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    return (
        <div>

            <h1>Create Account</h1>

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

            <Button text="Register" />

        </div>
    );
}

export default Register;