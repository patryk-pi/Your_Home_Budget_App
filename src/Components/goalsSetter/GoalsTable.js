import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import {DataGrid, GridToolbar, plPL} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import variables from "../../scss/settings/_variables.scss";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material/styles";

const GoalsTable = () => {
    const { goals, filterGoalsByMonth } = useContext(AppContext);
    const {colorRed, colorGreen, colorPrimary, colorPrimaryLight1} = variables;

    const theme = createTheme({
        palette: {
            primary: {
                main: colorPrimary
            },
        }})

    const columns = [
        { field: 'category', headerName: 'Kategoria', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'type', headerName: 'Typ', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'goal', headerName: 'Cel', flex: 1, headerAlign: 'center', align: 'center' },
    ];

    const rows = goals.filter((goalRecord) => filterGoalsByMonth(goalRecord)).map(({ category, goal, type, id }) => ({
        id,
        category,
        type: type === 'expense' ? 'Wydatki' : 'Wpływy',
        goal: goal.toLocaleString('pl', {
            style: 'currency',
            currency: 'PLN',
            minimumFractionDigits: 2,
            useGrouping: 'always',
        }),
    }));

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{
            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            overflow: 'scroll',
            bgcolor: 'white',
            boxShadow: 2,
            fontSize: '2rem',
            display: 'grid',
            width: "65%",

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
                    rowSelection={false}
                    slots={{ toolbar: GridToolbar }}
                    localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                />
        </Box>
        </ThemeProvider>
    );
};

export default GoalsTable;
