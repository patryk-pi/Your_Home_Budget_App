import React, {useContext, useState, useEffect} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppProvider";

const ProtectedRoute = () => {

    const {user, loadingUser} = useContext(AppContext);

    if(loadingUser) {
        return null
    }

    if (!user) {
        return <Navigate to="/login"  replace/>;
    }

    return <Outlet/>
}


export default ProtectedRoute;