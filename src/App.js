import operations from "./data/operations";
import SpendingsTable from "./scss/Components/SpendingsTable";
import ButtonAddOperation from "./scss/Components/ButtonAddOperation";


function App() {
  return (
   <>
       <SpendingsTable operations={operations}/>

   </>
  );
}

export default App;
