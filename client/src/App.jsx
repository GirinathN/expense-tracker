import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Main Application */}

                <Route element={<MainLayout />}>

                    <Route path="/" element={<Home />} />

                    <Route

                        path="/dashboard"

                        element={

                            <PrivateRoute>

                                <Dashboard />

                            </PrivateRoute>

                        }

                    />

                </Route>

                {/* Authentication Pages */}

                <Route element={<AuthLayout />}>

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                </Route>

                {/* 404 Page */}

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;