import React from 'react';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import Modal from "./Modal";

export default function ModalController() {
    const {
        isAddingTask,
        setIsAddingTask,
        isEditingTask,
        setIsEditingTask,
        isModalOpen,
        setIsModalOpen
    } = useTaskManagerContext();

    const handleCloseModal = () => {
        setIsAddingTask(false);
        setIsEditingTask(false);
        setIsModalOpen(false);
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2>Create Task</h2>
            {isAddingTask && <p>Adding a new task...</p>}
            {isEditingTask && <p>Editing a task...</p>}
            <div>
                <button onClick={handleCloseModal}>Cancel</button>
                <button onClick={handleCloseModal}>
                    {isAddingTask && 'Add'}
                    {isEditingTask && 'Save'}
                </button>
            </div>
        </Modal>
    );
}
