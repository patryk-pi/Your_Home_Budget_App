import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import logo from "../img/CompanyLogo.png";

const AppSidebar = () => {

    const buttonStyle = {
        height: '7rem',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1.5rem'
    }

    const linkStyle = {
        textDecoration: 'none',

    }


    return (
        <aside className='app__sidebar'>
            <nav style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div className={'navbar__container'}>
                <img src={logo} alt={"logo"} className={'navbar__logo'}/>
                </div>
                <Link style={linkStyle} to='/login'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Zaloguj</Button></Link>
                <Link style={linkStyle} to='/'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Przegląd miesięczny</Button></Link>
                <Link style={linkStyle} to='/goals'><Button endIcon={<EmojiEventsIcon/>} sx={buttonStyle} fullWidth={true}>Cele miesięczne</Button></Link>
                <Link style={linkStyle} to='/expensestructure'><Button endIcon={<QueryStatsIcon/>} sx={buttonStyle} fullWidth={true}>Struktura wydatków</Button></Link>
                <Link style={linkStyle} to='/monthlyprogress'><Button endIcon={<TrackChangesIcon/>} sx={buttonStyle} fullWidth={true}>Status celów</Button></Link>
            </nav>
        </aside>

    )
}

export default AppSidebar;