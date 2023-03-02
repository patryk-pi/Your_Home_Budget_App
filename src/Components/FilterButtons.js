import React, { useState } from "react";
import {Button} from "@mui/material";

const FormFilterButtons = ({filterCategories}) => {
    const [expense, setExpense] = useState(true)
    const [income, setIncome] = useState(false)

    const handleClick = (event) => {
        setIncome(!income);
        setExpense(!expense);
        const typeOfOperation = event.target.dataset.value
        filterCategories(typeOfOperation);
    }


    return (
        <>
            <Button data-value="expense" disabled={expense} value={expense} onClick={handleClick}>Wydatki</Button>
            <Button data-value="income" disabled={income} value={income} onClick={handleClick}>Wpływy</Button>
        </>
    )
}

export default FormFilterButtons