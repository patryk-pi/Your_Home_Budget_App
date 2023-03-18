import React, { useContext } from "react";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";
import {Box} from "@mui/material";
import MonthlyBalanceOverview from "./MonthlyBalanceOverview";
import {ProgressBar} from "react-loader-spinner";
import variables from '../scss/settings/_variables.scss'
import {AppContext} from "../context/AppProvider";

import SpendingsOverviewHeader from "./SpendingsOverviewHeader";

const {colorPrimary} = variables


const SpendingsOverview = () => {

// APP PROVIDER
    const {
        currentMonth,
        operations,
        loadingOperations,
        handleAdd,
        filterOperationsByMonth,
        user
    } = useContext(AppContext);

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
                <SpendingForm add={handleAdd}/>
                <div style={{
                    height: '100%',

                    width: '70%',
                    // border: '1px solid lightgray',
                    // borderRadius: '20px',
                }}>
                    {loadingOperations ?
                        < >
                            <MonthlyBalanceOverview operations={operations} filterOperations={filterOperationsByMonth}/>
                            <SpendingsTable operations={operations} filterOperations={filterOperationsByMonth}
                                            currentMonth={currentMonth}/>
                        </> :
                        <div style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ProgressBar
                                height="180"
                                width="180"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor={colorPrimary}
                                barColor='#ddd'
                            />
                        </div>
                    }

                </div>
            </Box>
        </>
    )
}
export default SpendingsOverview


