import React, {useEffect, useState} from 'react'

const Transactions = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then((obj) => obj.json())
            .then(json => setTransactions(json))
    }, [])

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {transactions.map(transaction =>
                    <li>Transaction ID: {transaction.id} / Amount: {transaction.amount}</li>
                )}
            </ul>
        </>
    )
}

export default Transactions