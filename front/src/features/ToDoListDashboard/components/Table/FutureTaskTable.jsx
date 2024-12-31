import {Checkbox, Table} from "flowbite-react";
import "../../styles/TodayTask.css"
import {useContext, useState} from "react";
import {TaskContext} from "../../../../contexts/TaskContext";
import {DeleteTaskModal} from "../Modal/DeleteTaskModal";
import { HiTrash, HiPencil } from "react-icons/hi";
import { EditTaskFormModal } from "../Modal/EditTaskFormModal";
import {TaskDetailsModal} from "../Modal/TaskDetailsModal";

export function FutureTaskTable() {
    const currentDate = new Date();
    const { futureTasks, setFutureTasks } = useContext(TaskContext);
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

    const handleCheckboxChange = (taskId, checked) => {
        setFutureTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, checked: checked } : task
            )
        );
    };

    return (
        <div className="overflow-x-auto today-task-container dark:bg-gray-800">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colSpan="4">Prochainement</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {Array.isArray(futureTasks) && futureTasks.length > 0 ? (
                        futureTasks.map((t, index) => (
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" >
                                <Table.Cell className="p-4 element-pointer" >
                                    <Checkbox
                                        checked={t.checked}
                                        onChange={(e) => handleCheckboxChange(t.id, e.target.checked)}
                                    />
                                </Table.Cell>
                                <Table.Cell className="element-pointer whitespace-nowrap font-medium text-gray-900 dark:text-white" onClick={() => handleTaskClick(t)}>
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
                                Aucune tâche à venir.
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
                <EditTaskFormModal
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    task={selectedTask}
                />
            )}
        </div>
    );
}