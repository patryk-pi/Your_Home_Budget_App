
import Navbar from "./Components/Navbar";
import OverviewMain from "./Components/OverviewMain";
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import React from "react";
import GoalsSetterMain from "./Components/GoalsSetterMain";



function App() {
  return (
   <>
       <Navbar></Navbar>
       <HashRouter>
           <Routes>
               <Route path='/' element={<OverviewMain />} />
               <Route path='goals' element={<GoalsSetterMain/>} />
           </Routes>
       </HashRouter>

   </>
  );
}

export default App;
