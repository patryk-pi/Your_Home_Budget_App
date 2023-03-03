import React from "react";
import Table from "@mui/joy/Table";


const SpendingsTable = ({operations, filterOperations}) => {

    if (operations
        .filter((operation) => filterOperations(operation)).length === 0 ) {
        return (
            <h1>Brak danych</h1>
        )
    }

    return (

    <Table size="lg"
           stripe='even'
            borderAxis={"none"}
           sx={{
        textAlign: 'center',
        fontSize: '1.4rem',
    }}>
        <thead >
        <tr >
            <th className='spendings__table__head'>Kategoria</th>
            <th className='spendings__table__head'>Opis</th>
            <th className='spendings__table__head'>Kwota</th>
            <th className='spendings__table__head'>Data</th>

        </tr>
        </thead>
        <tbody >

        {operations
            .filter((operation) => filterOperations(operation))
            .map(({category, description, amount, date, id},) => (
                <tr key={id} >
                    <td>{category}</td>
                    <td>{description}</td>
                    <td className={amount < 0 ? "spendings__table__expense" : "spendings__table__income"}>{amount}</td>
                    <td>{date}</td>
                </tr>
            ))}
        </tbody>
    </Table>
    )
}

export default SpendingsTable;