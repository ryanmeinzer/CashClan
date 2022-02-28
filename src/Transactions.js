// import React, {useState, useEffect} from "react"

const Transactions = (props) => {

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {
                    props.transactions.map(transaction =>
                        <li key={transaction.id}>${transaction.amount} at {transaction.location}</li>
                    )
                }
            </ul>
        </>
    )
}

export default Transactions