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

    const currentGoal = goals
        .filter((goal) => filterGoalsByMonth(goal))
        .filter((goal) =>
            operationType === "expense" ? goal.goal < 0 : goal.goal > 0
        )
        .map((goal) => goal.goal)
        .reduce((acc, curr) => acc + curr, 0);

    const percentCompleted =
        currentGoal !== 0
            ? Math.abs((currentOperations / currentGoal) * 100)
            : 0;

    let backgroundColor;

    if (
        (currentOperations < 0 && percentCompleted < 100) ||
        (currentOperations > 0 && percentCompleted > 100)
    ) {
        backgroundColor = colorGreen;
    } else {
        backgroundColor = colorRed;
    }

    return (
        <Box
            sx={{
                border: "3px solid lightgray",
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "2rem",
                boxShadow: 1,
                bgcolor: "#e7e7e7",
            }}
        >
            <h2
                style={{
                    fontSize: "2rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                }}
            >
                {operationType === "expense" ? "Wydatki" : "Wpływy"}
            </h2>
            {/* <div style={{ border: "1px solid black", borderRadius: "50px" }}> */}
            <ProgressBar
                completed={
                    percentCompleted === undefined
                        ? 0
                        : +percentCompleted.toFixed(0)
                }
                bgColor={backgroundColor}
                animateOnRender={true}
                height={"3rem"}
                labelAlignment={"right"}
                labelSize={"2rem"}
                baseBgColor="#fff"
            />
            {/* </div> */}
            <Box
                sx={{
                    mt: 2,
                    fontFamily: "Open Sans",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.5rem",
                    flexBasis: "50%",
                }}
            >
                <Box>
                    <span>Cel:</span>
                    <span style={{ fontWeight: 600 }}>
                        {" "}
                        {!currentGoal
                            ? 0
                            : Math.abs(currentGoal).toLocaleString("pl", {
                                  style: "currency",
                                  currency: "PLN",
                                  minimumFractionDigits: 2,
                                  useGrouping: "always",
                              })}
                    </span>
                </Box>
                <Box>
                    <span>Operacje: </span>
                    <span style={{ fontWeight: 600 }}>
                        {" "}
                        {Math.abs(currentOperations).toLocaleString("pl", {
                            style: "currency",
                            currency: "PLN",
                            minimumFractionDigits: 2,
                            useGrouping: "always",
                        })}
                    </span>
                </Box>
                <Box>
                    <span>Różnica: </span>
                    <span style={{ fontWeight: 600 }}>
                        {(currentGoal
                            ? Math.abs(currentOperations - currentGoal)
                            : currentOperations
                        ).toLocaleString("pl", {
                            style: "currency",
                            currency: "PLN",
                            minimumFractionDigits: 2,
                            useGrouping: "always",
                        })}
                    </span>
                </Box>
            </Box>
        </Box>
    );
};

export default GoalsMonthlySummary;
