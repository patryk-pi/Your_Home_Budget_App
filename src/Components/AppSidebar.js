import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const AppSidebar = (props) => {

    const buttonStyle = {
        height: '7rem',
        fontSize: '1.5rem',
    }

    const linkStyle = {
        textDecoration: 'none'
    }


    return (
        <aside className='app__sidebar'>
            <nav style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Link style={linkStyle} to='/'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Przegląd miesięczny</Button></Link>
                <Link style={linkStyle} to='/goals'><Button endIcon={<EmojiEventsIcon/>} sx={buttonStyle} fullWidth={true}>Cele miesięczne</Button></Link>
            </nav>
        </aside>

    )
}

export default AppSidebar;