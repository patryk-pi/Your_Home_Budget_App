import React from "react";
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";
import SpendingsTable from "./SpendingsTable";
import SpendingForm from "./SpendingForm";

const AppContainer = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar />
                <AppMain>
                    <SpendingsTable />
                    <SpendingForm />
                </AppMain>
            </div>
        </>
    )

}

export default AppContainer;