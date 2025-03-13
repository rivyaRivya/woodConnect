import React, { useContext, useState } from 'react';
import './login.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from './authContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast function

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const [isLoggedIn, setIsLoggedIn] = useState(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
        // Here you can send formData to an API for authentication
        const { username, password } = formData;
        if (username && password) {
            try {
                // Make an API call to the Spring Boot backend login endpoint
                const response = await axios.post('http://localhost:8080/login', {
                    username,
                    password,
                });

                // Handle successful login (e.g., save token to local storage or redirect)
                if (response) {
                    setIsLoggedIn(true);
                    login();
                    navigate("/dashboard");
                    toast.success('Login successful!');
                    // You can redirect to another page here, for example:
                    // window.location.href = '/dashboard';
                }
            } catch (error) {
                console.log("rrrrrrrrrrrrrrr")
                // Handle login failure
                toast.error('Login failed! Invalid credentials.');
            }

        } else {
            toast.error("Please fill in both fields");
        }
    };


    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
export default Login;