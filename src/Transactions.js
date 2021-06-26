const Transactions = (props) => {

    console.log(props.transactions)

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li>${transaction.amount} at {transaction.updated_at}</li>
                )}
            </ul>
        </>
    )
}

export default Transactions