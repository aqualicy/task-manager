import React, {createContext, ReactNode, useContext, useState,} from 'react';
import {HeaderColumn, TaskManagerState} from "../interfaces/TaskManagerState";
import {Task} from "../models/Task";
import TaskManagerService from "../services/task-manager-service";

const TaskManagerContext = createContext<TaskManagerState | undefined>(
    undefined,
);

export const TaskManagerProvider = ({
                                        service,
                                        children,
                                    }: {
    children: ReactNode;
    service: TaskManagerService;
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

    // TODO: Fetch static headers from BE config
    const headerColumns: HeaderColumn[] = [
        {header: '', accessor: 'edit'},
        {header: 'Title', accessor: 'title'},
        {header: 'Description', accessor: 'description'},
        {header: 'Status', accessor: 'status'},
        {header: '', accessor: 'delete'},
    ];

    return (
        <TaskManagerContext.Provider
            value={{
                headerColumns,
                isAddingTask,
                setIsAddingTask,
                editingTask,
                setEditingTask,
                isModalOpen,
                setIsModalOpen,
                tasks,
                setTasks,
                service,
            }}
        >
            {children}
        </TaskManagerContext.Provider>
    );
};

export const useTaskManagerContext = (): TaskManagerState => {
    return useContext(TaskManagerContext) as TaskManagerState;
};
