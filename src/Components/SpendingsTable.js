import React, {useState, useEffect} from "react";
import Table from '@mui/joy/Table';
import SpendingForm from "./SpendingForm";
import {Box} from "@mui/material";


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
            <h1 className={'app__container__heading'}>Przegląd miesięczny</h1>
            <Box sx={{
                height: 'calc(100% - 8rem)',
                display: 'flex',
                padding: '5rem',
                gap: '2rem',
                flexShrink: 1,
            }}>
                <div style={{
                    height: '100%',
                    padding: '3rem',
                    width: '70%',
                    overflow: 'scroll',
                    border: '1px solid lightgray',
                    borderRadius: '20px'
                }}>
                    <Table sx={{

                    }}>
                        <thead>
                        <tr>
                            <th>Kategoria</th>
                            <th>Opis</th>
                            <th>Kwota</th>
                            <th>Data</th>

                        </tr>
                        </thead>
                        <tbody>

                        {operations.map(({category, description, amount, date, id},) => (
                            <tr key={id}>
                                <td>{category}</td>
                                <td>{description}</td>
                                <td>{amount}</td>
                                <td>{date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <SpendingForm add={handleAdd}/>
            </Box>
        </>
    )

}

export default SpendingTable;
