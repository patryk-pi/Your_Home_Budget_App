import React, { useState } from "react";
import {Button} from "@mui/material";

const FormFilterButtons = ({filterCategories}) => {
    const [ifExpense, setIfExpense] = useState(true)
    const [ifIncome, setIfIncome] = useState(false)

    const handleClick = (event) => {
        setIfIncome(!ifIncome);
        setIfExpense(!ifExpense);
        filterCategories(event);
    }


    return (
        <>
            <Button data-value="expense" disabled={ifExpense} value={ifExpense} onClick={handleClick}>Wydatki</Button>
            <Button data-value="income" disabled={ifIncome} value={ifIncome} onClick={handleClick}>Wpływy</Button>
        </>
    )
}

export default FormFilterButtons