import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";

export function TaskDetailsModal({ task, open, onClose }) {
    return (
        <Modal className="bg-transparent" show={open} onClose={onClose} size="md" position="center">
            <Modal.Header>Détails de la tâche</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {task.name}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400 whitespace-pre-line break-words">
                        {task.description || "Pas de description disponible"}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        Date : {new Date(task.date).toLocaleDateString()}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
}
