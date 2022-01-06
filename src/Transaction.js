import React, {useState} from 'react'

const Transaction = ({seller_id, mode, handleActiveChange, buyer_id, amount, location}) => {

    const [transaction] = useState({
        seller_id: seller_id,
        buyer_id: buyer_id,
        seller_confirmed: mode === 'buying' ? false : true,
        buyer_confirmed: mode === 'selling' ? false : true,
        status: 'pending',
        amount: amount,
        location: location,
    })

    // ToDo - find or create a transaction (vs. just create)
    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(transaction)
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
            .then(response => response.json())
            .then(handleActiveChange(false))
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
    }

    return (
        <button onClick={handleSubmit}>Transaction Completed</button>
    )
}

export default Transaction