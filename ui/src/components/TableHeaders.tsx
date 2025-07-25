import React from 'react';
import {useTaskManagerContext} from "../contexts/TaskManagerContext";

const TableHeaders = () => {
    const { headerColumns } = useTaskManagerContext();

    return (
        <tr>
            {headerColumns.map((column: any) => (
                <th key={column.accessor}>
                    {column.header}
                </th>
            ))}
        </tr>
    );
};

export default TableHeaders;