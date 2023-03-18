import React from "react";
import AppSidebar from "./nav/AppSidebar";
import AppMain from "./AppMain";
import SpendingsOverview from "./SpendingsOverview";



const OverviewMain = () => {
    return (
        <>

                <AppMain>
                    <SpendingsOverview/>

                </AppMain>

        </>
    )
}

export default OverviewMain;