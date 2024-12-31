
"use client";

import {Button, DarkThemeToggle, Navbar} from "flowbite-react";
import React, { useContext } from "react";
import { HeaderContext } from "../../contexts/HeaderContext";

export function Header() {
    return (
        <header>
            <Navbar fluid>
                <Navbar.Brand href="https://flowbite-react.com">
                    <img src={"logoMyTaskList.png"} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                </Navbar.Brand>
                <div className="flex items-center space-x-4 md:order-2">
                    <DarkThemeToggle/>
                    <a href="/login" className="text-gray-700 dark:text-gray-300 whitespace-nowrap">Se connecter</a>
                    <Button
                        className="button-primary-color hover:bg-blue-600 text-white px-4 rounded-md focus:outline-none">S'inscrire</Button>
                    <Navbar.Toggle/>
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Accueil
                    </Navbar.Link>
                    <Navbar.Link href="#">A propos</Navbar.Link>
                    <Navbar.Link href="#">Fonctionnalités</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

