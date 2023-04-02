import React, { useContext } from "react";
import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import GoalProgressBar from "./GoalProgressBar";
import { AppContext } from "../../context/AppProvider";
import { Accordion, AccordionSummary, Box, Typography } from "@mui/material";
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
                <GoalsMonthlySummary operationType="expense" />
                <GoalsMonthlySummary operationType="income" />

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
                                fontSize: "3rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                width: "100%",
                            }}
                        >
                            Szczegółowy status celów
                        </Typography>
                    </AccordionSummary>

                    {categories.map((category, id) => {
                        return (
                            <Box
                                sx={{
                                    border: "3px solid lightgray",
                                    borderRadius: "20px",
                                    padding: "2rem",
                                    marginBottom: "2rem",
                                    boxShadow: 1,
                                    bgcolor: "white",
                                }}
                                key={id}
                            >
                                <h2
                                    style={{
                                        fontSize: "1.6rem",
                                        fontWeight: 600,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {category.description}
                                </h2>
                                <GoalProgressBar currentCategory={category} />
                            </Box>
                        );
                    })}
                </Accordion>
            </Box>
        </>
    );
};

export default MonthlyProgress;
