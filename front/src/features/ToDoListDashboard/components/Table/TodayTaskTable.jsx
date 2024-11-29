import {Checkbox, Table} from "flowbite-react";
import "../../styles/TodayTask.css"
import {useContext, useState} from "react";
import {TaskContext} from "../../../../contexts/TaskContext";
import {DeleteTaskModal} from "../Modal/DeleteTaskModal";
import { HiTrash, HiPencil } from "react-icons/hi";
import { EditTaskFormModal } from "../Modal/EditTaskFormModal";
import {TaskDetailsModal} from "../Modal/TaskDetailsModal";

export function TodayTaskTable() {
    const currentDate = new Date();
    const { currentTasks, setCurrentTasks, editTask } = useContext(TaskContext);
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

    const handleCheckboxChange = async (taskId, checked) => {
        setCurrentTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, checked: checked } : task
            )
        );

        try {
            const request = await editTask(taskId, {"checked": checked});
        } catch (error) {
            console.error("Erreur lors de la modification de la tâche", error);
        } finally {
            //setIsSubmitting(false);
        }
    };

    return (
        <div className="overflow-x-auto today-task-container dark:bg-gray-800">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colSpan="4">Aujourd'hui  {currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()}</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {Array.isArray(currentTasks) && currentTasks.length > 0 ? (
                        currentTasks.map((t, index) => (
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
                <EditTaskFormModal
                    openModal={openEditModal}
                    setOpenModal={setOpenEditModal}
                    task={selectedTask}
                />
            )}
        </div>
    );
}