import React from "react";
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";
import SpendingsTable from "./SpendingsTable";
import operations from "../data/operations";

const AppContainer = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar>
                </AppSidebar>
                <AppMain>
                    <SpendingsTable operations={operations} />
                </AppMain>
            </div>
        </>
    )

}

export default AppContainer;