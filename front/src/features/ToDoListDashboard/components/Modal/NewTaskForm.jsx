import { Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, {useContext, useState} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {TaskContext} from "../../../../contexts/TaskContext";

export function NewTaskForm({ openModal, setOpenModal }) {
    const { addTask } = useContext(TaskContext);
    const [taskData, setTaskData] = useState({
        name: '',
        description: null,
        date: null,
    });

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
            date: taskData.date//.toISOString(),
        };

        const request = await addTask(newTask);

        if (request.status === 201) {
            console.log("task created");
        }else{
            console.log("not workinngg");
        }

    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Modal className="bg-transparent" show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header/>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nouvelle tâche</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Nom"/>
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
                                    <Label htmlFor="description" value="Description"/>
                                </div>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    value={taskData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="date" value="Date"/>
                                </div>
                                <DatePicker
                                    selected={taskData.date}
                                    onChange={handleDateChange}
                                    minDate={new Date(2023, 0, 1)}
                                    maxDate={new Date(2023, 11, 31)}/>
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
        </>
    );
}
