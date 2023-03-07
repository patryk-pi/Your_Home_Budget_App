import React, {useState, useEffect, useContext} from "react";
import dayjs from "dayjs";

import GoalSetForm from "./GoalSetForm";
import {categoriesURL} from "./SpendingForm";
import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import {AppContext} from "../context/AppProvider";


const GoalsSetter = () => {

    // CATEGORY GOALS
    const goalsURL = 'http://localhost:3005/goals';

    // STATES
    const [goals, setGoals] = useState([]);
    const [date, setDate] = useState(dayjs(new Date()));
    const [categories, setCategories] = useState([]);


    const {currentMonth, setCurrentMonth, currentYear, setCurrentYear, currentMonthString, setCurrentMonthString, nextMonth, prevMonth} = useContext(AppContext)

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


    useEffect(() => {
        fetch(goalsURL)
            .then(r => r.json())
            .then(data => {
                setGoals(data);
                console.log(data)
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        fetch(categoriesURL)
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, []);


    // FUNCTION CREATING AN OBJECT WITH THE GOAL FOR THE SELECTED MONTH AND CATEGORY
    const handleAdd = (goal) => {

        const index = goals.findIndex(obj => obj.monthAndYear === goal.monthAndYear && obj.category === goal.category);
        if (index === -1) {
            fetch(goalsURL, {
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
            fetch(`${goalsURL}/${goals[index].id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(goal),
            })
                .then(data => setGoals(prev => [...prev, data]))
                .catch((err) => console.log(err));
        }
    };




    return (
<>
    <SpendingsOverviewHeader nextMonth={nextMonth} prevMonth={prevMonth} currentMonthString={currentMonthString}
                             currentYear={currentYear} setCurrentMonth={setCurrentMonth}/>
    <div style={{
        width: '50%',
        padding: '3rem'
    }}>
        {categories.map((cat, id) => {
            return (
                <GoalSetForm add={handleAdd}>
                    <h1>{cat.description}</h1>
                </GoalSetForm>
            )
            })}
    </div>
</>
    )

}

export default GoalsSetter