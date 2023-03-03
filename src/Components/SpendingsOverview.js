import React, {useState, useEffect} from "react";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";
import {Box} from "@mui/material";
import dayjs from "dayjs";


export const URL = "http://localhost:3005/operations";

const SpendingsOverview = () => {

const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    const [operations, setOperations] = useState([]);

    const handleAdd = operation => {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(operation)
        })
            .then(r => {
                return r.json();
            })
            .then(data => setOperations(prev => [...prev, data]))
            .catch(err => console.log(err))
    }



    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => {
                const filteredData = data.filter(operation => {
                    const operationMonth = dayjs(operation.date, 'DD/MM/YYYY').month();
                    console.log(operation.date)
                    console.log(operationMonth)
                    return operationMonth === currentMonth;
                });
                setOperations(filteredData)
            })
            .catch(err => console.log(err))
    }, [currentMonth]);





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
                <SpendingForm add={handleAdd}/>
                <div style={{
                    height: '100%',
                    padding: '3rem',
                    width: '70%',
                    overflow: 'scroll',
                    border: '1px solid lightgray',
                    borderRadius: '20px'
                }}>
                    <SpendingsTable operations={operations} currentMonth={currentMonth}/>
                </div>

            </Box>
        </>
    )

}

export default SpendingsOverview;
