import {Checkbox, Table} from "flowbite-react";
import "../../styles/TodayTask.css"
import {useContext, useState} from "react";
import {TaskContext} from "../../../../contexts/TaskContext";
import {DeleteTaskModal} from "../Modal/DeleteTaskModal";
import { HiTrash, HiPencil } from "react-icons/hi";
import { EditTaskForm } from "../Modal/EditTaskForm";
import {TaskDetailsModal} from "../Modal/TaskDetailsModal";

export function TodayTask() {
    const currentDate = new Date();
    const { currentTasks, setCurrentTasks } = useContext(TaskContext);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setOpenEditModal(true);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setOpenDetailsModal(true);
    };

    // Gestion du changement de la checkbox (coché ou décoché)
    const handleCheckboxChange = (taskId, checked) => {
        // Mise à jour de l'état de la tâche localement
        setCurrentTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, checked: checked } : task
            )
        );
    };

    return (
        <div className="overflow-x-auto today-task-container">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colSpan="4">Aujourd'hui  {currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()}</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {Array.isArray(currentTasks) && currentTasks.length > 0 ? (
                        currentTasks.map((t, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={() => handleTaskClick(t)}>
                                <Table.Cell className="p-4">
                                    <Checkbox
                                        checked={t.checked}
                                        onChange={(e) => handleCheckboxChange(t.id, e.target.checked)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {t.name}
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                        aria-label="Modifier"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(t);
                                        }}
                                    >
                                        <HiPencil className="w-6 h-6"/>
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() => handleDeleteClick(t)}
                                        className="text-red-600 hover:text-red-800 focus:outline-none"
                                        aria-label="Supprimer"
                                    >
                                        <HiTrash className="w-6 h-6"/>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan="3" className="text-center">
                                Aucune tâche pour aujourd'hui.
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            {selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    open={openDetailsModal}
                    onClose={() => setOpenDetailsModal(false)}
                />
            )}

            {selectedTask && (
                <DeleteTaskModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    task={selectedTask}
                />
            )}

            {selectedTask && (
                <EditTaskForm
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    task={selectedTask}
                />
            )}
        </div>
    );
}