import React, {useContext} from "react";

import GoalSetForm from "./GoalSetForm";

import SpendingsOverviewHeader from "../SpendingsOverviewHeader";
import {AppContext} from "../../context/AppProvider";
import {Box} from '@mui/material'
import GoalsTable from "./GoalsTable";


const GoalsSetter = () => {

    // STATES
    const { categories } = useContext(AppContext)



    return (
        <>
            <SpendingsOverviewHeader />
            <Box sx={{
                height: 'calc(100% - 10rem)',
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
                    padding: '1rem',
                    bgcolor: 'white',
                    boxShadow: 2

                }}>

                    <h2 className='goals__setter__header'>Dodaj cele miesięczne</h2>
                    {categories.sort((a, b) => a.type === 'expense' ? -1 : 1).map(({type, description, id}) => {
                        return (
                            <>
                                <GoalSetForm key={id} type={type} description={description}/>
                            </>
                        )

                    })}

                </Box>

                    <GoalsTable/>

            </Box>
        </>
    )

}

export default GoalsSetter