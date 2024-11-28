import React, {useContext, useState} from 'react';
import { DarkThemeToggle, Flowbite, Spinner } from 'flowbite-react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext.jsx";

const RegisterForm = () => {

    const {register} = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formattedData = {
            'firstname': userData.firstname,
            'lastname': userData.lastname,
            'email': userData.email,
            'password': userData.password
        };
        const responseCode = await register(formattedData);
        if (responseCode === 201){
            navigate('/login');
        }else{
            setIsSubmitting(false);
        }
    };

    return (
        <Flowbite>
            {isSubmitting && (
                <div className="spinner-div fixed inset-0 z-2 bg-black bg-opacity-50 flex items-center justify-center">
                </div>
            )}
            <div
                className=" container-form min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <h1 className="text-4xl font-bold mb-6">Inscription</h1>

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

                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
                            <input
                                type="text"
                                name="firstname"
                                value={userData.firstname}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                            <input
                                type="text"
                                name="lastname"
                                value={userData.lastname}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
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
                        {isSubmitting ? (
                            <Spinner size="sm" aria-label="Chargement..." />
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                </form>

                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Déjà un compte ?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Connectez-vous
                        </a>.
                    </p>
                </div>
            </div>
        </Flowbite>
    );
}

export default RegisterForm;