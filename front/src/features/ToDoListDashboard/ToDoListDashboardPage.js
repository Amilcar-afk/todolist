import React, {useState} from 'react';
import {Header} from "../Header/Header.jsx";
import {SideMenu} from "./components/SideMenu.js";
import {NewTaskForm} from "./components/Modal/NewTaskForm.jsx";

const ToDoListDashboardPage = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Header/>
            <SideMenu setOpenModal={setOpenModal}/>
            <NewTaskForm openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    );
}

export default ToDoListDashboardPage;
