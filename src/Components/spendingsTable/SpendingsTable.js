import React, {useContext} from "react";
import {AppContext} from "../../context/AppProvider";
import {Box, IconButton, useTheme} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import variables from "../../scss/settings/_variables.scss";
import {DataGrid, GridToolbar, plPL} from "@mui/x-data-grid";
import {createTheme, ThemeProvider} from "@mui/material/styles";


const SpendingsTable = () => {
    const {operations, filterOperationsByMonth, handleDelete} = useContext(AppContext);
    const {colorRed, colorGreen, colorPrimary, colorPrimaryLight1} = variables;


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
                <h1 style={{fontSize: '3rem', color: 'white', fontWeight:700}}>Brak danych :(</h1>
            </div>
        );
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: colorPrimary
            },
        }})


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
        <ThemeProvider theme={theme}>
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
                background: 'rgba(0,157,189,0.35)'
            },

            '& .MuiDataGrid-cell': {
                borderBottom: 'none'
            },
            '& .MuiDataGrid-columnHeaders': {
                borderBottom: 'none',
                backgroundColor: colorPrimary,
                color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,

            },
            '& .MuiDataGrid-footerContainer': {
                borderTop: 'none',
                backgroundColor: colorPrimary,
            },
            '& .MuiTablePagination-root': {
                color: 'white !important',
                fontSize: '1.2rem'
            },
            '& .MuiDataGrid-menuIcon .MuiSvgIcon-root': {
               color: 'white'
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: colorPrimary,
            },
            '& .MuiBadge-badge': {
                backgroundColor:colorPrimary,
            },
            '& .MuiTablePagination-displayedRows': {
                color: 'white !important',
                fontSize: '1.2rem'
            },
            '& .MuiTablePagination-selectLabel': {
                color: 'white !important',
                fontSize: '1.2rem'
            },



        }}>
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                rowSelection={false}
            />
        </Box>
        </ThemeProvider>
    );
};

export default SpendingsTable;
