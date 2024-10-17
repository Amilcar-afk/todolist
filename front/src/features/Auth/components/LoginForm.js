import React, {useContext, useState} from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext.js";

const LoginForm = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            'email': userData.email,
            'password': userData.password
        };
        const responseCode = await login(formattedData);
        if (responseCode === 200){
            navigate('/todolist');
        }
    };

    return (
        <Flowbite>
            <div
                className=" container-form min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <h1 className="text-4xl font-bold mb-6">Connexion</h1>

                <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de
                            passe</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full button-primary-color hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                    >
                        Se connecter
                    </button>
                </form>

                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pas encore de compte ?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Inscrivez-vous
                        </a>.
                    </p>
                </div>
            </div>
        </Flowbite>
    );
}

export default LoginForm;