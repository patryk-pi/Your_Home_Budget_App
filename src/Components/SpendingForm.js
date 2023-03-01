import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, InputLabel, Select, Input, Button, TextField} from "@mui/material";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const categoriesURL = "http://localhost:3005/categories";


const SpendingForm = ({add}) => {


    // const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [value, setValue] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(dayjs.date)




    const handleSubmit = e => {
        e.preventDefault();
        add({
            category,
            description,
            amount,
            date
        })
    }


/*    const handleChange = (event, setValue) => {
        setValue(prev => ({
            ...prev,
            changedValue: event.target.value
        }))
    }*/


   /* const handleCategoryChange = (e) => {
        setValues(prev => ({
                ...prev,
                category: e.target.value
            })
        )
    }*/

    // const categories = ['Kredyty', 'Czynsz', 'Rachunki', 'Jedzenie', 'Transport', 'Rozrywka', 'Sport', 'Ubrania', 'Zdrowie'];

    useEffect(() => {
        fetch(categoriesURL)
            .then(r => r.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormControl>
                <InputLabel label={"Kategoria"}>Kategoria</InputLabel>
                <Select
                    value={category}
                    label="Kategoria"
                    onChange={e => setCategory(e.target.value)}
                >
                    {categories.map(({description}, id) => {
                        return (
                            <MenuItem key={id} value={description}>{description}</MenuItem>
                        )
                    })}
                </Select>
                <TextField label={"Opis"} onChange={e => setDescription(e.target.value)}></TextField>
                <TextField label={"Kwota"} type={'number'} onChange={e => setAmount(+e.target.value)}></TextField>
              {/*  <LocalizationProvider dateAdapter={AdapterDayjs} onChange={e => handleChange(e, date, setDate)}>
                    <DatePicker inputFormat={'DD/MM/YYYY'} onChange={(newValue) => setValue(newValue)} value={date}
                                renderInput={(props) => <TextField {...props}/>} label={'Select date'}/>
                </LocalizationProvider>*/}
                <Button type={'submit'}>Dodaj</Button>
                </FormControl>
            </form>

        </>
    )
}

export default SpendingForm