import React, {useContext} from "react";

import GoalSetForm from "./GoalSetForm";

import SpendingsOverviewHeader from "./SpendingsOverviewHeader";
import {AppContext} from "../context/AppProvider";
import {Box} from '@mui/material'
import GoalsTable from "./GoalsTable";


const GoalsSetter = () => {

    // STATES
    const { categories} = useContext(AppContext)


    // FUNCTION CREATING AN OBJECT WITH THE GOAL FOR THE SELECTED MONTH AND CATEGORY


    return (
        <>
            <SpendingsOverviewHeader />
            <Box sx={{
                height: 'calc(100% - 8rem)',
                display: 'flex',
                padding: '2rem',
                gap: '2rem',
                flexShrink: 1,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "35%",
                    border: '1px solid lightgray',
                    overflow: 'scroll',
                    height: '100%',
                    borderRadius: '20px',
                    padding: '1rem'

                }}>

                    <h2 className='goals__setter__header'>Dodaj cele miesięczne</h2>
                    {categories.map(({type, description, id}) => {
                        return (
                            <>
                                <GoalSetForm key={id} type={type} description={description}/>
                            </>
                        )

                    })}

                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "65%",
                    border: '1px solid lightgray',
                    overflow: 'scroll',
                    height: '100%',
                    borderRadius: '20px',
                    padding: '1rem'

                }}>
                    <GoalsTable/>
                </Box>
            </Box>
        </>
    )

}

export default GoalsSetter