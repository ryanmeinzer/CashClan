const Transactions = (props) => {

    // const getTransactionSellerName = (id) => {
    //     fetch(`http://localhost:3000/transactions/${id}`)
    //         .then(response => response.text())
    //         // .then(text => console.log(text))
    //         .then(text => text)
    //         // .then((obj) => obj.json())
    //         // .then(json => JSON.stringify(json))
    //         // .then(json => console.log(JSON.stringify(json)))
    //         // .then(json => json)
    // }

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li key={transaction.id}>Seller: {props.sellerName(transaction.id)} ${transaction.amount} (${(4.44 - 1 - (transaction.amount * .03)).toFixed(2)} saved / ${((1 + transaction.amount * .03)).toFixed(2)} earned)</li>
                )}
            </ul>
        </>
    )
}

export default Transactions