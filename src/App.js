
import Navbar from "./Components/Navbar";
import AppContainer from "./Components/AppContainer";
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import React from "react";



function App() {
  return (
   <>
       <Navbar></Navbar>
       <HashRouter>
           <Routes>
               <Route path='/' element={<AppContainer />} />
           </Routes>
       </HashRouter>

   </>
  );
}

export default App;
