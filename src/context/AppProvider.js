import React, {useEffect, useState, useContext, createContext} from "react";

export const AppContext = createContext(null)

const AppProvider = ({children}) => {

    const [currentMonthString, setCurrentMonthString] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

    return (
        <AppContext.Provider value={{currentMonth, currentMonthString, setCurrentMonthString, currentYear, setCurrentYear,  setCurrentMonth, nextMonth, prevMonth}}>{children}</AppContext.Provider>
    )
}

export default AppProvider