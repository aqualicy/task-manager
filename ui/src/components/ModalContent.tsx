import React, {useState} from 'react';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import {Task, TaskStatus} from "../models/Task";

export default function ModalContent({task, setNewTask}: { task: Task, setNewTask: (task: Task) => void }) {
    const {
        editingTask,
    } = useTaskManagerContext();

    const taskStatusList = Object.keys(TaskStatus).filter(
        (key) => isNaN(Number(key))
    );

    const [title, setTitle] = useState(editingTask?.title || task.title || '');
    const [description, setDescription] = useState(editingTask?.description || task.description || '');
    const [status, setStatus] = useState(editingTask?.status || task.status || '');

    // const updateTask = (task: Task) => {
    //     const service = new TaskManagerService();
    //     service
    //         .UpdateTask(task)
    //         .then(() => service.GetTasks())
    //         .then((response) => {
    //             setTasks(response.data);
    //         })
    //         .finally(() => {
    //             setIsModalOpen(false);
    //             setIsEditingTask(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error updating task:', error);
    //         })
    // };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setNewTask({
            id: editingTask?.id || '0',
            title: event.target.value,
            description,
            status: TaskStatus[status as unknown as keyof typeof TaskStatus]
        })
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        setNewTask({
            id: editingTask?.id || '0',
            title,
            description: event.target.value,
            status: TaskStatus[status as unknown as keyof typeof TaskStatus]
        })
    };
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
        setNewTask({
            id: editingTask?.id || '0',
            title,
            description,
            status: TaskStatus[event.target.value as unknown as keyof typeof TaskStatus]

        })
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%'}}>
            <div className="modal-content-child">
                <label htmlFor="Title">Title</label>
                <input
                    id="Title"
                    title="Title"
                    style={{width: '60%'}}
                    value={title}
                    onChange={(e) => handleTitleChange(e)}
                />
            </div>
            <div className="modal-content-child">
                <label htmlFor="Description">Description</label>
                <input
                    id="Description"
                    title="Description"
                    style={{width: '60%'}}
                    value={description}
                    onChange={(e) => handleDescriptionChange(e)}
                />
            </div>
            <div className="modal-content-child">
                <label htmlFor="Status">Status</label>
                <select id="Status" value={status} onChange={(e) => handleStatusChange(e)}>
                    <option value="">Select an option</option>
                    {taskStatusList.map((taskStatus) => (
                        <option key={taskStatus} value={taskStatus}>
                            {taskStatus}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
