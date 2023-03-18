import React from "react";
import AppSidebar from "../nav/AppSidebar";
import AppMain from "../AppMain";
import ExpenseAndIncomeGraph from "./ExpenseAndIncomeGraph";




const ExpenseStructureMain = () => {
    return (
        <>

                <AppMain>
                    <ExpenseAndIncomeGraph  />
                </AppMain>

        </>
    )
}

export default ExpenseStructureMain;