import React, {useEffect, useState, useContext, createContext} from "react";
import dayjs from "dayjs";
import {URL} from "../Components/SpendingsOverview";
import {categoriesURL} from "../Components/SpendingForm";

export const AppContext = createContext(null)

const AppProvider = ({children}) => {

    // DATABASE URLs

    const goalURL = 'http://localhost:3005/goals';



    // DATES STATES
    const [currentMonthString, setCurrentMonthString] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // STATE FOR FETCHING DATA
    const [loadingOperations, setLoadingOperations] = useState(false);
    const [loadingGoals, setLoadingGoals] = useState(false);

    // OPERATIONS TABLE
    const [operations, setOperations] = useState([]);

    // GOALS TABLE
    const [goals, setGoals] = useState([]);

    // CATEGORIES

    const [categories, setCategories] = useState([]);

    // FUNCTION ADDING NEW OPERATIONS TO A DATA BASE THROUGH REST API
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

    const handleAddGoal = goal => {
        const index = goals.findIndex(obj => obj.monthAndYear === goal.monthAndYear && obj.category === goal.category);
        if (index === -1) {
            fetch(goalURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(goal),
            })
                .then((r) => {
                    return r.json();
                })
                .then((data) => setGoals((prev) => [...prev, data]))
                .catch((err) => console.log(err));
        } else {
            fetch(`${goalURL}/${goals[index].id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(goal),
            })
                .then(r => r.json())
                .then(data => setGoals(prev => prev.map(obj => {
                    if (obj.id === data.id) {
                        return data;
                    } else {
                        return obj;
                    }
                })))
                .catch((err) => console.log(err));
        }
    };


    // FUNCTION FILTERING OPERATIONS BY MONTH
    const filterOperationsByMonth = operation => {
        const operationMonth = dayjs(operation.date, 'DD/MM/YYYY').month();
        const operationYear = dayjs(operation.date, 'DD/MM/YYYY').year();
        return operationMonth === currentMonth && operationYear === currentYear
    }

    const filterGoalsByMonth = goal => {
        const operationMonth = dayjs(goal.monthAndYear, 'MM/YYYY').month();
        const operationYear = dayjs(goal.monthAndYear, 'MM/YYYY').year();
        return operationMonth === currentMonth && operationYear === currentYear
    }

    // HANDLER FUNCTIONS FOR NEXT AND PREVIOUS MONTH BUTTONS
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


    // FETCH OPERATIONS FROM DATA BASE
    useEffect(() => {
        fetch(URL)
            .then(r => r.json())
            .then(data => {
                setOperations(data);
                setLoadingOperations(true)
            })
            .catch(err => console.log(err))
    }, []);

    // FETCH GOALS FROM DATA BASE
    useEffect(() => {
        fetch(goalURL)
            .then(r => r.json())
            .then(data => {
                setGoals(data);
                setLoadingGoals(true)
            })
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        fetch(categoriesURL)
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, []);


    // SET CURRENT MONTH TO STRING FOR UI
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
        <AppContext.Provider value={{currentMonth, currentMonthString, setCurrentMonthString, currentYear, setCurrentYear,  setCurrentMonth, nextMonth, prevMonth, loadingGoals, setLoadingGoals, loadingOperations, setLoadingOperations, operations, setOperations,handleAdd, filterOperationsByMonth, filterGoalsByMonth, goals, setGoals, categories, setCategories, handleAddGoal}}>{children}</AppContext.Provider>
    )
}

export default AppProvider