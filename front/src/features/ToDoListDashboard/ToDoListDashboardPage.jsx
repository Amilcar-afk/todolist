import React, {useContext, useEffect, useState} from 'react';
import { Header } from "../Header/Header.jsx";
import { SideMenu } from "./components/SideBar/SideMenu.jsx";
import { NewTaskFormModal } from "./components/Modal/NewTaskFormModal.jsx";
import { TodayTaskTable } from "./components/Table/TodayTaskTable";
import './styles/ToDoListDashboard.css';
import {TaskContext} from "../../contexts/TaskContext";
import {OverdueTodayTaskTable} from "./components/Table/OverdueTaskTable";

const ToDoListDashboardPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const { displayTodayTask, displayOverdueTask } = useContext(TaskContext);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        displayTodayTask(formattedDate);
        displayOverdueTask(formattedDate);
    }, []);

    return (
        <>
            <Header />
            <div className="main-content">
                <SideMenu setOpenModal={setOpenModal} />
                <TodayTaskTable />
                <OverdueTodayTaskTable/>
            </div>
            <NewTaskFormModal openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    );
};

export default ToDoListDashboardPage;
