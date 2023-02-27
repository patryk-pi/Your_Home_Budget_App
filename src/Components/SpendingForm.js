import React, {useEffect, useState} from "react";
import {FormControl, MenuItem, InputLabel, Select, Input} from "@mui/material";

export

const SpendingForm = () => {

    const [category, setCategory] = useState('')

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    const categories = ['Kredyty', 'Czynsz', 'Rachunki', 'Jedzenie', 'Transport', 'Rozrywka', 'Sport', 'Ubrania', 'Zdrowie'];


    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Kategoria</InputLabel>
                <Select
                    value={category}
                    label="Kategoria"
                    onChange={handleChange}
                >
                    {categories.map((category, id) => {
                        return (
                            <MenuItem key={id} value={category}>{category}</MenuItem>
                        )
                    })}
                </Select>


            </FormControl>

        </>
    )
}

export default SpendingForm;