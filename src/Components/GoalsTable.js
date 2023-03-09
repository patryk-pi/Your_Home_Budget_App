import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppProvider";
import {Box} from "@mui/material";
import Table from "@mui/joy/Table";

const GoalsTable = () => {

    const {goals, filterGoalsByMonth} = useContext(AppContext)

    console.log(goals)
    return (

        <Box sx={{
            padding: '2rem',
            height: '100%',
            overflow: 'scroll'
        }}>
            <Table size="lg"
                   stripe='even'
                   borderAxis={"none"}
                   sx={{
                       textAlign: 'center',
                       fontSize: '1.4rem',
                   }}
            >
                <thead >
                <tr >
                    <th className='spendings__table__head'>Kategoria</th>
                    <th className='spendings__table__head'>Typ</th>
                    <th className='spendings__table__head'>Cel</th>

                </tr>
                </thead>

                {/*FILTERING OPERATIONS BY CURRENT MONTH (TAKEN FROM CONTEXT)*/}

                <tbody>
                {goals
                    .filter(goalRecord => filterGoalsByMonth(goalRecord))
                    .map(({category, goal, type, id}) => (
                        <tr key={id} >
                            <td>{category}</td>
                            <td>{type === 'expense' ? 'Wydatki' : 'Wpływy'}</td>
                            <td>{goal.toLocaleString('pl', {
                                style: 'currency',
                                currency: 'PLN',
                                minimumFractionDigits: 2,
                                useGrouping: 'always'
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>
    )

}

export default GoalsTable