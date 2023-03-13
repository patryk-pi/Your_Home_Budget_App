import React from "react";


import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import PieChart from "./PieChart";
import MonthlyBalanceOverview from "../MonthlyBalanceOverview";

const ExpenseAndIncomeGraph = () => {

    return (
        <>
            <SpendingsOverviewHeader />
            <MonthlyBalanceOverview />
            <PieChart transaction={'income'}/>
            <PieChart transaction={'expense'}/>
        </>
    )
}

export default ExpenseAndIncomeGraph