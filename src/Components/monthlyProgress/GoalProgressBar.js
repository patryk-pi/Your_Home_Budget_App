import React, {useEffect, useState, useContext} from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import {AppContext} from "../../context/AppProvider";

const GoalProgressBar = ({currentCategory}) => {

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
        backgroundColor = "green"
    } else {
        backgroundColor = 'red'
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
                <p>Cel na ten miesiąc: {!currentGoal ? 0 : currentGoal }</p>
                <p>Operacje w tym miesiącu: {currentOperations}</p>
            </>

    )

}

export default GoalProgressBar
