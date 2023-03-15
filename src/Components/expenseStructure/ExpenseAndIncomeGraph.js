import React from "react";
import {Box} from '@mui/material'

import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import PieChart from "./PieChart";
import MonthlyBalanceOverview from "../MonthlyBalanceOverview";


const ExpenseAndIncomeGraph = () => {


    return (
        <>
            <SpendingsOverviewHeader/>

            <Box sx={{
                height: 'calc(100% - 8rem)',
                display: 'flex',
                padding: '2rem',
                gap: '2rem',
                flexShrink: 1,
                flexDirection: 'column'
            }}>

                <MonthlyBalanceOverview style={{padding: '2rem'}}/>

                <Box sx={{
                    display: 'flex',
                    height: 'calc(100% - 16rem)',
                    gap: '2rem',
                    width: '100%'
                }}>
                    <div style={{ flex: 1 }}>
                        <PieChart transaction={'income'}/>
                    </div>
                    <div style={{ flex: 1 }}>
                        <PieChart transaction={'expense'}/>
                    </div>
                </Box>

            </Box>
        </>
    )
}

export default ExpenseAndIncomeGraph