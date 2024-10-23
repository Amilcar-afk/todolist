import React, {useContext, useEffect, useState} from 'react';
import { Header } from "../Header/Header.jsx";
import { SideMenu } from "./components/SideBar/SideMenu.jsx";
import { NewTaskForm } from "./components/Modal/NewTaskForm.jsx";
import { TodayTask } from "./components/Table/TodayTask";
import './styles/ToDoListDashboard.css';
import {TaskContext} from "../../contexts/TaskContext";

const ToDoListDashboardPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const { displayTodayTask } = useContext(TaskContext);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        displayTodayTask(formattedDate);
    }, []);

    return (
        <>
            <Header />
            <div className="main-content">
                <SideMenu setOpenModal={setOpenModal} />
                <TodayTask />
            </div>
            <NewTaskForm openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    );
};

export default ToDoListDashboardPage;
