import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import SpendingsOverview from "../spendingsTable/SpendingsOverview";
import GoalsSetter from "./GoalsSetter";



const OverviewMain = () => {
    return (
        <>

                <AppMain>
                    <GoalsSetter />

                </AppMain>

        </>
    )
}

export default OverviewMain;