import React, {useContext} from "react";
import {Box, IconButton} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {AppContext} from "../context/AppProvider";

const SpendingsOverviewHeader = () => {

    const {
        currentYear,
        currentMonthString,
        nextMonth,
        prevMonth,

    } = useContext(AppContext)

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '3rem 0 0'
        }}>
            <IconButton size='large' onClick={prevMonth} sx={{
                marginLeft: '27rem',
                boxShadow: 3
            }}>
                <ArrowBackIosNewIcon fontSize={'large'}/>
            </IconButton>
            <h1 className={'app__container__heading'}>{currentMonthString} {currentYear}</h1>
            <IconButton size='large' onClick={nextMonth} sx={{
                marginRight: '27rem',
                boxShadow: 3
            }}>
                <ArrowForwardIosIcon fontSize={'large'}/>
            </IconButton>
        </Box>
    )
}

export default SpendingsOverviewHeader