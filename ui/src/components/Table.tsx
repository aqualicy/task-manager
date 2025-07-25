import React, {useEffect} from 'react';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import TableHeaders from "./TableHeaders";
import {Task} from "../models/Task";
import TableRow from "./TableRow";

const Table = () => {
    const {tasks, setTasks, service} = useTaskManagerContext();
    /**
     * Get Tasks
     *
     * @returns {void}
     */
    const getTasks = (): void => {
        service
            .GetTasks()
            .then((response) => {
                console.log(response);
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!tasks || tasks.length === 0) {
                getTasks();
            }
        };

        fetchData().then();
    }, []);

    return (
        <div>
            {tasks.length > 0 ? (
                <table style={{borderSpacing: '1rem'}}>
                    <thead>
                    <TableHeaders/>
                    </thead>
                    <tbody>
                    {tasks?.map((task: Task) => (
                        <TableRow task={task} key={task.id}/>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>
                    <i>These are not the tasks you are looking for.</i>
                    <br/><br/>
                    Please add a task to get started.
                </p>
            )}
        </div>
    );
};

export default Table;