import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
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