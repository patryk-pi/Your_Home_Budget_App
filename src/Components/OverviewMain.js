import React from "react";
import AppSidebar from "./nav/AppSidebar";
import AppMain from "./AppMain";
import SpendingsOverview from "./SpendingsOverview";



const OverviewMain = () => {
    return (
        <>
            <div className='app__container'>

                <AppSidebar/>
                <AppMain>
                    <SpendingsOverview/>

                </AppMain>
            </div>
        </>
    )
}

export default OverviewMain;