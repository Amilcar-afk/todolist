import { Checkbox, Table } from "flowbite-react";
import "../../styles/TodayTask.css"
import {useState} from "react";

export function TodayTask() {
    const [task, setTask] = useState([]);
    const getDate = new Date();


    return (
        <div className="overflow-x-auto today-task-container">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell colspan="3">Aujourd'hui  {getDate.getDate() + '/' + getDate.getMonth() + '/' + getDate.getFullYear()}</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Apple MacBook Pro 17"'}
                        </Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Microsoft Surface Pro
                        </Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
                        <Table.Cell>
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                Edit
                            </a>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}