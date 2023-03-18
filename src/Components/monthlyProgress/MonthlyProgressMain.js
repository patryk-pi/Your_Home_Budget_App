import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import MonthlyProgress from "./MonthlyProgress";




const  MonthlyProgressMain = () => {
    return (
        <>

                <AppMain>
                    <MonthlyProgress />
                </AppMain>

        </>
    )
}

export default MonthlyProgressMain;