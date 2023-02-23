
import operations from "./data/operations";
import SpendingsTable from "./Components/SpendingsTable";
import Navbar from "./Components/Navbar";



function App() {
  return (
   <>
       <Navbar></Navbar>
       <SpendingsTable operations={operations}/>

   </>
  );
}

export default App;
