import React, { createContext, useState, useEffect } from 'react';

// Create a context to store the auth state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Retrieve the initial login state from localStorage, default is false
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLoginState = localStorage.getItem("isLoggedIn");
        return storedLoginState === "true";
    });

    // Effect to update localStorage when the login state changes
    useEffect(() => {
        console.log(isLoggedIn)
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    // Function to handle login
    const login = () => {
        console.log("logggiin")
        setIsLoggedIn(true);
    };

    // Function to handle logout
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
