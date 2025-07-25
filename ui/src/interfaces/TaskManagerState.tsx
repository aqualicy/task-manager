import {Task} from "../models/Task";
import TaskManagerService from "../services/task-manager-service";

export type HeaderColumn = {
    header: string;
    accessor: keyof Task | string;
};

export interface TaskManagerState {
    headerColumns: HeaderColumn[],
    isAddingTask: boolean,
    setIsAddingTask: (isAddingTask: boolean) => void,
    editingTask?: Task,
    setEditingTask: (editingTask: Task | undefined) => void,
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
    service: TaskManagerService;
}
