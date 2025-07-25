import React, {createContext, ReactNode, useContext, useState,} from 'react';
import {HeaderColumn, TaskManagerState} from "../interfaces/TaskManagerState";
import {Task} from "../models/Task";

const TaskManagerContext = createContext<TaskManagerState | undefined>(
    undefined,
);

export const TaskManagerProvider = ({
                                        children,
                                    }: {
    children: ReactNode;
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [isEditingTask, setIsEditingTask] = useState(false);

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
                isEditingTask,
                setIsEditingTask,
                isModalOpen,
                setIsModalOpen,
                tasks,
                setTasks,
            }}
        >
            {children}
        </TaskManagerContext.Provider>
    );
};

export const useTaskManagerContext = (): TaskManagerState => {
    return useContext(TaskManagerContext) as TaskManagerState;
};
