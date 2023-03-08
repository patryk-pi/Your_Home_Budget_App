import React, {useState, useEffect, useContext} from "react";
import {Button, FormControl, TextField, Box} from "@mui/material";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {AppContext} from "../context/AppProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const GoalSetForm = ({add, description}) => {

    const [monthAndYear, setMonthAndYear] = useState(dayjs(new Date()).format("MM/YYYY"));
    const [category, setCategory] = useState("")
    const [goal, setGoal] = useState(null);
    const [inputValue, setInputValue] = useState('')


    const {
        currentMonth,
        currentYear,
    } = useContext(AppContext);

    console.log(monthAndYear)

    useEffect(() => {
        const newMonthAndYear = dayjs(`${currentYear}-${currentMonth + 1}`).format('MM/YYYY');
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

            <form className="goal__set--form"
                  onFocus={() => {
                      setCategory(description)
                      console.log(description)
                  }}
                  onSubmit={handleSubmit}
            >
                <h3 className='goal__set__header'>{description}</h3>
                <FormControl
                    fullWidth={true}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        gap: '2rem',
                    }}>
                        <NumericFormat
                            customInput={TextField}
                            label={"Kwota"}
                            type={"text"}
                            decimalScale={2}
                            style={{
                                flexGrow: 1
                            }}
                            value={inputValue}
                            allowedDecimalSeparators={[',', '.']}
                            InputProps={{inputProps: {min: 0}}}
                            onChange={(e) => {
                                const value = +(e.target.value);
                                console.log(value);
                                setGoal(parseFloat(value));
                                setInputValue(value)
                            }}>
                        </NumericFormat>
                        <Button
                            sx={{
                                boxShadow: 3,
                                transition: 'all .1s',
                                '&:active': {
                                    boxShadow: 1,
                                },
                            }}
                            startIcon={<AddCircleOutlineIcon />} type={'submit'}>Dodaj</Button>
                    </Box>
                </FormControl>

            </form>


        </>
    )

}

export default GoalSetForm