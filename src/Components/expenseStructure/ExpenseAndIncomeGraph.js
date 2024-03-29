import React from "react";
import {Box} from '@mui/material'

import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import PieChart from "./PieChart";
import MonthlyBalanceOverview from "../spendingsTable/MonthlyBalanceOverview";


const ExpenseAndIncomeGraph = () => {


    return (
        <>
            <SpendingsOverviewHeader/>

            <Box sx={{
                height: 'calc(100% - 10rem)',
                display: 'flex',
                padding: '2rem',
                gap: '2rem',
                flexShrink: 1,
                flexDirection: 'column'

            }}>

                <MonthlyBalanceOverview style={{padding: '2rem'}}/>

                <Box sx={{
                    display: 'flex',
                    height: 'calc(100% - 21.5rem)',
                    gap: '2rem',
                    width: '100%',

                }}>
                    <div style={{ flex: 1 }}>
                        <h2 className={'expense__income__graph__header'}>Wpływy</h2>
                        <PieChart transaction={'income'}/>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2  className={'expense__income__graph__header'}>Wydatki</h2>
                        <PieChart transaction={'expense'}/>
                    </div>
                </Box>

            </Box>
        </>
    )
}

export default ExpenseAndIncomeGraph