import React from "react";
import Table from "@mui/joy/Table";


const SpendingsTable = ({operations, filterOperations}) => {

    if (operations
        .filter((operation) => filterOperations(operation)).length === 0 ) {
        return (

            <div style={{


                border: '1px solid lightgray',
                borderRadius: '20px',
                padding: '2rem',
                height: 'calc(100% - 15rem)',
                overflow: 'scroll',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'


            }}>
            <h1 style={{
                fontSize: '3rem'
            }}>Brak danych :(</h1>
            </div>
        )
    }

    return (

        <div style={{


            border: '1px solid lightgray',
            borderRadius: '20px',
            padding: '2rem',
            height: 'calc(100% - 15rem)',
            overflow: 'scroll'


        }}>
    <Table size="lg"
           stripe='even'
            borderAxis={"none"}
           sx={{
               textAlign: 'center',
               fontSize: '1.4rem',
           }}
           >
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
                    <td className={amount < 0 ? "spendings__table__expense" : "spendings__table__income"}>{amount.toLocaleString('pl', {
                        style: 'currency',
                        currency: 'PLN',
                        minimumFractionDigits: 2,
                        useGrouping: 'always'
                    })}</td>
                    <td>{date}</td>
                </tr>
            ))}
        </tbody>
    </Table>
        </div>
    )
}

export default SpendingsTable;