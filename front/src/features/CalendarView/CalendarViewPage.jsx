import React, {useContext, useEffect, useState} from 'react';
import Calendar from "./components/Calendar.jsx";
import {TaskContext} from "../../contexts/TaskContext";
import { Header } from '../Header/Header.jsx';

const CalendarViewPage = () => {
    const { getUserTasks, UserTasks } = useContext(TaskContext);

    useEffect(() => {
        getUserTasks();
    }, []);

    return (
        <>
            <Header/>
            <Calendar/>
        </>
    );
};

export default CalendarViewPage;
