import React, {useEffect, useState} from 'react';
import {Task} from "../models/Task";
import TaskManagerService from "../services/task-manager-service";

const TableHeaders = () => {
    // TODO: Fetch static headers from BE config
    const headerColumns = [
        {header: 'Title', accessor: 'title'},
        {header: 'Description', accessor: 'description'},
        {header: 'Status', accessor: 'status'},
        {header: 'Actions'},
    ];

    return (
        <tr>
            {headerColumns.map((column: any) => (
                <th key={column.header}>
                    {column.header}
                </th>
            ))}
        </tr>
    );
};

export default TableHeaders;