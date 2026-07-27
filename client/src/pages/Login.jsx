import { useState } from "react";

import InputField from "../components/InputField";

import Button from "../components/Button";

import {

    validateEmail

} from "../utils/validation";

function Login() {

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const handleSubmit=(e)=>{

        e.preventDefault();

        setError("");

        if(!validateEmail(email)){

            setError("Invalid email.");

            return;

        }

        if(!password){

            setError("Password required.");

            return;

        }

        setLoading(true);

        setTimeout(()=>{

            console.log({

                email,

                password

            });

            setLoading(false);

        },1000);

    }

    return(

        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

            {error && <p>{error}</p>}

            <InputField

                label="Email"

                type="email"

                placeholder="Enter email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

            />

            <InputField

                label="Password"

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

            />

            <Button

                text="Login"

                loading={loading}

                type="submit"

            />

        </form>

    )

}

export default Login;