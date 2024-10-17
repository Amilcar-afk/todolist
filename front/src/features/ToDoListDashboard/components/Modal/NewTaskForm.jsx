import { Button, Label, Modal, TextInput, Datepicker, Textarea } from "flowbite-react";
import React, { useState } from "react";

export function NewTaskForm({ openModal, setOpenModal }) {
    const [taskData, setTaskData] = useState({
        name: '',
        description: '',
        date: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                                <Datepicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2023, 3, 30)}/>
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
