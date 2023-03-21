import React, {useContext, useEffect, useState} from "react";
import {FormControl, MenuItem, Button, TextField, Box, Snackbar, Alert, AlertTitle} from "@mui/material";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormFilterButtons from "./FilterButtons";
import {NumericFormat} from "react-number-format";
import {AppContext} from "../../context/AppProvider";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import SnackbarInfo from "../SnackbarInfo";



const SpendingForm = () => {



    const theme = createTheme({
        typography: {
            fontSize: 18
        }
    });

    const {categories, handleAdd, user} = useContext(AppContext)


    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(dayjs(new Date()));
    const [expense, setExpense] = useState(true);
    const [income, setIncome] = useState(false);
    const [openError, setOpenError] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    const [filteredCategory, setFilteredCategory] = useState([])



    const filterCategories = (event) => {
        setIncome(!income);
        setExpense(!expense);
        setCategory('');
        const typeOfOperation = event.target.dataset.value
        setFilteredCategory(categories.filter(({type}) => type === typeOfOperation));
    }


    const handleSubmit = e => {
        e.preventDefault();

        // CHECK IF NO FIELD IS EMPTY
        if (!category || !description || !amount || !date) {
            setOpenError(true);
            return;
        }
        handleAdd({
            category,
            description,
            amount: expense === true ? -parseFloat(amount) : parseFloat(amount),
            date: dayjs(date).format('DD/MM/YYYY'),
        });

        setOpenSuccess(true)
        setAmount('');
        setCategory('');
        setDate(dayjs(new Date()).format('MM/DD/YYYY'));
        setDescription('')
    }

    console.log(user)




    useEffect(() => {
        setFilteredCategory(categories.filter(({type}) => type === "expense"));
    }, [categories])


    return (
        <>
            <ThemeProvider theme={theme}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40%",
                border: '1px solid lightgray',
                overflow: 'scroll',
                maxHeight: '53rem',
                borderRadius: '20px',
                padding: '1rem',
                background: 'white',
                boxShadow: 2

            }}>
                <FormFilterButtons filterCategories={filterCategories}/>
                <form style={{
                    width: '100%',
                }}
                      onSubmit={handleSubmit}
                      className="spending__form"
                >

                    <FormControl
                        fullWidth={true}
                        sx={{
                            width: '100%',
                            padding: '5rem',

                        }}
                    >

                        <TextField
                            value={category}
                            label="Kategoria"
                            onChange={e => setCategory(e.target.value)}
                            select={true}
                        >
                            {filteredCategory.map(({description, id}) => {
                                return (
                                    <MenuItem sx={{
                                        marginBottom: '.8rem',
                                        fontSize: '1.2rem'
                                    }} key={id} value={description}>{description}</MenuItem>
                                )
                            })}
                        </TextField>
                        <TextField label={"Opis"} type={"text"}
                                   onChange={e => setDescription(e.target.value)} value={description}></TextField>

                        <NumericFormat
                            customInput={TextField}
                            value={amount}
                            label={"Kwota"}
                            type={"text"}
                            decimalScale={2}
                            allowedDecimalSeparators={[',', '.']}
                            InputProps={{inputProps: {min: 0}}} onChange={(e) => {
                            const value = +(e.target.value);
                            setAmount(parseFloat(value))
                        }}>
                        </NumericFormat>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker inputFormat={'DD/MM/YYYY'} onChange={(date) => {
                                setDate(dayjs(date).format('MM/DD/YYYY'))
                            }
                            }
                                        value={date}
                                        renderInput={(props) => <TextField {...props}/>} label={'Select date'}/>
                        </LocalizationProvider>
                        <Button type={'submit'}>Dodaj</Button>
                        <SnackbarInfo severity={'error'} openState={openError} setOpenState={setOpenError} message={'Uzupełnij wszystkie pola!'} />
                        <SnackbarInfo severity={'success'} openState={openSuccess} setOpenState={setOpenSuccess} message={'Dodano!'} />
                    </FormControl>
                </form>
            </Box>
            </ThemeProvider>
        </>
    )
}

export default SpendingForm