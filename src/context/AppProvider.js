import React, {useEffect, useState, useContext, createContext} from "react";
import dayjs from "dayjs";
import {URL} from "../Components/SpendingsOverview";

export const AppContext = createContext(null)

const AppProvider = ({children}) => {

    const [currentMonthString, setCurrentMonthString] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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

    const nextMonth = () => {
        setCurrentMonth(prev => {
            return prev + 1 > 11 ? 0 : prev + 1
        })

        if (currentMonth + 1 > 11) {
            setCurrentYear(prev => prev + 1)
        }
    }

    const prevMonth = () => {
        setCurrentMonth(prev => {
            return prev - 1 < 0 ? 11 : prev - 1
        })

        if (currentMonth - 1 < 0) {
            setCurrentYear(prev => prev - 1)
        }
    }


    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => {
                setOperations(data);
                setLoading(true)
            })
            .catch(err => console.log(err))
    }, []);


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
        <AppContext.Provider value={{currentMonth, currentMonthString, setCurrentMonthString, currentYear, setCurrentYear,  setCurrentMonth, nextMonth, prevMonth, loading, setLoading, operations, setOperations,handleAdd, filterOperationsByMonth}}>{children}</AppContext.Provider>
    )
}

export default AppProvider