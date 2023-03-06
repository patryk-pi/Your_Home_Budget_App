import React, {useState, useEffect} from "react";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";
import {Box, IconButton} from "@mui/material";
import dayjs from "dayjs";
import MonthlyBalanceOverview from "./MonthlyBalanceOverview";
import {ProgressBar} from "react-loader-spinner";
import variables from '../scss/settings/_variables.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import AppSidebar from "./AppSidebar";


const {colorPrimary} = variables

export const URL = "http://localhost:3005/operations";

const SpendingsOverview = () => {

    // States needed for displaying filtered table with operations
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(false)

    const [currentMonthString, setCurrentMonthString] = useState('')

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

    const nextMonth = () => {
        setCurrentMonth(prev => {
            return prev + 1 > 11 ? 0 : prev + 1
        })

        if (currentMonth > 10) {
            setCurrentYear(prev => prev + 1)
        }
        console.log(currentYear)
    }

    const prevMonth = () => {
        setCurrentMonth(prev => {
            return prev - 1 < 0 ? 11 : prev - 1
        })

        if (currentMonth < 1) {
            setCurrentYear(prev => prev - 1)
        }
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


    useEffect(() => {
        switch (currentMonth) {
            case 0:
                setCurrentMonthString('Styczeń');
                break;
            case 1:
                setCurrentMonthString('Luty');
                break;
            case 2:
                setCurrentMonthString('Marzec');
                break;
            case 3:
                setCurrentMonthString('Kwiecień');
                break;
            case 4:
                setCurrentMonthString('Maj');
                break;
            case 5:
                setCurrentMonthString('Czerwiec');
                break;
            case 6:
                setCurrentMonthString('Lipiec');
                break;
            case 7:
                setCurrentMonthString('Sierpień');
                break;
            case 8:
                setCurrentMonthString('Wrzesień');
                break;
            case 9:
                setCurrentMonthString('Październik');
                break;
            case 10:
                setCurrentMonthString('Listopad');
                break;
            case 11:
                setCurrentMonthString('Grudzień');
                break;
            default:
                setCurrentMonthString('');
                break;
        }
    }, [currentMonth]);


    return (
        <>
            <SpendingsOverviewHeader nextMonth={nextMonth} prevMonth={prevMonth} currentMonthString={currentMonthString} currentYear={currentYear} />
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

export default SpendingsOverview;
