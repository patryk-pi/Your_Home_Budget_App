import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import OverviewMain from "./Components/OverviewMain";
import GoalsSetterMain from "./Components/GoalsSetterMain";
import ExpenseStructureMain from "./Components/expenseStructure/ExpenseStructureMain";
import MonthlyProgressMain from "./Components/monthlyProgress/MonthlyProgressMain";
import SignInMain from "./Components/auth/SingInMain";
import ProtectedRoute from "./Components/nav/ProtectedRoute";
import AppSidebar from "./Components/nav/AppSidebar";
import SignUpMain from "./Components/auth/SingUpMain";
import LoggedInRoute from "./Components/nav/LoggedInRoute";

function App() {

    return (
        <>
            <div className="app__container">
            <AppProvider>


                <HashRouter>
                    <AppSidebar />
                    <Routes>
                        <Route path="/" element={<SignInMain />} />
                        <Route path="/signup" element={<SignUpMain />} />
                        <Route element={<ProtectedRoute mode={'loggedIn'} />}>
                            <Route path="/overview" element={<OverviewMain />} />
                            <Route path="/goals" element={<GoalsSetterMain />} />
                            <Route path="/expensestructure" element={<ExpenseStructureMain />} />
                            <Route path="/monthlyprogress" element={<MonthlyProgressMain />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </AppProvider>
            </div>
        </>
    );
}

export default App;
