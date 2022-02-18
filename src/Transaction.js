import React, {useState, useEffect} from 'react'

const Transaction = ({pendingTransaction, mode, handleActiveChange, transactionTerms, members, memberImage, topMatch, sortedMatches}) => {

    // ToDo - ensure correct transactionId for update and that unmatched/ursurped transactions are being deleted
    const [transaction] = useState({...transactionTerms})

    const [transactionId, setTransactionId] = useState(pendingTransaction ? pendingTransaction.id : transactionTerms.id)
    console.log('inside Transaction - transactionId:', transactionId)

    // const [transaction] = useState(pendingTransaction
    //     ? {...pendingTransaction}
    //     : {...transactionTerms}
    // )

    // const [transactionId, setTransactionId] = useState(pendingTransaction && pendingTransaction.id)
    // console.log('inside Transaction - transactionId:', transactionId)

    console.log('inside Transaction - transaction:', transaction)
    console.log('inside Transaction - transactionTerms:', transactionTerms)
    // console.log('inside Transaction - mode:', mode)

    const sellerGoogleId = members.find(member => member.id === transaction.seller_id)?.googleId
    const buyerGoogleId = members.find(member => member.id === transaction.buyer_id)?.googleId

    // const sellerName = members.find(member => member.id === seller_id)?.name
    // const buyerName = members.find(member => member.id === buyer_id)?.name

    // create pending transaction with matches for either party to confirm/update as complete
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...transaction, status: 'pending'})
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
            .then(response => response.json())
            // ensure transactionId is set correctly for transaction update
            .then(json => setTransactionId(json.id))
            .catch(error => error)
    }, [transaction])

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
            // .then(handleActiveChange(false))
            .then(handleActiveChange(false, sellerGoogleId))
            .then(handleActiveChange(false, buyerGoogleId))
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
    }

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