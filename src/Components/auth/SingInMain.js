import React from "react";
import AppSidebar from "../AppSidebar";
import AppMain from "../AppMain";
import SignIn from "./SignIn";




const  SignInMain = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar/>
                <AppMain>
                    <SignIn />
                </AppMain>
            </div>
        </>
    )
}

export default SignInMain;