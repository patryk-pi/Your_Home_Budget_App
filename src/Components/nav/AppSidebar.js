import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import {Button} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import logo from "../../img/CompanyLogo.png";
import {auth} from '../../config/firebase'
import { signOut } from 'firebase/auth'
import {AppContext} from "../../context/AppProvider";

const AppSidebar = () => {

    const {setUser, user} = useContext(AppContext)

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    const buttonStyle = {
        height: '7rem',
        fontSize: '1.3rem',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2.5rem',
        color: 'white',
        fontWeight: 600
    }

    const linkStyle = {
        textDecoration: 'none',
        cursor: 'pointer'
    }

    const activeStyle = {
        background: 'rgba(255,255,255,0.2)',
        textDecoration: 'none',
        cursor: 'pointer'
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
                { !user ?
                    <>
                <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Zaloguj</Button></NavLink>
                        <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/signup'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Zarejestruj</Button></NavLink>
                    </> :
                    <>
                <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/overview'><Button endIcon={<CalendarMonthIcon/>}   sx={buttonStyle}  fullWidth={true}>Przegląd miesięczny</Button></NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/goals'><Button endIcon={<EmojiEventsIcon/>} sx={buttonStyle} fullWidth={true}>Cele miesięczne</Button></NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/expensestructure'><Button endIcon={<QueryStatsIcon/>} sx={buttonStyle} fullWidth={true}>Struktura wydatków</Button></NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : linkStyle} to='/monthlyprogress'><Button endIcon={<TrackChangesIcon/>} sx={buttonStyle} fullWidth={true}>Status celów</Button></NavLink>
                <Button style={linkStyle} onClick={handleLogout}><Button endIcon={<TrackChangesIcon/>} sx={buttonStyle} fullWidth={true}>Wyloguj</Button></Button>
                    </>}

            </nav>
        </aside>

    )
}

export default AppSidebar;