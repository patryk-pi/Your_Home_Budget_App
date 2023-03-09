import React, {useContext, useState} from "react";
import {AppContext} from "../context/AppProvider";



const MonthlyBalanceOverview = () => {

    const {
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        currentMonthString,
        setCurrentMonthString,
        nextMonth,
        prevMonth,
        operations,
        setOperations,
        loading,
        setLoading,
        handleAdd,
        filterOperationsByMonth
    } = useContext(AppContext);

    return (
        <div style={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            display: "flex",
            justifyContent: "space-between",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: '100%'
            }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2 style={{
                    fontSize: '3rem'
                }}>Wpływy: </h2>
                <h2 style={{
                    fontSize: '3rem',
                    color: 'green',
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
            </div>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2 style={{
                    fontSize: '3rem'
                }}>
                    Wydatki:</h2> <h2
                style={{
                    fontSize: '3rem',
                    color: 'red',
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
                    color: "lightgrey",
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
            </div>
        </div>
    )
}

export default MonthlyBalanceOverview;