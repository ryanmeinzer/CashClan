import React, {useState} from 'react'

const Transaction = ({seller_id, mode, handleActiveChange, buyer_id, transactionTerms, location, members}) => {

    const [transaction] = useState({
        ...transactionTerms,
        seller_id: seller_id,
        buyer_id: buyer_id,
        seller_confirmed: mode === 'selling' ? true : false,
        buyer_confirmed: mode === 'buying' ? true : false,
        status: 'complete',
        // status: 'pending',
        location: location,
    })

    const sellerGoogleId = members.find(member => member.id === seller_id)?.googleId
    const buyerGoogleId = members.find(member => member.id === buyer_id)?.googleId

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(transaction)
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
            .then(response => response.json())
            // .then(handleActiveChange(false))
            .then(handleActiveChange(false, sellerGoogleId))
            .then(handleActiveChange(false, buyerGoogleId))
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
    }

    return (
        <button onClick={handleSubmit}>Transaction Completed</button>
    )
}

export default Transaction