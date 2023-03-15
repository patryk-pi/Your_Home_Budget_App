import React, { useState, useContext} from "react";
import MonthlyBalanceOverview from "../MonthlyBalanceOverview";
import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import GoalProgressBar from "./GoalProgressBar";
import {AppContext} from "../../context/AppProvider";
import ProgressBar from "@ramonak/react-progress-bar";

const MonthlyProgress = () => {

    const {categories, operations, filterOperationsByMonth, goals, filterGoalsByMonth} = useContext(AppContext);



    return (
        <>
            <SpendingsOverviewHeader />

            {categories.map((category) => {


                return (
                    <div>
                        <h2>{category.description}</h2>
                        <GoalProgressBar currentCategory={category} />
                    </div>
                )
            })}


        </>
    )
}

export default MonthlyProgress