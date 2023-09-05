import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import OverviewMain from "./Components/spendingsTable/OverviewMain";
import GoalsSetterMain from "./Components/goalsSetter/GoalsSetterMain";
import ExpenseStructureMain from "./Components/expenseStructure/ExpenseStructureMain";
import MonthlyProgressMain from "./Components/monthlyProgress/MonthlyProgressMain";
import SignInMain from "./Components/auth/SingInMain";
import ProtectedRoute from "./Components/nav/ProtectedRoute";
import AppSidebar from "./Components/nav/AppSidebar";
import SignUpMain from "./Components/auth/SingUpMain";

function App() {
    return (
        <>
            <div className="app__container">
                <AppProvider>
                    <HashRouter>
                        <AppSidebar />
                        <Routes>
                            <Route path="/login" element={<SignInMain />} />
                            <Route path="/signup" element={<SignUpMain />} />
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="/"
                                    element={<ExpenseStructureMain />}
                                />
                                <Route
                                    path="/expensestructure"
                                    element={<OverviewMain />}
                                />
                                <Route
                                    path="/goals"
                                    element={<GoalsSetterMain />}
                                />
                                <Route
                                    path="/monthlyprogress"
                                    element={<MonthlyProgressMain />}
                                />
                            </Route>
                        </Routes>
                    </HashRouter>
                </AppProvider>
            </div>
        </>
    );
}

export default App;
