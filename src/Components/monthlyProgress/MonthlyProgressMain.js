import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import MonthlyProgress from "./MonthlyProgress";




const  MonthlyProgressMain = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar/>
                <AppMain>
                    <MonthlyProgress />
                </AppMain>
            </div>
        </>
    )
}

export default MonthlyProgressMain;