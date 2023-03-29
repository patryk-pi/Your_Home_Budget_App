import React, {useContext} from "react";
import {AppContext} from "../../context/AppProvider";
import {Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import variables from "../../scss/settings/_variables.scss";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";


const SpendingsTable = () => {
    const {operations, filterOperationsByMonth, handleDelete} = useContext(AppContext);
    const {colorRed, colorGreen} = variables;

    // RENDER INFO ABOUT NO OPERATIONS IN THE CHOSEN MONTH
    if (operations.filter((operation) => filterOperationsByMonth(operation)).length === 0) {
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
                <h1 style={{fontSize: '3rem'}}>Brak danych :(</h1>
            </div>
        );
    }


    // RENDER OPERATIONS FOR CHOSEN MONTH
    const columns = [
        {field: 'category', headerName: 'Kategoria', flex: 1, headerAlign: 'center', align: 'center'},
        {field: 'description', headerName: 'Opis', flex: 1, headerAlign: 'center', align: 'center'},
        {
            field: 'amount',
            headerName: 'Kwota',
            type: 'number',
            flex: 1,
            headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                const amount = Number(params.value);
                return (

                        <Box

                            sx={{
                                color: amount < 0 ? colorRed : colorGreen,
                                fontWeight: 700,
                                fontFamily: 'Open Sans'
                            }}
                        >
                            {amount.toLocaleString('pl', {
                                style: 'currency',
                                currency: 'PLN',
                                minimumFractionDigits: 2,
                                useGrouping: 'always'
                            })}
                        </Box>
                );
            },

        },
        {field: 'date', headerName: 'Data', flex: 1, headerAlign: 'center', align: 'center'},
        {
            field: 'id',
            headerName: 'Usuń',
            flex: 0,
            sortable: false,
            headerAlign: 'center', align: 'center',

            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.value)} aria-label="delete" sx={{color: colorRed}}>
                    <DeleteIcon sx={{fontSize: '2rem'}}/>
                </IconButton>
            ),
        },
    ];

    const rows = operations
        .filter(operation => filterOperationsByMonth(operation))
        .map(({
                  category,
                  description,
                  amount,
                  date,
                  id
              }) => {
            return {id, category, description, amount, date};
        });

    return (
        <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            height: 'calc(100% - 15rem)',
            overflow: 'scroll',
            bgcolor: 'white',
            boxShadow: 2,
            fontSize: '2rem',
            display: 'grid',

            '& .MuiDataGrid-root': {
                border: 'none',
                fontSize: '1.5rem',
                textAlign: 'center',

            },
            '& .MuiDataGrid-row:hover': {
                background: 'rgba(0,157,189,0.35)'
            },
            '& .MuiDataGrid-row:nth-child(2n)': {
                background: 'rgba(153,185,192,0.2)'
            },
            '& .MuiDataGrid-row:nth-child(2n):hover': {
                background: 'rgba(153,185,192,0.38)'
            },
            '& .MuiDataGrid-cell': {
                borderBottom: 'none'
            },
            '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none',
                backgroundColor: 'rgb(64,135,157)',
                color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700
            },
            '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: 'rgb(64,135,157)',
            },
            '& .MuiTablePagination-root': {

                color: 'white !important',
            },
            '& .MuiDataGrid-menuIcon .MuiSvgIcon-root': {
               color: 'white'
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {

                color: 'rgb(64,135,157)',
            }

        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}

            />
        </Box>
    );
};

export default SpendingsTable;
