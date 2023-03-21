import React, {useState} from "react";
import {Button} from "@mui/material";
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import {ThemeProvider, createTheme} from "@mui/material/styles";
import variables from '../../scss/settings/_variables.scss'

const {colorPrimary} = variables

// THEME FOR BUTTONS
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "1.4rem",
                    // marginBottom: '.5rem',
                    "&.MuiButton-textPrimary": {

                        background: "#dadada",
                        color: '#fafafa',

                    },
                    "&.Mui-disabled": {
                        background: colorPrimary,
                        color: "color-primary",
                        boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, .3)'
                    }
                }
            }
        }
    }
});


const FormFilterButtons = ({filterCategories}) => {
    const [ifExpense, setIfExpense] = useState(true)
    const [ifIncome, setIfIncome] = useState(false)


    const handleClick = (event) => {
        setIfIncome(!ifIncome);
        setIfExpense(!ifExpense);
        filterCategories(event);
    }


    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginTop: '2rem'
                }}>
                <Button data-value="expense" disabled={ifExpense} value={ifExpense} onClick={handleClick}
                        startIcon={<PaymentsIcon/>}>Wydatki</Button>
                <Button data-value="income" disabled={ifIncome} value={ifIncome} onClick={handleClick}
                        startIcon={<SavingsIcon/>}>Wpływy</Button>
                </div>
            </ThemeProvider>
        </>
    )
}

export default FormFilterButtons