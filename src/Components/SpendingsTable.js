import React from "react";
import Table from '@mui/joy/Table';


const SpendingTable = ({operations}) => {
    return (
    <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
        <thead>
        <tr>
            <th>Column width (40%)</th>
            <th>amount</th>
            <th>date</th>

        </tr>
        </thead>
        <tbody>
        {operations.map((operation) => (
            <tr key={operation.type}>
                <td>{operation.type}</td>
                <td>{operation.amount}</td>
                <td>{operation.date}</td>
            </tr>
        ))}
        </tbody>
    </Table>

    )

}

export default SpendingTable;
