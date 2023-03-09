import React, {useState, useEffect, useContext} from "react";
import dayjs from "dayjs";

import GoalSetForm from "./GoalSetForm";
import {categoriesURL} from "./SpendingForm";
import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import {AppContext} from "../context/AppProvider";
import {Box, TextField} from '@mui/material'
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import GoalsTable from "./GoalsTable";


const GoalsSetter = () => {

    // CATEGORY GOALS
    const goalsURL = 'http://localhost:3005/goals';

    // STATES
    const {currentMonth, setCurrentMonth, currentYear, setCurrentYear, currentMonthString, setCurrentMonthString, nextMonth, prevMonth, goals, setGoals, categories, setCategories} = useContext(AppContext)



    // FUNCTION CREATING AN OBJECT WITH THE GOAL FOR THE SELECTED MONTH AND CATEGORY





    return (
<>
{/*    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker views={['year', 'month']} inputFormat={'MM/YYYY'} onChange={(date) => {
            console.log(dayjs(date).format('DD/MM/YYYY'))
            setDate(dayjs(date).format('MM/DD/YYYY'))
        }
        }
                    value={date}
                    renderInput={(props) => <TextField {...props}/>} label={'Select date'}/>
    </LocalizationProvider>*/}
    <SpendingsOverviewHeader nextMonth={nextMonth} prevMonth={prevMonth} currentMonthString={currentMonthString}
                             currentYear={currentYear} setCurrentMonth={setCurrentMonth}/>
    <Box sx={{
        height: 'calc(100% - 8rem)',
        display: 'flex',
        padding: '2rem',
        gap: '2rem',
        flexShrink: 1,
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "35%",
            border: '1px solid lightgray',
            overflow: 'scroll',
           height: '100%',
            borderRadius: '20px',
            padding: '1rem'

        }}>

            <h2 className='goals__setter__header'>Dodaj cele miesięczne</h2>
        {categories.map((cat, type, goal, id) => {
            return (
                <>
                <GoalSetForm type={cat.type} description={cat.description} key={id}>
                </GoalSetForm>
                </>
            )

        })}

        </Box>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "65%",
            border: '1px solid lightgray',
            overflow: 'scroll',
            height: '100%',
            borderRadius: '20px',
            padding: '1rem'

        }}>
        <GoalsTable />
        </Box>
    </Box>
</>
    )

}

export default GoalsSetter