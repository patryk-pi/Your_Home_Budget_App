import React from "react";
import {Link} from "react-router-dom";


const AppSidebar = (props) => {
    return (
        <aside className='app__sidebar'>
            <nav style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Link to='/'>Przegląd miesieczny</Link>
                <Link to='/goals'>Monthly Goals</Link>
            </nav>
        </aside>

    )
}

export default AppSidebar;