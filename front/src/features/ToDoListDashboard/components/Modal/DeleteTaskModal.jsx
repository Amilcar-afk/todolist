import { Button, Modal } from "flowbite-react";
import {useContext, useState} from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {TaskContext} from "../../../../contexts/TaskContext";

export function DeleteTaskModal({ openModal, setOpenModal, task }) {
    const [taskToDelete, setTaskToDelete] = useState([]);
    const { deleteTask, setCurrentTasks } = useContext(TaskContext);

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const onDeleteTask = async (e) => {
        e.preventDefault();

        try {
            const request = await deleteTask(task.id);
            if (request.status === 204) {
                setCurrentTasks((prevTasks) =>
                    prevTasks.filter((t) => t.id !== task.id)
                );
                onCloseModal();
            }
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return (
        <>
            <Modal className="bg-transparent" show={openModal} size="md" onClose={onCloseModal} popup backdrop={false}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Êtes-vous sûr de vouloir supprimer cette tâche?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onDeleteTask}>
                                Oui, je suis sûr
                            </Button>
                            <Button color="gray" onClick={onCloseModal}>
                                Annuler
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}