import React, {useContext, useEffect, useState} from 'react';
import { Header } from "../Header/Header.jsx";
import { SideMenu } from "./components/SideBar/SideMenu.jsx";
import { NewTaskFormModal } from "./components/Modal/NewTaskFormModal.jsx";
import { TodayTaskTable } from "./components/Table/TodayTaskTable";
import './styles/ToDoListDashboard.css';
import {TaskContext} from "../../contexts/TaskContext";
import {OverdueTodayTaskTable} from "./components/Table/OverdueTaskTable";
import { FutureTaskTable } from './components/Table/FutureTaskTable.jsx';

const ToDoListDashboardPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const { displayTodayTask, displayOverdueTask, displayFutureTask } = useContext(TaskContext);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        displayTodayTask(formattedDate);
        displayOverdueTask(formattedDate);
        displayFutureTask(formattedDate);
    }, []);

    return (
        <>
            <Header />
            <div className="main-content">
            <SideMenu setOpenModal={setOpenModal} />
                <div className="div-row">
                    <TodayTaskTable />
                    <FutureTaskTable />
                </div>
                <OverdueTodayTaskTable/>
            </div>
            <NewTaskFormModal openModal={openModal} setOpenModal={setOpenModal}/>
        </>
    );
};

export default ToDoListDashboardPage;
