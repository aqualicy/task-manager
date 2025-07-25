import React from 'react';
import {Task, TaskStatus} from "../../models/Task";
import {useTaskManagerContext} from "../../contexts/TaskManagerContext";

function TaskStatusDropdown({ task }: { task: Task }) {
    const { setTasks, service } = useTaskManagerContext();
    const taskStatusList = Object.keys(TaskStatus).filter(
        (key) => isNaN(Number(key))
    );

    const updateTaskStatus = (status: string) => {
        service
            .UpdateTaskStatus(task.id, status)
            .then(() => service.GetTasks())
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error updating task status:', error);
            })
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateTaskStatus(event.target.value);
    };

    return (
        <select value={task.status || ''} onChange={(e) => handleChange(e)}>
            {!task.status && <option value="">Select an option</option>}
            {taskStatusList.map((taskStatus) => (
                <option key={taskStatus} value={taskStatus}>
                    {taskStatus}
                </option>
            ))}
        </select>
    );
}

export default TaskStatusDropdown;