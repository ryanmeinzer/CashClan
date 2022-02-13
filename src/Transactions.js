// import React, {useState, useEffect} from "react"

const Transactions = (props) => {

    // const [name, setName] = useState('')

    // const getSellerName = (id) => {

    //     fetch(`https://cashclan-backend.herokuapp.com/transactions/${id}`)
    //         .then(response => response.text())
    //         // .then(text => console.log(text))
    //         .then(text => setName(text))
    // }

    // console.log(name)

    // useEffect(() => {
    //     fetch(`https://cashclan-backend.herokuapp.com/transactions/55`)
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

    // const sortedTransactions = props.transactions.sort(function (a, b) {return a.created_at - b.created_at})
    // console.log(sortedTransactions)

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