const Transactions = (props) => {

    return (
        <>
            <h1>Transactions:</h1>
            <ul>
                {props.transactions.map(transaction =>
                    <li>Transaction ID: {transaction.id} / Amount: {transaction.amount}</li>
                )}
            </ul>
        </>
    )
}

export default Transactions