
import Navbar from "./Components/Navbar";
import OverviewMain from "./Components/OverviewMain";
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import React from "react";
import GoalsSetterMain from "./Components/GoalsSetterMain";
import ExpenseStructureMain from "./Components/expenseStructure/ExpenseStructureMain";
import AppProvider from "./context/AppProvider";



function App() {
  return (
   <>
       <AppProvider>
       <Navbar></Navbar>
       <HashRouter>
           <Routes>
               <Route path='/' element={<OverviewMain />} />
               <Route path='goals' element={<GoalsSetterMain/>} />
               <Route path='expensestructure' element={<ExpenseStructureMain/>} />
           </Routes>
       </HashRouter>
       </AppProvider>
   </>
  );
}

export default App;
