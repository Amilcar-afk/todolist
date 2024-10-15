import React from 'react';
import RegisterForm from "./components/RegisterForm";
import {DarkThemeToggle} from "flowbite-react";
import './styles/Register.css';

const RegisterPage = () => {
    return (
        <div className="container">
            <section className="form-section bg-gray-100 dark:bg-gray-900">
                <RegisterForm/>
            </section>
            <section className="image-section bg-gray-100 dark:bg-gray-900">
                <img className="h-full w-full object-cover" alt='test' src={"todolist3.png"}/>
            </section>
        </div>
    );
}

export default RegisterPage;
