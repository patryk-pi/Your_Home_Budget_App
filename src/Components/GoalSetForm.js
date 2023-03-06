import React, {useState, useEffect} from "react";
import {Button} from "@mui/material";

const GoalSetForm = ({add}) => {

    const [monthAndYear, setMonthAndYear] = useState('05/2022');
    const [category, setCategory] = useState(  "jedzenie")
    const [goal, setGoal] = useState(2300)

    const [categoryAndGoal, setCategoryAndGoal] = useState({
        monthAndYear,
        category,
        goal
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategoryAndGoal({
            monthAndYear,
            category,
            goal

        })
        add(categoryAndGoal)
    }

    return (
        <Button onClick={handleSubmit}>Dodaj</Button>
    )

}

export default GoalSetForm