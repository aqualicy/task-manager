import React, {useEffect} from 'react';
import TaskManagerService from "../services/task-manager-service";
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import TableHeaders from "./TableHeaders";
import {Task} from "../models/Task";
import TableRow from "./TableRow";

const Table = () => {
    const { tasks, setTasks } = useTaskManagerContext();

    /**
     * Get Tasks
     *
     * @returns {void}
     */
    const getTasks = (): void => {
        const service = new TaskManagerService();
        // setLoading(true);
        service
            .GetTasks()
            .then((response) => {
                console.log(response);
                setTasks(response.data);
                // setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    };

    /**
     * Fetches and processes decision data using the `id` from the URL.
     * @returns {Promise<void>} - A promise that resolves when the data fetching and processing are complete.
     */
    const fetchData = async () => {
        // const searchParams = new URLSearchParams(window.location.search);
        // const id = searchParams.get('id');
        if (!tasks || tasks.length === 0) {
            getTasks();
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [fetchData]);

    return (
        <div>
            <table style={{ borderSpacing: '1rem' }}>
                <thead>
                <TableHeaders />
                </thead>
                <tbody>
                {tasks?.map((task: Task) => (
                    <TableRow task={task} key={task.id}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;