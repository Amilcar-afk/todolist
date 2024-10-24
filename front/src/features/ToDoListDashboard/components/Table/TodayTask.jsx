import {Button, Checkbox, Table} from "flowbite-react";
import "../../styles/TodayTask.css"
import {useContext, useState} from "react";
import {TaskContext} from "../../../../contexts/TaskContext";
import {DeleteTaskModal} from "../Modal/DeleteTaskModal";
import { HiTrash, HiPencil } from "react-icons/hi";

export function TodayTask() {
    const currentDate = new Date();
    const { currentTasks } = useContext(TaskContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setOpenModal(true);
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
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {t.name}
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                        aria-label="Modifier"
                                        onClick={() => console.log('Edit task', t)}
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
                <DeleteTaskModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    task={selectedTask}
                />
            )}
        </div>
    );
}