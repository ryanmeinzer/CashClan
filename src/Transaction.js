import React, {useState, useEffect} from 'react'

const Transaction = ({mode, transactionTerms, memberImage, topMatch, sortedMatches, pendingTransaction}) => {

    // ensure transactionId is set for future transaction update
    const [transactionId, setTransactionId] = useState()

    // ensure superfluous transaction is not created if pendingTransaction exists
    const [transaction] = useState(pendingTransaction
        ? {...pendingTransaction}
        : {...transactionTerms}
    )

    // create pending transaction with matches for either party to confirm/update as complete
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...transaction, status: 'pending'})
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
            .then(response => response.json())
            // ensure transactionId is set correctly for future transaction update
            .then(json => setTransactionId(json.id))
            .catch(error => error)
        // ensure new transaction is created only if it's a new transaction and to be extra thorough, if the topMatch is active ()
    }, [!pendingTransaction, topMatch.active])

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mode === 'selling'
                ?
                {
                    ...transaction,
                    status: 'complete',
                    seller_confirmed: 'true'
                }
                :
                {
                    ...transaction,
                    status: 'complete',
                    buyer_confirmed: 'true'
                }
            )
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions/${transactionId}`, requestOptions)
            .then(response => response.json())
            // ToDo - handle this in Transaction - set both matches to inactive after transaction is complete; potentially handle from BE
            // .then(handleActiveChange(false, sellerGoogleId))
            // .then(handleActiveChange(false, buyerGoogleId))
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
    }

    // // ToDo - figure out why an additional transaction is being created on the user who's transaction is being deleted by the other users' unpublishing
    // // delete user's pending transaction if setting to inactive (if unpublishing); potentially handle from BE
    // useEffect(() => {
    //     if (deletePendingTransaction) {
    //         fetch('https://cashclan-backend.herokuapp.com/transactions')
    //             .then((obj) => obj.json())
    //             .then(json => json.find(transaction => transaction.status === 'pending' && (transaction.seller_id === memberId || transaction.buyer_id === memberId)))
    //             .then(transaction => {
    //                 transaction &&
    //                     fetch(`https://cashclan-backend.herokuapp.com/transactions/${transaction?.id}`, {
    //                         method: 'DELETE'
    //                     })
    //                         .then((response) => response.json())
    //                         .catch(error => error)
    //             })
    //             .catch(error => error)
    //     }
    //     // prevent deletePendingTransaction from running if active happens to be true
    // }, [deletePendingTransaction, !state.active])

    return (
        <>
            <div>
                <div>
                    <h3 style={{color: "green"}}>You've Matched with {topMatch.name}!</h3>
                    {
                        topMatch.image
                        &&
                        <span>
                            <img src={memberImage} alt="profile" style={{borderRadius: "50%"}} />
                            <span style={{fontSize: '5rem'}}>🤝</span>
                            <img src={topMatch.image} alt="profile" style={{borderRadius: "50%"}} />
                        </span>
                    }
                </div>
                <p>
                    Meet now at the ATM inside of {transaction.location}. Say "CashClan" while asking for {topMatch.name} who {topMatch.mode === 'buying' && 'will buy'} {topMatch.mode === 'selling' && 'will sell'} ${mode === 'buying' && transaction.amount - transaction.cost}{mode === 'selling' && transaction.amount - transaction.profit} cash {topMatch.mode === 'buying' && 'from you'} {topMatch.mode === 'selling' && 'to you'} through Venmo for ${transaction.amount} (a {transaction.premium}% {mode === 'buying' ? 'cost' : 'profit'}).
                </p>
            </div>
            <button onClick={handleSubmit}>Transaction Completed</button>
            <div style={{color: 'lightGray'}}>
                <h4>All Matches (you're meeting with your best):</h4>
                <ul>
                    {sortedMatches.map(member =>
                        <li key={member.id}>{member.name} {member.mode === 'buying' && 'will buy at least'} {member.mode === 'selling' && 'will sell up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.mode === 'buying' && 'from you'} {member.mode === 'selling' && 'to you'} for {member.mode === 'buying' ? 'up to' : 'at least'} a {member.premium !== 0 && member.premium !== null && `${member.premium}%`} {member.mode === 'buying' && 'profit'} {member.mode === 'selling' && 'cost'} {member.location && `at ${member.location}`}</li>
                    )}
                </ul>
            </div>

        </>
    )
}

export default Transaction