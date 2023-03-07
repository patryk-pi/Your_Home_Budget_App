import React, {useState, useEffect} from "react";
import {Button, FormControl, TextField} from "@mui/material";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import nextMonth from './SpendingsOverview'

const GoalSetForm = ({add, children}) => {

    const [monthAndYear, setMonthAndYear] = useState(dayjs(new Date()).format("MM/YYYY"));
    const [category, setCategory] = useState("czynsz")
    const [goal, setGoal] = useState(2300);
    console.log(monthAndYear)

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
        <>

            <form style={{
                width: '100%',
                padding: '2rem 2rem 0'
            }}>

                <FormControl
                    fullWidth={true}
                    sx={{
                        width: '100%',
                    }}>
                    {children}
                    <NumericFormat
                        customInput={TextField}
                        label={"Kwota"}
                        type={"text"}
                        decimalScale={2}
                        allowedDecimalSeparators={[',','.']}
                        InputProps={{inputProps: {min: 0}}} onChange={(e) => {
                        const value = +(e.target.value);
                        console.log(value)
                        }}  >
                    </NumericFormat>
                    <Button onClick={handleSubmit}>Dodaj</Button>
                </FormControl>

            </form>


        </>
    )

}

export default GoalSetForm