import React, { useState } from "react";
import {Button} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';

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
            <Button data-value="expense" disabled={ifExpense} value={ifExpense} onClick={handleClick} startIcon={ <PaymentsIcon />} >Wydatki</Button>
            <Button data-value="income" disabled={ifIncome} value={ifIncome} onClick={handleClick} startIcon={ <SavingsIcon />}>Wpływy</Button>
        </>
    )
}

export default FormFilterButtons