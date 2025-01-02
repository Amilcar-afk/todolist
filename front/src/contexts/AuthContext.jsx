import React, { createContext, useState } from 'react';
import AuthApi from './api/AuthApi.jsx';
import UsersApi from './api/UsersApi.jsx';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const register = async (user) => {
        try {
            const response = await UsersApi.addUser(user);
            return response.status;
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await AuthApi.login(credentials);
            if (response && response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                setCurrentUser(response.data.token);
            }
            return response.status;
        } catch (error) {
            console.error('Error logging in:', error);
        }
        return false;
    };

    const logout = async () => {
        try {
            localStorage.removeItem('jwtToken');
            setCurrentUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;