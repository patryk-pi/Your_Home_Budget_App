import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import {Login} from "@mui/icons-material";




const  SignUpMain = () => {
    return (
        <>
            <AppMain>
                <SignUp/>
            </AppMain>
        </>
    )
}

export default SignUpMain;