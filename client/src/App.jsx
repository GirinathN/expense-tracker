import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await api.get("/api/hello");
                setMessage(response.data.message);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Expense Tracker</h1>

            <h2>Backend Message:</h2>

            <p>{message}</p>
        </div>
    );
}

export default App;