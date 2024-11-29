import { Label, Modal, TextInput, Textarea, Spinner} from "flowbite-react";
import React, { useContext, useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { TaskContext } from "../../../../contexts/TaskContext";

export function EditTaskFormModal({ openModal, setOpenModal, task }) {
    const { editTask } = useContext(TaskContext);
    const [taskData, setTaskData] = useState({
        id: null,
        name: '',
        description: '',
        date: new Date()
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    useEffect(() => {
        if (task) {
            setTaskData({
                id: task.id,
                name: task.name,
                description: task.description,
                date: task.date ? new Date(task.date) : new Date()
            });
        }
    }, [task]);

    function getEndDate(formattedDate, years) {
        const result = new Date(formattedDate);
        result.setFullYear(formattedDate.getFullYear() + years);
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
        setIsSubmitting(true);
        const updatedTask = {
            id: taskData.id,
            name: taskData.name,
            description: taskData.description,
            date: taskData.date ? taskData.date.toISOString() : null
        };

        try {
            const request = await editTask(updatedTask.id, updatedTask);

            if (request.status === 200) {
                onCloseModal();
            }
        } catch (error) {
            console.error("Erreur lors de la modification de la tâche", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            {isSubmitting && (
                <div className="spinner-div fixed inset-0 z-2 bg-black bg-opacity-50 flex items-center justify-center">
                </div>
            )}
            <Modal className="bg-transparent" show={openModal} size="md" onClose={onCloseModal} popup backdrop={false}>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier la tâche</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Nom" />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    placeholder="Nom"
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
                                    placeholder="Description"
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
                                    {isSubmitting ? (
                                        <Spinner size="sm" aria-label="Chargement..." />
                                    ) : (
                                        "Modifier la tâche"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
