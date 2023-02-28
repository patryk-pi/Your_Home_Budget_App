import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, InputLabel, Select, Input, Button, TextField} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const categoriesURL = "http://localhost:3005/categories";


const SpendingForm = ( ) => {



    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState(null);

    const [values, setValues] = useState({
        expenseCategory:"",
        description: "",
        amount: "",
        date: ""
    })


    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }








    // const categories = ['Kredyty', 'Czynsz', 'Rachunki', 'Jedzenie', 'Transport', 'Rozrywka', 'Sport', 'Ubrania', 'Zdrowie'];

    useEffect(() => {
        fetch(categoriesURL)
            .then( r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            <FormControl>
                <InputLabel label={"Kategoria"}>Kategoria</InputLabel>
                <Select
                    value={category}
                    label="Kategoria"
                    onChange={handleCategoryChange}
                >
                    {categories.map(( { description }, id) => {
                        return (
                            <MenuItem key={id} value={description}>{description}</MenuItem>
                        )
                    })}
                </Select>
                <TextField label={"Opis" }></TextField>
                <TextField label={"Kwota"} type={'number'}  ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker inputFormat={'DD/MM/YYYY'} onChange={(newValue) => setValue(newValue)} value={value} renderInput={(props) => <TextField {...props}/>}  label={'Select date'} />
                </LocalizationProvider>
                <Button type={'submit'}>Dodaj</Button>

            </FormControl>

        </>
    )
}

export default SpendingForm