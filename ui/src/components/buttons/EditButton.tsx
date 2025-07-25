import React from 'react';
import {Task} from '../../models/Task';
import TaskManagerService from "../../services/task-manager-service";
import {useTaskManagerContext} from "../../contexts/TaskManagerContext";

const EditButton = ({ task }: { task: Task }) => {
    const { isModalOpen, setEditingTask, setIsModalOpen } = useTaskManagerContext()

    const handleOnEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
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