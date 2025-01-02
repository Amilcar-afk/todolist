import React, {useContext, useEffect, useState} from 'react';
import Calendar from "./components/Calendar.jsx";
import {TaskContext} from "../../contexts/TaskContext";
import { Header } from '../Header/Header.jsx';
import { SideMenu } from "../SideBar/SideMenu.jsx";

const CalendarViewPage = () => {
    const { getUserTasks, UserTasks } = useContext(TaskContext);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getUserTasks();
    }, []);

    return (
        <>
            <Header/>
            <div>
                <SideMenu setOpenModal={setOpenModal} />
                <Calendar/>
            </div>
        </>
    );
};

export default CalendarViewPage;
