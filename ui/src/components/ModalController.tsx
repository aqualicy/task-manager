import React, {useState} from 'react';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import {Task} from "../models/Task";
import TaskManagerService from "../services/task-manager-service";

export default function ModalController() {
    const {
        isAddingTask,
        setIsAddingTask,
        editingTask,
        setEditingTask,
        isModalOpen,
        setIsModalOpen,
        setTasks,
    } = useTaskManagerContext();
    const [newTask, setNewTask] = useState<Task>(new Task);

    const handleCloseModal = () => {
        setIsAddingTask(false);
        setEditingTask(undefined);
        setIsModalOpen(false);
        setNewTask(new Task)
    };

    const updateTask = (task: Task) => {

    };

    const handleOnClick = () => {
        if (isAddingTask) {
            const service = new TaskManagerService();
            service
                .AddTask(newTask)
                .then(() => service.GetTasks())
                .then((response) => {
                    setTasks(response.data);
                })
                .finally(() => {
                    handleCloseModal();
                })
                .catch((error) => {
                    console.error('Error adding task:', error);
                });
        } else if (editingTask) {
            const service = new TaskManagerService();
            service
                .UpdateTask(newTask)
                .then(() => service.GetTasks())
                .then((response) => {
                    setTasks(response.data);
                })
                .finally(() => {
                    handleCloseModal();
                })
                .catch((error) => {
                    console.error('Error updating task:', error);
                });
        }
    }

    return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2>
                {isAddingTask && 'Add Task'}
                {editingTask && 'Edit Task'}
            </h2>
            {isAddingTask && <ModalContent task={newTask} setNewTask={setNewTask}/>}
            {editingTask && <ModalContent task={newTask} setNewTask={setNewTask}/>}
            <div>
                <button onClick={handleCloseModal}>Cancel</button>
                <button
                    onClick={handleOnClick}
                    disabled={!newTask.id && !newTask.title}
                >
                    {isAddingTask && 'Add'}
                    {editingTask && 'Save'}
                </button>
            </div>
        </Modal>
    );
}
