import React, {useState, useEffect, useContext} from "react";
import dayjs from "dayjs";

import GoalSetForm from "./GoalSetForm";
import {categoriesURL} from "./SpendingForm";
import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import {AppContext} from "../context/AppProvider";
import {Box} from '@mui/material'


const GoalsSetter = () => {

    // CATEGORY GOALS
    const goalsURL = 'http://localhost:3005/goals';

    // STATES
    const [goals, setGoals] = useState([]);
    const [date, setDate] = useState(dayjs(new Date()));
    const [categories, setCategories] = useState([]);


    const {currentMonth, setCurrentMonth, currentYear, setCurrentYear, currentMonthString, setCurrentMonthString, nextMonth, prevMonth} = useContext(AppContext)




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
    <Box sx={{
        height: 'calc(100% - 8rem)',
        display: 'flex',
        padding: '2rem',
        gap: '2rem',
        flexShrink: 1,
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
            border: '1px solid lightgray',
            overflow: 'scroll',
           height: '100%',
            borderRadius: '20px',
            padding: '1rem'

        }}>
        {categories.map((cat, id) => {
            return (
                <GoalSetForm key={id} add={handleAdd}>
                    <h1>{cat.description}</h1>
                </GoalSetForm>
            )
            })}
        </Box>
    </Box>
</>
    )

}

export default GoalsSetter