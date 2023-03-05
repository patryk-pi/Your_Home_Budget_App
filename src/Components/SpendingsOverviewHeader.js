import React from "react";
import {IconButton} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SpendingsOverviewHeader = ({prevMonth, nextMonth, currentMonthString, currentYear}) => {

    return (
        <div style={{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '3rem 0 0'
        }}>
            <IconButton size='large' onClick={prevMonth} style={{
                marginLeft: '27rem'
            }}>
                <ArrowBackIosNewIcon fontSize={'large'}/>
            </IconButton>
            <h1 className={'app__container__heading'}>{currentMonthString} {currentYear}</h1>
            <IconButton size='large' onClick={nextMonth} style={{
                marginRight: '27rem'
            }}>
                <ArrowForwardIosIcon fontSize={'large'}/>
            </IconButton>
        </div>
    )
}

export default SpendingsOverviewHeader