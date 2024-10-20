import React from 'react';
import RegisterForm from "./components/RegisterForm";
import './styles/Auth.css';
import {Header} from "../Header/Header";

const RegisterPage = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <section className="form-section bg-gray-100 dark:bg-gray-900">
                    <RegisterForm/>
                </section>
                <section className="image-section bg-gray-100 dark:bg-gray-900">
                    <img className="h-full w-full object-cover" alt='test' src={"todolist3.png"}/>
                </section>
            </div>
        </>
    );
}

export default RegisterPage;
