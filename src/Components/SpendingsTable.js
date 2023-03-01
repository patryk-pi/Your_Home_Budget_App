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


    if (!operations.length) {
        return (
            <>
                <h1>W tym miesiącu nie było żadnych operacji :( </h1>
                <SpendingForm add={handleAdd}/>
            </>
        )
    }


    return (
<>
        <Table >
            <thead>
            <tr>
                <th>Kategoria</th>
                <th>Opis</th>
                <th>Kwota</th>
                <th>Data</th>

            </tr>
            </thead>
            <tbody>

            {operations.map(({category, description, amount, date, id}, ) => (
                <tr key={id}>
                    <td>{category}</td>
                    <td>{description}</td>
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
