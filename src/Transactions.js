// import React, {useState, useEffect} from "react"

const Transactions = (props) => {

    // const [name, setName] = useState('')

    // const getSellerName = (id) => {
        
    //     fetch(`http://localhost:3000/transactions/${id}`)
    //         .then(response => response.text())
    //         // .then(text => console.log(text))
    //         .then(text => setName(text))
    // }

    // console.log(name)

    // useEffect(() => {
    //     fetch(`http://localhost:3000/transactions/55`)
    //         .then(response => response.text())
    //         .then(text => console.log(text))
    //         // .then(text => setName(text))
    // }, [])

    // const transactionsWithSellerNames = 
    //     <ul>
    //         {props.transactions.map(transaction =>
    //             <li key={transaction.id}>${transaction.amount} (${(4.44 - 1 - (transaction.amount * .03)).toFixed(2)} saved / ${((1 + transaction.amount * .03)).toFixed(2)} earned)</li>
    //         )}
    //     </ul>

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li key={transaction.id}>${transaction.amount} (${(4.44 - 1 - (transaction.amount * .03)).toFixed(2)} saved / ${((1 + transaction.amount * .03)).toFixed(2)} earned)</li>
                )}
            </ul>
        </>
    )
}

export default Transactions