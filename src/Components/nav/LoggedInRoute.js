/*import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const LoggedInRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(AppContext);

    if (user) {
        return <Navigate to="/overview" replace />;
    }

    return <Route element={<Component />} {...rest} />;
};

export default LoggedInRoute;*/
