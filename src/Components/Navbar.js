import React from "react";
import logo from '../img/CompanyLogo.png'

const Navbar = () => {


    return(
        <nav className='navbar'>
            <img src={logo} alt={"logo"} className={'navbar__logo'}/>
        </nav>
    )
}

export default Navbar;
