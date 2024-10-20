import React from 'react';
import LoginForm from "./components/LoginForm.jsx";
import './styles/Auth.css';
import {Header} from "../Header/Header";

const LoginPage = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <section className="form-section bg-gray-100 dark:bg-gray-900">
                    <LoginForm/>
                </section>
                <section className="image-section bg-gray-100 dark:bg-gray-900">
                    <img className="h-full w-full object-cover" alt='test' src={"todolist3.png"}/>
                </section>
            </div>
        </>
    );
}

export default LoginPage;
