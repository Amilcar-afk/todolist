import React, { createContext, useState } from 'react';
import TaskApi from './api/TaskApi.js';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
    const [currentTask, setCurrentTask] = useState(null);
    const addTask = async (task) => {
        try {
            const response = await TaskApi.addTask(task);
            if(response.status === 201){
                toast.success(`Votre Tâche a bien été créé`, {
                    theme: 'dark',
                });
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

    return (
        <TaskContext.Provider value={{ addTask, editTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;