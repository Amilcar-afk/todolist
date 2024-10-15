import React from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

const RegisterForm = () => {
    return (
        <Flowbite>
            <div
                className=" container-form min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <h1 className="text-4xl font-bold mb-6">Inscription</h1>

                <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénom</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de
                            passe</label>
                        <input
                            type="password"
                            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                    >
                        S'inscrire
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

                <div className="mt-4">
                    <DarkThemeToggle/>
                </div>
            </div>
        </Flowbite>
    );
}

export default RegisterForm;