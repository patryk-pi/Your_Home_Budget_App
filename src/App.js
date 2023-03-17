import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import Navbar from "./Components/Navbar";
import OverviewMain from "./Components/OverviewMain";
import GoalsSetterMain from "./Components/GoalsSetterMain";
import ExpenseStructureMain from "./Components/expenseStructure/ExpenseStructureMain";
import MonthlyProgressMain from "./Components/monthlyProgress/MonthlyProgressMain";
import SignInMain from "./Components/auth/SingInMain";
import ProtectedRoute from "./Components/nav/ProtectedRoute";

function App() {


    return (
        <>
            <AppProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<SignInMain />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/overview" element={<OverviewMain />} />
                            <Route path="/goals" element={<GoalsSetterMain />} />
                            <Route path="/expensestructure" element={<ExpenseStructureMain />} />
                            <Route path="/monthlyprogress" element={<MonthlyProgressMain />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </AppProvider>
        </>
    );
}

export default App;
