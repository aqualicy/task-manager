import {Task} from "../models/Task";

export type HeaderColumn = {
    header: string;
    accessor: keyof Task | string;
};

export interface TaskManagerState {
    headerColumns: HeaderColumn[],
    isAddingTask: boolean,
    setIsAddingTask: (isAddingTask: boolean) => void,
    isEditingTask: boolean,
    setIsEditingTask: (isEditingTask: boolean) => void,
    isModalOpen: boolean,
    setIsModalOpen: (isModalOpen: boolean) => void,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
}
