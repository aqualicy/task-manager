import React from 'react';
import {Task} from '../../models/Task';
import TaskManagerService from "../../services/task-manager-service";
import {useTaskManagerContext} from "../../contexts/TaskManagerContext";

const EditButton = ({ task }: { task: Task }) => {
    const { isModalOpen, setIsEditingTask, setIsModalOpen, setTasks } = useTaskManagerContext()

    const updateTask = (task: Task) => {
        const service = new TaskManagerService();
        service
            .UpdateTask(task)
            .then(() => service.GetTasks())
            .then((response) => {
                setTasks(response.data);
            })
            .finally(() => {
                setIsModalOpen(false);
                setIsEditingTask(false);
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            })
    };

    const handleOnEdit = (task: Task) => {
        setIsEditingTask(true);
        setIsModalOpen(true);
        // updateTask(task);
    }

    return (
        <button
            onClick={() => handleOnEdit(task)}
            disabled={isModalOpen}
        >
            Edit
        </button>
    );
};

export default EditButton;