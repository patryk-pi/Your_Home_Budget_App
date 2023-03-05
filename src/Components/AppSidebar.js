import React from "react";
import {Link} from "react-router-dom";


const AppSidebar = (props) => {
    return (
    <aside className='app__sidebar'>
        <Link to='/spendings'>Spendings</Link>
    </aside>
    )
}

export default AppSidebar;