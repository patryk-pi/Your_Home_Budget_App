
import Navbar from "./Components/Navbar";
import OverviewMain from "./Components/OverviewMain";
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import React from "react";
import GoalsSetterMain from "./Components/GoalsSetterMain";
import ExpenseStructureMain from "./Components/expenseStructure/ExpenseStructureMain";
import AppProvider from "./context/AppProvider";
import MonthlyProgressMain from "./Components/monthlyProgress/MonthlyProgressMain";
import SignInMain from "./Components/auth/SingInMain";



function App() {
  return (
   <>
       <AppProvider>
       <HashRouter>
           <Routes>
               <Route path='login' element={<SignInMain />} />
               <Route path='/' element={<OverviewMain />} />
               <Route path='goals' element={<GoalsSetterMain/>} />
               <Route path='expensestructure' element={<ExpenseStructureMain/>} />
               <Route path='monthlyprogress' element={<MonthlyProgressMain/>}/>
           </Routes>
       </HashRouter>
       </AppProvider>
   </>
  );
}

export default App;
