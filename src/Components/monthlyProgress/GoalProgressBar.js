import React, {useEffect, useState, useContext} from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {AppContext} from "../../context/AppProvider";
import variables from '../../scss/settings/_variables.scss'
import {Box} from '@mui/material'

const GoalProgressBar = ({currentCategory}) => {

    const {colorGreen, colorRed} = variables

    const {operations, filterOperationsByMonth, goals, filterGoalsByMonth} = useContext(AppContext);

    const [currentGoal] = (goals
            .filter(goal => filterGoalsByMonth(goal))
            .filter(goal => goal.category === currentCategory.description)
            .map(goal => goal.goal)
    );


    const currentOperations = (
        operations
            .filter(operation => filterOperationsByMonth(operation))
            .filter(operation => operation.category === currentCategory.description)
            .map(operation => operation.amount)
            .reduce((acc, curr) => acc + curr, 0)
    );


    const percentCompleted = currentGoal === 0 || currentOperations === undefined || currentGoal === undefined ? 0 : currentOperations / currentGoal * 100
    console.log(percentCompleted)

    let backgroundColor;

    if ((currentOperations < 0 && percentCompleted < 100) || (currentOperations > 0 && percentCompleted > 100)) {
        backgroundColor = colorGreen
    } else {
        backgroundColor = colorRed
    }


    return (
        <>
            <ProgressBar completed={percentCompleted === undefined ? 0 : +percentCompleted.toFixed(0)}
                         bgColor={backgroundColor}


                         animateOnRender={true}
                         height={'3rem'}
                         labelAlignment={'right'}
                         labelSize={'2rem'}
            />
            <Box
                sx={{
                    mt: 2,
                    fontFamily: 'Open Sans',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.5rem',
                    flexBasis: '50%'
                }}>
                <div><span>Cel:</span> <span
                    style={{fontWeight: 600,}}> {!currentGoal ? 0 : Math.abs(currentGoal).toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    }
                )}</span></div>
                <div><span>Operacje: </span><span
                    style={{fontWeight: 600,}}> {Math.abs(currentOperations).toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    }
                )}</span></div>
                <div><span>Różnica: </span><span
                    style={{fontWeight: 600,}}>{(currentGoal ? Math.abs(currentOperations - currentGoal) : currentOperations).toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    }
                )}</span></div>
            </Box>
        </>

)

}

export default GoalProgressBar
