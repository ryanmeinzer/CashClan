import React, {useState, useEffect} from "react"

const Transactions = (props) => {

    const [name, setName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/transactions/${props.transactions[0].id}`)
            .then(response => response.text())
            // .then(text => console.log(text))
            .then(text => setName(text))
    }, [])

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li key={transaction.id}>${transaction.amount} (${(4.44 - 1 - (transaction.amount * .03)).toFixed(2)} saved / ${((1 + transaction.amount * .03)).toFixed(2)} earned)</li>
                )}
            </ul>
            {/* <p>{name}</p> */}
        </>
    )
}

export default Transactions