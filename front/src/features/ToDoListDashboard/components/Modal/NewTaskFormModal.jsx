import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, {useContext, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {TaskContext} from "../../../../contexts/TaskContext";

export function NewTaskFormModal({ openModal, setOpenModal }) {
    const { addTask } = useContext(TaskContext);
    const [taskData, setTaskData] = useState({
        name: '',
        description: null,
        date: null,
    });
    const currentDate = new Date();

    function getEndDate(currentDate, years) {
        const result = new Date(currentDate);
        result.setFullYear(currentDate.getFullYear() + years);
        return result;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setTaskData({
            ...taskData,
            date: date,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            name: taskData.name,
            description: taskData.description,
            date: taskData.date ? taskData.date.toISOString() : null
        };

        const request = await addTask(newTask);

        if (request.status === 201) {
            onCloseModal();
        }
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Modal className="bg-transparent" show={openModal} size="md" onClose={onCloseModal} popup backdrop={false}>
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nouvelle tâche</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nom" />
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="nom"
                                value={taskData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="description"
                                value={taskData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" value="Date" />
                            </div>
                            <DatePicker
                                selected={taskData.date}
                                onChange={handleDateChange}
                                minDate={currentDate}
                                maxDate={getEndDate(currentDate, 1)}
                                className="w-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                            />
                        </div>

                        <div className="w-full">
                            <button
                                type="submit"
                                className="w-full button-primary-color hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                            >
                                Créer la tâche
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
