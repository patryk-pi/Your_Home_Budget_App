import React, { useState } from "react";

const MonthlyBalanceOverview = ({operations, filterOperations}) => {

    return (
        <div style={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem'
        }}>
            <h2 style={{
                fontSize: '3rem'
            }}>Wpływy: {
                operations
                    .filter(operation => filterOperations(operation))
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
            }</h2>
            <h2 style={{
                fontSize: '3rem'
            }}>Wydatki: {
                operations
                    .filter(operation => filterOperations(operation))
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
            <h2 style={{
                fontSize: '3rem'
            }}>Bilans: {
                operations
                    .filter(operation => filterOperations(operation))
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
    )
}

export default MonthlyBalanceOverview;