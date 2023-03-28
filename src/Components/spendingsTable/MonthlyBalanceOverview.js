import React, { useContext } from "react";
import {AppContext} from "../../context/AppProvider";
import { Box } from "@mui/material"
import variables from '../../scss/settings/_variables.scss'


const MonthlyBalanceOverview = () => {

    const {colorGreen, colorRed, colorGrayText} = variables;

    const {
        operations,
        filterOperationsByMonth
    } = useContext(AppContext);

    return (
        <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            display: "flex",
            justifyContent: "space-between",
            bgcolor: 'white',
            boxShadow: 2,
        }}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                width='100%'
           >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom='.5rem'
            >
                <h2 style={{
                    fontSize: '3rem'
                }}>Wpływy: </h2>
                <h2 style={{
                    fontSize: '3rem',
                    color: colorGreen,
                    fontWeight: '700'
                }}>{
                    operations
                        .filter(operation => filterOperationsByMonth(operation))
                        .filter(operation => operation.amount > 0)
                        .reduce((acc, curr) => {
                            return acc + curr.amount
                        }, 0)
                        .toLocaleString('pl', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 2,
                            useGrouping: 'always'
                        })
                }
                </h2>
            </Box>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: '.5rem'
            }}>
                <h2 style={{
                    fontSize: '3rem'
                }}>
                    Wydatki:</h2> <h2
                style={{
                    fontSize: '3rem',
                    color: colorRed,
                    fontWeight: '700'
                }}
            >{
                operations
                    .filter(operation => filterOperationsByMonth(operation))
                    .filter(operation => operation.amount < 0)
                    .reduce((acc, curr) => {
                        return acc + curr.amount
                    }, 0)
                    .toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    })

            }</h2>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2 style={{
                    fontSize: '3rem'
                }}>Bilans: </h2>
                <h2 style={{
                    fontSize: '3rem',
                    color: colorGrayText,
                    fontWeight: '700'
                }}>{
                    operations
                        .filter(operation => filterOperationsByMonth(operation))
                        .reduce((acc, curr) => {
                            return acc + curr.amount
                        }, 0)

                        .toLocaleString('pl', {
                            style: 'currency',
                            currency: 'PLN',
                            minimumFractionDigits: 2,
                            useGrouping: 'always'
                        })
                }</h2>

            </div>
            </Box>
        </Box>
    )
}

export default MonthlyBalanceOverview;