import React, {createContext, useState} from 'react';
import TaskApi from './api/TaskApi.jsx';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
    const [currentTasks, setCurrentTasks] = useState(null);
    const [currentOverdueTasks, setCurrentOverdueTasks] = useState(null);
    const addTask = async (task) => {
        try {
            const response = await TaskApi.addTask(task);
            if (response.status === 201) {
                toast.success(`Votre Tâche a bien été créée`, {
                    theme: 'dark',
                });
                const createdTask = response.data;
                const createdTaskDateOnly = convertToDateOnly(createdTask.date);
                const currentDateOnly = convertToDateOnly(new Date());

                if (createdTaskDateOnly.getTime() === currentDateOnly.getTime())
                    setCurrentTasks((prevTasks) => [...prevTasks, createdTask]);
            }
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const editTask = async (id, data) => {
        try{
            const response =  await TaskApi.updateTask(id, data);

            if(response.status === 200){
                toast.success(`Votre Tâche a bien été modifié`, {
                    theme: 'dark',
                });
            }
            return response;
        }catch(error){
            toast.error(`Erreur lors de la modification de la tâche`, {
                theme: 'dark',
            });
        }
    }

    const deleteTask = async (id) => {
        try{
            const response = await TaskApi.deleteTask(id);
            if(response.status === 204){
                toast.success(`Votre tâche a bien été supprimé`, {
                    theme: 'dark',
                });
            }
            return response;
        }catch(error){
            toast.error(`Erreur lors de la suppression de la tâche`, {
                theme: 'dark',
            });
        }
    }

    const displayTodayTask = async (date) => {
        try{
            const response = await TaskApi.getTodayTasks(date);
            setCurrentTasks(response.data.member);
            return response;
        }catch(error){
            toast.error(`Erreur lors de la récupération des tâches d'aujourd'hui`, {
                theme: 'dark',
            });
        }
    }


    const displayOverdueTask = async (date) => {
        try{
            const response = await TaskApi.getOverdueTasks(date);
            setCurrentOverdueTasks(response.data.member);
            return response;
        }catch(error){
            toast.error(`Erreur lors de la récupération des tâches d'aujourd'hui`, {
                theme: 'dark',
            });
        }
    }

    function convertToDateOnly(dateString) {
        const date = new Date(dateString);
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }

    return (
        <TaskContext.Provider value={{ addTask, editTask, deleteTask, displayTodayTask, setCurrentTasks, currentTasks, displayOverdueTask, currentOverdueTasks, setCurrentOverdueTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;