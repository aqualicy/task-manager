import React from 'react';
import {Task} from '../models/Task';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";

const TableRow = ({ task }: { task: Task }) => {
    const { headerColumns } = useTaskManagerContext()

    const columnMapper = (task: Task, accessor: keyof Task | string) => {
        switch (accessor){
            case 'edit':
                return <EditButton task={task} />;
            case 'delete':
                return <DeleteButton task={task} />
            default:
                return task[accessor as keyof Task] || '';
        }
    };

    return (
        <tr>
            {headerColumns.map((column) => (
                <td key={column.accessor}>
                    {columnMapper(task, column.accessor)}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;