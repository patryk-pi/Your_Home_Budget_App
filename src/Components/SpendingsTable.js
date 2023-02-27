import React, {useState, useEffect} from "react";
import Table from '@mui/joy/Table';

export const URL = "http://localhost:3005/operations";

const SpendingTable = () => {

    const [operations, setOperations] = useState([]);

    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => setOperations(data))
            .catch(err => console.log(err))
    }, [])

    return (

            <Table sx={{'& thead th:nth-child(1)': {width: '20%'}}}>
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
