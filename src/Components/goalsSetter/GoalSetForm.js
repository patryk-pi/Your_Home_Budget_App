import React, {useState, useEffect, useContext} from "react";
import {Button, FormControl, TextField, Box} from "@mui/material";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {AppContext} from "../../context/AppProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

const GoalSetForm = ({description, type}) => {

    const [monthAndYear, setMonthAndYear] = useState(dayjs(new Date()).format("MM/YYYY"));
    const [category, setCategory] = useState("");
    const [goalType, setGoalType] = useState('')
    const [goal, setGoal] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [filteredRecords, setFilteredRecords] = useState([])
    const [categoryAndGoal, setCategoryAndGoal] = useState({
        monthAndYear,
        category,
        goal
    })
    const {
        currentMonth,
        currentYear,
        handleAddGoal,
        goals,
        filterGoalsByMonth,
    } = useContext(AppContext);

    useEffect(() => {
        setMonthAndYear(dayjs(`${currentYear}-${currentMonth + 1}`).format('MM/YYYY'));
    }, [currentMonth, currentYear]);



    useEffect(() => {
        setFilteredRecords(goals.filter(goalRecord => filterGoalsByMonth(goalRecord)));
    }, [goals, currentMonth, currentYear]);

    useEffect(() => {
        if (filteredRecords.some(({ category }) => category === description)) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [filteredRecords])


    const handleSubmit = (e) => {
        e.preventDefault();
        setCategoryAndGoal({
            monthAndYear,
            category,
            type,
            goal: type === 'expense' ? -goal : goal
        });
        setIsDisabled(true);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setIsDisabled(false);
    };

    useEffect(() => {
        if (categoryAndGoal.monthAndYear && categoryAndGoal.category && categoryAndGoal.goal !== null) {
            handleAddGoal(categoryAndGoal);
            setCategoryAndGoal({
                monthAndYear,
                category,
                goal: null
            });
            setIsDisabled(true);
        }
    }, [categoryAndGoal]);

    if (isDisabled) {
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '2rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '1.5rem 0',
                    padding: '0 2rem'
                }}>
                    <div style={{flexBasis: '20%', display: 'flex', alignItems: 'center'}} >
                        <h3 className='goal__set__header'>{description}</h3>
                    </div>
                    <p>Cel na ten miesiąc dodany!</p>
                    <Button
                        sx={{
                            boxShadow: 3,
                            transition: 'all .1s',
                            color: '#f08c00',
                            '&:active': {
                                boxShadow: 1,
                            },
                        }}
                        startIcon={<EditIcon/>} type={'button'} onClick={handleEdit}>Edytuj</Button>
                </Box>

            </>
        )

    }



    if (!isDisabled) {
        return (
            <>

                <form className="goal__set--form"
                      onFocus={() => {
                          setCategory(description);
                          setGoalType(type)
                          console.log(description, type)
                      }}
                      onSubmit={handleSubmit}>
                    <h3 className='goal__set__header_form'>{description}</h3>
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
                                disabled={isDisabled}
                                allowedDecimalSeparators={[',', '.']}
                                InputProps={{inputProps: {min: 0}}}
                                onChange={(e) => {
                                    const value = +(e.target.value);
                                    setGoal(parseFloat(value));
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

}

export default GoalSetForm