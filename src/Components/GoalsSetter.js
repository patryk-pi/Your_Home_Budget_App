import React, {useState, useEffect} from "react";
import dayjs from "dayjs";

import GoalSetForm from "./GoalSetForm";

const GoalsSetter = () => {

    // CATEGORY GOALS
    const goalsURL = 'http://localhost:3005/goals';

    // STATES
    const [goals, setGoals] = useState([]);
    const [date, setDate] = useState(dayjs(new Date()));


    useEffect(() => {
        fetch(goalsURL)
            .then(r => r.json())
            .then(data => {
                setGoals(data);
                console.log(data)
            })
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
        <GoalSetForm add={handleAdd}/>
    )

}

export default GoalsSetter