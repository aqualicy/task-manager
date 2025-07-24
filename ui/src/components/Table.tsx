import React from 'react';

// @ts-ignore
const Table = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    {columns.map((column: any, index: any) => (
                        <th
                            key={index}
                            className="py-3 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                        >
                            {column.Header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row: any, rowIndex: any) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                        {columns.map((column: any, colIndex: any) => (
                            <td
                                key={colIndex}
                                className="py-3 px-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-200"
                            >
                                {row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;