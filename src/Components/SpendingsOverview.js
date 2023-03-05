import React, {useState, useEffect} from "react";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";
import {Box} from "@mui/material";
import dayjs from "dayjs";
import MonthlyBalanceOverview from "./MonthlyBalanceOverview";
import {ProgressBar} from "react-loader-spinner";
import variables from '../scss/settings/_variables.scss'

const {colorPrimary} = variables

export const URL = "http://localhost:3005/operations";

const SpendingsOverview = () => {

    // States needed for displaying filtered table with operations
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(false)

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

    // Function filtering operations by month

    const filterOperationsByMonth = operation => {
        const operationMonth = dayjs(operation.date, 'DD/MM/YYYY').month();
        const operationYear = dayjs(operation.date, 'DD/MM/YYYY').year();
        return operationMonth === currentMonth && operationYear === currentYear
    }


    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => {
                const filteredData = data.filter(operation => filterOperationsByMonth(operation));
                setOperations(filteredData);
                setLoading(true)
            })
            .catch(err => console.log(err))
    }, [currentMonth]);


    return (
        <>
            <h1 className={'app__container__heading'}>{currentMonth} {currentYear}
            </h1>
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
                    borderRadius: '20px',
                }}>
                    {loading ?
                        <>
                            <MonthlyBalanceOverview operations={operations} filterOperations={filterOperationsByMonth}/>
                            <SpendingsTable operations={operations} filterOperations={filterOperationsByMonth}
                                            currentMonth={currentMonth}/>
                        </> :
                        <div style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ProgressBar
                                height="180"
                                width="180"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor={colorPrimary}
                                barColor='#ddd'


                            />
                        </div>
                    }

                </div>

            </Box>
        </>
    )

}

export default SpendingsOverview;
