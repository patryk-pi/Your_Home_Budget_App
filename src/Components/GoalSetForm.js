import React, {useState, useEffect, useContext} from "react";
import {Button, FormControl, TextField, Box} from "@mui/material";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {AppContext} from "../context/AppProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

const GoalSetForm = ({description, type, amount}) => {

    const [monthAndYear, setMonthAndYear] = useState(dayjs(new Date()).format("MM/YYYY"));
    const [category, setCategory] = useState("");
    const [goalType, setGoalType] = useState('')
    const [goal, setGoal] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(false)


    const {
        currentMonth,
        currentYear,
        handleAddGoal,
        goals,
        filterGoalsByMonth
    } = useContext(AppContext);


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


    const handleSubmit = e => {
        e.preventDefault();
        setCategoryAndGoal({
            monthAndYear,
            category,
            type,
            goal: type === 'expense' ? -goal : goal
        });
        setInputValue('');
    };

    const handleEdit = e => {
        e.preventDefault();
        setIsDisabled(false)
    }

    useEffect(() => {
        if (categoryAndGoal.monthAndYear && categoryAndGoal.category && categoryAndGoal.goal) {
            handleAddGoal(categoryAndGoal);
            setGoal('');

        }
    }, [categoryAndGoal]);

    const filteredRecords = []

    goals.filter(goalRecord => filterGoalsByMonth(goalRecord)).forEach(goal => filteredRecords.push(goal.category))


    if (filteredRecords.includes(description)) {


        return (
            <>

                <form className="goal__set--form"
                      onFocus={() => {
                          setCategory(description);
                          setGoalType(type)
                          console.log(description, type)
                      }}
                      onSubmit={handleEdit}
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
                                label={"Cel na ten miesiąc dodany!"}
                                style={{
                                    flexGrow: 1
                                }}
                                disabled={!isDisabled}
                            >
                            </NumericFormat>
                            <Button
                                sx={{
                                    boxShadow: 3,
                                    transition: 'all .1s',
                                    color: '#ffca00',
                                    '&:active': {
                                        boxShadow: 1,
                                    },
                                }}
                                startIcon={<EditIcon/>} type={'button'}>Edytuj</Button>
                        </Box>
                    </FormControl>
                </form>
            </>
        )
    }


    return (
        <>

            <form className="goal__set--form"
                  onFocus={() => {
                      setCategory(description);
                      setGoalType(type)
                      console.log(description, type)
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
                            disabled={isDisabled}
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
                            startIcon={<AddCircleOutlineIcon/>} type={'submit'}>Dodaj</Button>
                    </Box>
                </FormControl>

            </form>


        </>
    )

}

export default GoalSetForm