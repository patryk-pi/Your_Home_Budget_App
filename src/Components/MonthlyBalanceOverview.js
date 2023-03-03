import React, { useState } from "react";

const MonthlyBalanceOverview = ({operations, filterOperations}) => {

    return (
        <>
            <h2>Wpływy: {
                operations
                    .filter(operation => filterOperations(operation))
                    .filter(operation => operation.amount > 0)
                    .reduce((acc, curr) => {
                        return acc + curr.amount
                    }, 0)
            }</h2>
            <h2>Wydatki: {
                operations
                    .filter(operation => filterOperations(operation))
                    .filter(operation => operation.amount < 0)
                    .reduce((acc, curr) => {
                        return acc + curr.amount
                    }, 0)
            }</h2>
            <h2>Bilans: {
                operations
                    .filter(operation => filterOperations(operation))
                    .reduce((acc, curr) => {
                        return acc + curr.amount
                    }, 0)
            }</h2>
        </>
    )
}

export default MonthlyBalanceOverview;