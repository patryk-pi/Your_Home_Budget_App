import React from "react";
import appMenu from "../data/appMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AppSidebar = (props) => {
    return (
    <aside className='app__sidebar'>
        {appMenu.map(el => {
            console.log(el.icon)
            return (
                <>

                </>
            )})}
    </aside>
    )
}

export default AppSidebar;