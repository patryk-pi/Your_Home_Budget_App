import React from "react";
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";
import SpendingsTable from "./SpendingsTable";


const AppContainer = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar />
                <AppMain>
                    <SpendingsTable />

                </AppMain>
            </div>
        </>
    )

}

export default AppContainer;