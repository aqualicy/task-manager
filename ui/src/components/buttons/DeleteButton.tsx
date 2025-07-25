import React from 'react';
import {Task} from '../../models/Task';
import {useTaskManagerContext} from "../../contexts/TaskManagerContext";

const DeleteButton = ({ task }: { task: Task }) => {
    const { isModalOpen, setTasks, service } = useTaskManagerContext()

    const handleOnDelete = async (task: Task) => {
        try {
            await service.DeleteTask(task.id);
            const response = await service.GetTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button
            onClick={() => handleOnDelete(task)}
            disabled={isModalOpen}
        >
            Delete
        </button>
    );
};

export default DeleteButton;