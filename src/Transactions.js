const Transactions = (props) => {

    console.log(props.transactions)

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li>${transaction.amount} (${(4.44 - 1 - (transaction.amount * .03)).toFixed(2)} saved / ${((1 + transaction.amount * .03)).toFixed(2)} earned)</li>
                )}
            </ul>
        </>
    )
}

export default Transactions