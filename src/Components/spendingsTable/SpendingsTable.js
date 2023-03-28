import React, {useContext} from "react";
import {AppContext} from "../../context/AppProvider";
import {Box, IconButton, useTheme, ThemeProvider} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import variables from "../../scss/settings/_variables.scss";
import {DataGrid} from "@mui/x-data-grid";


const SpendingsTable = () => {
    const {operations, filterOperationsByMonth, handleDelete} = useContext(AppContext);
    const {colorRed, colorGreen} = variables;
    const theme = useTheme();

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
    ;


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

            '& .MuiDataGrid-root': {
                border: 'none',
                fontSize: '1.5rem',
                textAlign: 'center',
            },
            '& .MuiDataGrid-cell': {
                borderBottom: 'none'
            },
            '& .MuiDataGrid-columnHeaders': {
                fontWeight: 700,
                borderBottom: 'none'
            },
            '& .MuiDataGrid-virtualScroller': {},
            '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',

            },
            '& .MuiCheckbox-root': {}

        }}>
            <DataGrid
                rows={rows}
                columns={columns}

                pageSize={10}
                disableSelectionOnClick={true}
                disableColumnMenu={true}
                density="compact"
            />
        </Box>
    );
};

export default SpendingsTable;
