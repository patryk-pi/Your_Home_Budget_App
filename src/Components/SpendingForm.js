import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, InputLabel, Select, Input, Button, TextField} from "@mui/material";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import FormFilterButtons from "./FilterButtons";

export const categoriesURL = "http://localhost:3005/categories";


const SpendingForm = ({add}) => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(dayjs(new Date()).format('DD/MM/YYYY'));
    const [month, setMonth] = useState(dayjs(new Date()).format('MM/YYYY'));

    const [filteredCategory, setFilteredCategory] = useState([] )


/*    console.log(date)
    console.log(month)*/


    const filterCategories = (typeOfOperation) => {
        setFilteredCategory(categories.filter( ({ type }) => type === typeOfOperation));
    }


    const handleSubmit = e => {
        e.preventDefault();
        add({
            category,
            description,
            amount,
            date
        })
    }

    useEffect(() => {
        fetch(categoriesURL)
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, []);


    useEffect(() => {
        setFilteredCategory(categories.filter(({type}) => type === "expense"));
    }, [categories] )


    return (
        <>
            <FormFilterButtons filterCategories={filterCategories} />
            <form onSubmit={handleSubmit}>
                <FormControl>
                <InputLabel label={"Kategoria"}>Kategoria</InputLabel>
                <Select
                    value={category}
                    label="Kategoria"
                    onChange={e => setCategory(e.target.value)}
                >
                    {filteredCategory.map(({description, id}) => {
                        return (
                            <MenuItem key={id} value={description}>{description}</MenuItem>
                        )
                    })}
                </Select>
                <TextField label={"Opis"} type={"text"} onChange={e => setDescription(e.target.value)}></TextField>
                <TextField label={"Kwota"} type={'text'} InputProps={{ inputProps: { min: 0 } }} onChange={(e) => {
                    const value = e.target.value;
                    // validate input using regex to accept decimal numbers with up to 2 decimal places
                        setAmount(parseFloat(value))
                    }}>
                    </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker inputFormat={'DD/MM/YYYY'}  onChange={(date) => setDate(dayjs(date).format())} value={date}
                                renderInput={(props) => <TextField {...props}/>} label={'Select date'}/>
                </LocalizationProvider>
                <Button type={'submit'}>Dodaj</Button>
                </FormControl>
            </form>

        </>
    )
}

export default SpendingForm