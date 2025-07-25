import React, {createContext, ReactNode, useContext, useState,} from 'react';
import {TaskManagerState} from "../interfaces/TaskManagerState";
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

  return (
    <TaskManagerContext.Provider
      value={{
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
