import React, { useContext } from "react";
import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import GoalProgressBar from "./GoalProgressBar";
import { AppContext } from "../../context/AppProvider";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import GoalsMonthlySummary from "./GoalsMonthlySummary";

const MonthlyProgress = () => {
    const { categories } = useContext(AppContext);

    return (
        <>
            <SpendingsOverviewHeader />

            <Box
                sx={{
                    borderRadius: "20px",
                    padding: "2rem",
                    height: "calc(100% - 10rem)",
                    overflow: "scroll",
                    marginTop: "2rem",
                }}
            >
                <Accordion
                    sx={{
                        background: "transparent",
                        boxShadow: 0,
                    }}
                    defaultExpanded={true}
                >
                    <AccordionSummary
                        sx={{
                            background: "white",
                            marginBottom: "2rem",
                            border: "3px solid lightgray",
                            borderRadius: "20px",
                        }}
                        expandIcon={<ExpandMoreOutlined />}
                    >
                        <Typography
                            align="center"
                            sx={{
                                fontSize: "3rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                width: "100%",
                            }}
                        >
                            Status celów miesięcznych
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <GoalsMonthlySummary operationType="expense" />
                        <GoalsMonthlySummary operationType="income" />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{
                        background: "transparent",
                        boxShadow: 0,
                    }}
                >
                    <AccordionSummary
                        sx={{
                            background: "white",
                            marginBottom: "2rem",
                            border: "3px solid lightgray",
                            borderRadius: "20px",
                        }}
                        expandIcon={<ExpandMoreOutlined />}
                    >
                        <Typography
                            align="center"
                            sx={{
                                fontSize: "2rem",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                width: "100%",
                            }}
                        >
                            Szczegółowy status celów
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {categories.map((category, id) => {
                            return (
                                <GoalProgressBar
                                    currentCategory={category}
                                    key={id}
                                />
                            );
                        })}
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default MonthlyProgress;
