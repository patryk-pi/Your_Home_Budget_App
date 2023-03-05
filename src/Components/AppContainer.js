import React from "react";
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";
import SpendingsOverview from "./SpendingsOverview";


const AppContainer = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar>

                    </AppSidebar>
                    <AppMain>
                        <SpendingsOverview/>

                    </AppMain>
            </div>
        </>
)
}

export default AppContainer;