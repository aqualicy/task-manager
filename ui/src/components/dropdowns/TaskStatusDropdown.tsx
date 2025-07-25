import React, {useState} from 'react';
import {Task, TaskStatus} from "../../models/Task";
import TaskManagerService from "../../services/task-manager-service";
import {useTaskManagerContext} from "../../contexts/TaskManagerContext";

function TaskStatusDropdown({ task }: { task: Task }) {
    const { setTasks } = useTaskManagerContext();
    const taskStatusList = Object.keys(TaskStatus).filter(
        (key) => isNaN(Number(key))
    );

    const [selectedValue, setSelectedValue] = useState(task.status || ''); // State to control dropdown visibility

    const updateTaskStatus = (status: string) => {
        const service = new TaskManagerService();
        service
            .UpdateTaskStatus(task.id, status)
            .then(() => service.GetTasks())
            .then((response) => {
                setTasks(response.data);
            })
            .finally(() => {
                setSelectedValue(status);
            })
            .catch((error) => {
                console.error('Error updating task status:', error);
                setSelectedValue(task.status?.toString() || '');
            })
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateTaskStatus(event.target.value);
    };

    return (
        <select value={selectedValue} onChange={(e) => handleChange(e)}>
            <option value="">Select an option</option>
            {taskStatusList.map((taskStatus) => (
                <option key={taskStatus} value={taskStatus}>
                    {taskStatus}
                </option>
            ))}
        </select>
    );
}

export default TaskStatusDropdown;