import React, { useState, useContext} from "react";
import MonthlyBalanceOverview from "../spendingsTable/MonthlyBalanceOverview";
import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import GoalProgressBar from "./GoalProgressBar";
import {AppContext} from "../../context/AppProvider";
import ProgressBar from "@ramonak/react-progress-bar";
import { Box } from '@mui/material'

const MonthlyProgress = () => {

    const {categories, operations, filterOperationsByMonth, goals, filterGoalsByMonth} = useContext(AppContext);



    return (
        <>

            <SpendingsOverviewHeader />

            <Box sx={{

                borderRadius: '20px',
                padding: '2rem',
                height: 'calc(100% - 10rem)',
                overflow: 'scroll',
                marginTop: '2rem'
            }}>

            {categories.map((category) => {

                return (
                    <Box sx={{
                        border: '3px solid lightgray',
                        borderRadius: '20px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        boxShadow: 1,
                        bgcolor: 'white'
                    }}>
                        <h2 style={{
                            fontSize: '1.6rem',
                            fontWeight: 600,
                            marginBottom: '1rem'
                        }}>{category.description}</h2>
                        <GoalProgressBar currentCategory={category} />
                    </Box>
                )
            })}

    </Box>
        </>
    )
}

export default MonthlyProgress