import React from "react";
import AppSidebar from "../AppSidebar";
import AppMain from "../AppMain";
import ExpenseAndIncomeGraph from "./ExpenseAndIncomeGraph";




const ExpenseStructureMain = () => {
    return (
        <>
            <div className='app__container'>
                <AppSidebar/>
                <AppMain>
                    <ExpenseAndIncomeGraph />
                </AppMain>
            </div>
        </>
    )
}

export default ExpenseStructureMain;