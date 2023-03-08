import React, {useState, useEffect, useContext, useRef} from "react";
import {Button, FormControl, TextField} from "@mui/material";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {AppContext} from "../context/AppProvider";

const GoalSetForm = ({add, description}) => {

    const [monthAndYear, setMonthAndYear] = useState(dayjs(new Date()).format("MM/YYYY"));
    const [category, setCategory] = useState("")
    const [goal, setGoal] = useState(null);
    const [inputValue, setInputValue] = useState('')


    const formRef = useRef(null);

    const {
        currentMonth,
        currentYear,
    } = useContext(AppContext);

    console.log(monthAndYear)

    useEffect(() => {
        const newMonthAndYear = dayjs(`${currentYear}-${currentMonth+1}`).format('MM/YYYY');
        setMonthAndYear(newMonthAndYear);
        console.log(newMonthAndYear)
    }, [currentMonth, currentYear]);


    const [categoryAndGoal, setCategoryAndGoal] = useState({
        monthAndYear,
        category,
        goal
    })



    const handleSubmit = (e) => {
        e.preventDefault();
        setCategoryAndGoal({
            monthAndYear,
            category,
            goal
        });
        setInputValue('');
    };

    useEffect(() => {
        if (categoryAndGoal.monthAndYear && categoryAndGoal.category && categoryAndGoal.goal) {
            add(categoryAndGoal);
            setGoal('');

        }
    }, [categoryAndGoal]);



    return (
        <>

            <form style={{
                width: '100%',
                padding: '2rem 2rem 0'
            }}
            onFocus={() => {
                setCategory(description)
                console.log(description)
            }}
                  onSubmit={handleSubmit}
            >

                <FormControl
                    fullWidth={true}
                    sx={{
                        width: '100%',
                    }}
                >
                    <h3>{description}</h3>
                    <NumericFormat
                        customInput={TextField}
                        label={"Kwota"}
                        type={"text"}
                        decimalScale={2}
                        value={inputValue}
                        allowedDecimalSeparators={[',','.']}
                        InputProps={{inputProps: {min: 0}}}
                        onChange={(e) => {
                        const value = +(e.target.value);
                        console.log(value);
                        setGoal(parseFloat(value));
                            setInputValue(value)
                        }}  >
                    </NumericFormat>
                    <Button type={'submit'}>Dodaj</Button>
                </FormControl>

            </form>


        </>
    )

}

export default GoalSetForm