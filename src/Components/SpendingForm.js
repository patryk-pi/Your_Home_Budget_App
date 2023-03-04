import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, Button, TextField, Box} from "@mui/material";
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
    const [date, setDate] = useState(dayjs(new Date()).format('DD/MM/YYYY'));
    const [expense, setExpense] = useState(true)
    const [income, setIncome] = useState(false)

    const [filteredCategory, setFilteredCategory] = useState([])
    const [month, setMonth] = useState(dayjs(new Date()).format('MM/YYYY'));


    /*    console.log(date)
        console.log(month)*/


    const filterCategories = (event) => {
        setIncome(!income);
        setExpense(!expense);
        const typeOfOperation = event.target.dataset.value
        setFilteredCategory(categories.filter(({type}) => type === typeOfOperation));
    }


    const handleSubmit = e => {
        e.preventDefault();

        if (!category || !amount || !date) return
        add({
            category,
            description,
            amount: expense === true ? -amount : amount,
            date: dayjs(new Date(date)).format('DD/MM/YYYY')
        });

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

    useEffect(() => {

    })


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
                padding: '1rem'

            }}>
                <FormFilterButtons filterCategories={filterCategories}/>
                <form style={{
                    width: '100%'
                }} onSubmit={handleSubmit}>
                    <FormControl fullWidth={true} sx={{

                        width: '100%',
                        padding: '5rem',

                    }}>

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

                        <TextField value={amount} label={"Kwota"} type={'text'} InputProps={{inputProps: {min: 0}}} onChange={(e) => {
                            const value = e.target.value;
                            // validate input using regex to accept decimal numbers with up to 2 decimal places
                            setAmount(parseFloat(value))
                        }}>
                        </TextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker inputFormat={'DD/MM/YYYY'} onChange={(date) => {
                                console.log(dayjs(date).format('DD/MM/YYYY'))
                                setDate(dayjs(date).format('MM/DD/YYYY'))
                            }
                            }
                                        value={date}
                                        renderInput={(props) => <TextField {...props}/>} label={'Select date'} />
                        </LocalizationProvider>
                        <Button type={'submit'}>Dodaj</Button>
                    </FormControl>
                </form>
            </Box>
        </>
    )
}

export default SpendingForm