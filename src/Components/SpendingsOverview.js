import React, {useState, useEffect, useContext} from "react";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";
import {Box} from "@mui/material";
import dayjs from "dayjs";
import MonthlyBalanceOverview from "./MonthlyBalanceOverview";
import {ProgressBar} from "react-loader-spinner";
import variables from '../scss/settings/_variables.scss'
import {AppContext} from "../context/AppProvider";

import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import AppSidebar from "./AppSidebar";

const {colorPrimary} = variables

export const URL = "http://localhost:3005/operations";

const SpendingsOverview = () => {

// APP PROVIDER
    const {
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        currentMonthString,
        setCurrentMonthString,
        nextMonth,
        prevMonth
    } = useContext(AppContext);

    const [loading, setLoading] = useState(false);


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
            <SpendingsOverviewHeader nextMonth={nextMonth} prevMonth={prevMonth} currentMonthString={currentMonthString}
                                     currentYear={currentYear} setCurrentMonth={setCurrentMonth}/>
            <Box sx={{
                height: 'calc(100% - 8rem)',
                display: 'flex',
                padding: '2rem',
                gap: '2rem',
                flexShrink: 1,
            }}>
                <SpendingForm add={handleAdd}/>
                <div style={{
                    height: '100%',

                    width: '70%',
                    // border: '1px solid lightgray',
                    // borderRadius: '20px',
                }}>
                    {loading ?
                        < >
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
export default SpendingsOverview


