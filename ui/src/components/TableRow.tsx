import React from 'react';
import { Task } from '../models/Task';

type HeaderColumn = {
    header: string;
    accessor?: keyof Task;
};

const TableRow = ({ task }: { task: Task }) => {
    // TODO: Fetch static headers from BE config
    const headerColumns: HeaderColumn[] = [
        { header: 'Title', accessor: 'title' },
        { header: 'Description', accessor: 'description' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', accessor: undefined },
    ];

    return (
        <tr>
            {headerColumns.map((column) => (
                <td key={column.header}>
                    {column.accessor ? task[column.accessor] : '[action buttons]'}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;