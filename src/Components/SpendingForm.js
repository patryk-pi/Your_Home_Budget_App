import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, Button, TextField, Box, Snackbar, Alert, AlertTitle} from "@mui/material";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormFilterButtons from "./FilterButtons";
import {NumericFormat} from "react-number-format";


export const categoriesURL = "http://localhost:3005/categories";


const SpendingForm = ({add}) => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState(dayjs(new Date()));
    const [expense, setExpense] = useState(true);
    const [income, setIncome] = useState(false);
    const [openError, setOpenError] = useState(false)
    const [openSucces, setOpenSucces] = useState(false)

    const [filteredCategory, setFilteredCategory] = useState([])


    const handleClose = (event, reason, setter) => {
        if (reason === 'clickaway') {
            return;
        }

        setter(false);
    };


    const filterCategories = (event) => {
        setIncome(!income);
        setExpense(!expense);
        setCategory('');
        const typeOfOperation = event.target.dataset.value
        setFilteredCategory(categories.filter(({type}) => type === typeOfOperation));
    }


    const handleSubmit = e => {
        e.preventDefault();

        if (!category || !description || !amount || !date) {
            setOpenError(true);
            return;
        }
        add({
            category,
            description,
            amount: expense === true ? -parseFloat(amount) : parseFloat(amount),
            date: dayjs(new Date(date)).format('DD/MM/YYYY')
        });

        setOpenSucces(true)
        setAmount('');
        setCategory('');
        setDate(dayjs(new Date()).format('MM/DD/YYYY'));
        setDescription('')

    }

    useEffect(() => {
        fetch(categoriesURL)
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        setFilteredCategory(categories.filter(({type}) => type === "expense"));
    }, [categories])


    return (
        <>
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
                            console.log(value)
                            setAmount(parseFloat(value))
                        }}>
                        </NumericFormat>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker inputFormat={'DD/MM/YYYY'} onChange={(date) => {
                                console.log(dayjs(date).format('DD/MM/YYYY'))
                                setDate(dayjs(date).format('MM/DD/YYYY'))
                            }
                            }
                                        value={date}
                                        renderInput={(props) => <TextField {...props}/>} label={'Select date'}/>
                        </LocalizationProvider>
                        <Button type={'submit'}>Dodaj</Button>
                        <Snackbar
                            open={openError}
                            autoHideDuration={4000}
                            onClose={() => handleClose(null, null, setOpenError)}
                            severity="error"
                        >
                            <Alert onClose={() => handleClose(null, null, setOpenError)} severity="error" sx={{
                                width: '100%',
                                fontSize: '1.4rem',
                                color: 'white',
                                fontWeight: '700',

                            }}
                                   variant='filled'
                            >

                                Uzupełnij wszystkie pola!
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            open={openSucces}
                            autoHideDuration={4000}
                            onClose={() => handleClose(null, null, setOpenSucces)}
                            severity="success"
                        >
                            <Alert onClose={() => handleClose(null, null, setOpenSucces)} severity="success"
                                   sx={{
                                width: '100%',
                                fontSize: '1.4rem',
                                color: 'white',
                                fontWeight: '700',


                            }}
                                   variant='filled'

                            >

                                Dodano!
                            </Alert>
                        </Snackbar>

                    </FormControl>
                </form>
            </Box>
        </>
    )
}

export default SpendingForm