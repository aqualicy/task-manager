import {Task} from "../models/Task";

export interface TaskManagerState {
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
}
