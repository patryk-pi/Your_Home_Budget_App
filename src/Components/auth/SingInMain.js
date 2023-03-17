import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import {Login} from "@mui/icons-material";




const  SignInMain = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar/>
                <AppMain>
                    <LogIn/>
                </AppMain>
            </div>
        </>
    )
}

export default SignInMain;