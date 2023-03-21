import React, {useContext, useState} from "react";
import Table from "@mui/joy/Table";
import {AppContext} from "../context/AppProvider";
import {Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import variables from "../scss/settings/_variables.scss"

const SpendingsTable = () => {

    const {operations, filterOperationsByMonth, handleDelete} = useContext(AppContext);
    const {colorRed} = variables

    // RENDER INFO ABOUT NO OPERATIONS IN THE CHOSEN MONTH
    if (operations
        .filter((operation) => filterOperationsByMonth(operation)).length === 0 ) {
        return (

            <div style={{


                border: '1px solid lightgray',
                borderRadius: '20px',
                padding: '2rem',
                height: 'calc(100% - 15rem)',
                overflow: 'scroll',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'


            }}>
            <h1 style={{
                fontSize: '3rem'
            }}>Brak danych :(</h1>
            </div>
        )
    }


    // RENDER OPERATIONS FOR CHOSEN MONTH
    return (

        <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            height: 'calc(100% - 15rem)',
            overflow: 'scroll',
            bgcolor: 'white',
            boxShadow: 2
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
            <th className='spendings__table__head'>Opis</th>
            <th className='spendings__table__head'>Kwota</th>
            <th className='spendings__table__head'>Data</th>
            <th className='spendings__table__head spendings__table__last-column'>Usuń</th>

        </tr>
        </thead>

        {/*FILTERING OPERATIONS BY CURRENT MONTH (TAKEN FROM CONTEXT)*/}

        <tbody>
        {operations
            .filter(operation => filterOperationsByMonth(operation))
            .map(({category, description, amount, date, id}) => (
                <tr key={id} >
                    <td>{category}</td>
                    <td>{description}</td>
                    <td className={amount < 0 ? "spendings__table__expense" : "spendings__table__income"}>{amount
                        .toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    })}</td>
                    <td>{date}</td>
                    <td className='spendings__table__last-column'>
                        <IconButton onClick={() => handleDelete(id)} aria-label="delete" sx={{color: colorRed}}>
                        <DeleteIcon sx={{
                            fontSize: '2rem'
                        }
                        } />
                    </IconButton></td>
                </tr>
            ))}
        </tbody>
    </Table>
        </Box>
    )
}

export default SpendingsTable;