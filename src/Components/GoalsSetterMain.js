import React from "react";
import AppSidebar from "./nav/AppSidebar";
import AppMain from "./AppMain";
import SpendingsOverview from "./SpendingsOverview";
import GoalsSetter from "./GoalsSetter";



const OverviewMain = () => {
    return (
        <>
            <div className='app__container'>

                <AppSidebar/>
                <AppMain>
                    <GoalsSetter />

                </AppMain>
            </div>
        </>
    )
}

export default OverviewMain;