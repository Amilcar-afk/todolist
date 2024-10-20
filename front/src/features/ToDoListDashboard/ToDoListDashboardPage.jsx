import React, {useState} from 'react';
import {Header} from "../Header/Header.jsx";
import {SideMenu} from "./components/SideBar/SideMenu.jsx";
import {NewTaskForm} from "./components/Modal/NewTaskForm.jsx";
import {TodayTask} from "./components/Table/TodayTask";
import './styles/ToDoListDashboard.css';

const ToDoListDashboardPage = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Header/>
            <div className="main-content">
                <SideMenu setOpenModal={setOpenModal}/>
                <TodayTask/>
            </div>
            <NewTaskForm openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    );
}

export default ToDoListDashboardPage;
