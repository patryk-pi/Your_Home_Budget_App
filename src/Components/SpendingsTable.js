import React, {useState, useEffect} from "react";
import Table from '@mui/joy/Table';
import SpendingForm from "./SpendingForm";

export const URL = "http://localhost:3005/operations";

const SpendingTable = () => {

    const [operations, setOperations] = useState([]);

    const handleAdd = operation => {
        console.log(operation)
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(operation)
        })
            .then(r => {
                console.log(r);
                return r.json();
            })
            .then(data => setOperations(prev => [...prev, data]))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => setOperations(data))
            .catch(err => console.log(err))
    }, []);



    return (
<>
        <Table >
            <thead>
            <tr>
                <th>Column width (40%)</th>
                <th>amount</th>
                <th>date</th>

            </tr>
            </thead>
            <tbody>
            {operations.map(({type, amount, date}, i) => (
                <tr key={i}>
                    <td>{type}</td>
                    <td>{amount}</td>
                    <td>{date}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    <SpendingForm add={handleAdd}/>
    </>
    )

}

export default SpendingTable;
