import React, {useContext, useState, useEffect} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppProvider";

const ProtectedRoute = () => {

    const {user} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/"  replace/>;
    }

    return <Outlet/>
}


export default ProtectedRoute;