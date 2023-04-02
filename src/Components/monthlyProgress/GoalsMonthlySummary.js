import React, { useContext } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { AppContext } from "../../context/AppProvider";
import variables from "../../scss/settings/_variables.scss";
import { Box } from "@mui/material";

const GoalsMonthlySummary = ({ operationType }) => {
    const { filterOperationsByMonth, filterGoalsByMonth, operations, goals } =
        useContext(AppContext);

    const { colorRed, colorGreen } = variables;
    const currentOperations = operations
        .filter((operation) => filterOperationsByMonth(operation))
        .filter((operation) =>
            operationType === "expense"
                ? operation.amount < 0
                : operation.amount > 0
        )
        .map((operation) => operation.amount)
        .reduce((acc, curr) => acc + curr, 0);

    const currentGoals = goals
        .filter((goal) => filterGoalsByMonth(goal))
        .filter((goal) =>
            operationType === "expense" ? goal.goal < 0 : goal.goal > 0
        )
        .map((goal) => goal.goal)
        .reduce((acc, curr) => acc + curr, 0);
    console.log(currentGoals);

    const percentCompleted =
        currentGoals !== 0
            ? Math.abs((currentOperations / currentGoals) * 100)
            : 0;
    console.log(percentCompleted);

    return (
        <ProgressBar
            completed={
                percentCompleted === undefined
                    ? 0
                    : +percentCompleted.toFixed(0)
            }
            bgColor={colorGreen}
            animateOnRender={true}
            height={"3rem"}
            labelAlignment={"right"}
            labelSize={"2rem"}
        />
    );
};

export default GoalsMonthlySummary;
