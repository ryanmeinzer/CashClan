import React, {useState, useEffect} from 'react'
import {useMemberContext} from './providers/member'

const Transaction = ({mode, transactionTerms, memberImage, match, sortedMatches}) => {

    // ensure transactionId is set for future transaction update
    const [transactionId, setTransactionId] = useState(transactionTerms.id && transactionTerms.id)
    console.log('inside Transaction - transactionId:', transactionId)

    console.log('inside Transaction - transactionTerms.id', transactionTerms.id)

    const {member} = useMemberContext()
    console.log('inside Transaction - member:', member)

    console.log('inside Transaction - match:', match)

    // create pending transaction with matches for either party to confirm/update as complete
    useEffect(() => {
        // ensure new transaction is created only if it's a new transaction (also handled on BE) and to be extra thorough, if the match is active
        if (!transactionTerms.id && match.active) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...transactionTerms, status: 'pending'})
            }
            fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
                .then(response => response.json())
                // ensure transactionId is set correctly for future transaction update
                .then(json => setTransactionId(json.id))
                .catch(error => error)
        } else if (transactionTerms.id) {
            setTransactionId(transactionTerms.id)
        }
    }, [transactionTerms, match])

    // ToDo - implement less memory-intensive route method to refresh both parties' window states upon transaction completion
    // const [time, setTime] = useState(Date.now())
    // useEffect(() => {
    //     const interval = setInterval(() => setTime(Date.now()), 5000)
    //     fetch(`https://cashclan-backend.herokuapp.com/members/${match?.googleId}`)
    //         .then((obj) => obj.json())
    //         .then(json => !json.active ? window.location.reload(true) : console.log('inside Transaction - checked match.active:', json.active))
    //         .catch(error => error)
    //     fetch(`https://cashclan-backend.herokuapp.com/members/${member?.googleId}`)
    //         .then((obj) => obj.json())
    //         .then(json => !json.active ? window.location.reload(true) : console.log('inside Transaction - checked member.active:', json.active))
    //         .catch(error => error)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [time, match, member])

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mode === 'selling'
                ?
                {
                    ...transactionTerms,
                    status: 'complete',
                    seller_confirmed: 'true'
                }
                :
                {
                    ...transactionTerms,
                    status: 'complete',
                    buyer_confirmed: 'true'
                }
            )
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions/${transactionId}`, requestOptions)
            .then(response => response.json())
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
        // BE is setting both parties statuses to inactive after transaction is complete
        // ToDo - swap below with logic to refresh both parties' window states upon transaction completion
        window.location.reload(true)
    }

    return (
        <>
            <div>
                <div>
                    <h3 style={{color: "green"}}>You've Matched with {match.name}!</h3>
                    {
                        match.image
                        &&
                        <span>
                            <img src={memberImage} alt="profile" style={{borderRadius: "50%"}} />
                            <span style={{fontSize: '5rem'}}>🤝</span>
                                <img src={match.image} alt="profile" style={{borderRadius: "50%"}} />
                        </span>
                    }
                </div>
                <p>
                    Meet now at the ATM inside of {transactionTerms.location}. Say "CashClan" while asking for {match.name} who {match.mode === 'buying' && 'will buy'} {match.mode === 'selling' && 'will sell'} ${mode === 'buying' && transactionTerms.amount - transactionTerms.cost}{mode === 'selling' && transactionTerms.amount - transactionTerms.profit} cash {match.mode === 'buying' && 'from you'} {match.mode === 'selling' && 'to you'} through Venmo for ${transactionTerms.amount} (a {transactionTerms.premium}% {mode === 'buying' ? 'cost' : 'profit'}).
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