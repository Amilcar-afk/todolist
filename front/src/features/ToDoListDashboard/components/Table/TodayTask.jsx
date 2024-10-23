import { Checkbox, Table } from "flowbite-react";
import "../../styles/TodayTask.css"
import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../../../../contexts/TaskContext";
import {NewTaskForm} from "../Modal/NewTaskForm";

export function TodayTask() {
    const currentDate = new Date();
    const { currentTasks } = useContext(TaskContext);

    return (
        <div className="overflow-x-auto today-task-container">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colSpan="3">Aujourd'hui  {currentDate.getDate() + '/' + currentDate.getMonth() + '/' + currentDate.getFullYear()}</Table.HeadCell>
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
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
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
        </div>
    );
}