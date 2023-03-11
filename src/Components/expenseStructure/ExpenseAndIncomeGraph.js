import React, {useContext} from "react";


import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import {AppContext} from "../../context/AppProvider";


const ExpenseAndIncomeGraph = () => {

    const { categories} = useContext(AppContext)

    return (
        <>
            <SpendingsOverviewHeader />
        </>
    )
}

export default ExpenseAndIncomeGraph