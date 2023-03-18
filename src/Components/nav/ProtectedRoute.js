import React, {useContext, useState, useEffect} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppProvider";

const ProtectedRoute = () => {

    const {user} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(false);
    }, []);


    if (isLoading) {
        return null; // or a loading spinner or some other component
    }

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>
}


export default ProtectedRoute;