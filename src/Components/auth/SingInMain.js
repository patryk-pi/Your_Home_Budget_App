import React from "react";
import AppSidebar from "../AppSidebar";
import AppMain from "../AppMain";
import LogIn from "./LogIn";
import SignUp from "./SignUp";




const  SignInMain = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar/>
                <AppMain>
                    <SignUp/>
                </AppMain>
            </div>
        </>
    )
}

export default SignInMain;