import React, {useState, useEffect} from 'react'
import {useMemberContext} from './providers/member'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

const Transaction = ({mode, transactionTerms, match, sortedMatches}) => {

    const {member} = useMemberContext()
    const [matchPrivates, setMatchPrivates] = useState()

    // create pending transaction with matches for either party to confirm/update as complete
    useEffect(() => {
        // ensure new transaction is created only if it's a new transaction (also handled on BE)
        if (!transactionTerms.id) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...transactionTerms, status: 'pending'})
            }
            fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
                .then(response => response.json())
                .catch(error => error)
        }
    }, [transactionTerms])

    // get match image and name
    useEffect(() => {
        match &&
            fetch(`https://cashclan-backend.herokuapp.com/members/${match.id}`)
                .then((obj) => obj.json())
                .then(json => setMatchPrivates(json))
    }, [match])

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
        // rid the need for a unique transactionId, for the BE to find accordingly
        fetch(`https://cashclan-backend.herokuapp.com/transactions/${transactionTerms.buyer_id}`, requestOptions)
            .then(response => response.json())
            .finally(alert('Thanks for using CashClan!'))
            .catch(error => error)
        // BE is also setting both parties statuses to inactive after transaction is complete for hard refresh logic in Matches.js
        window.location.reload(true)
    }

    return (
        <>
            {matchPrivates &&
                <div>
                    <div>
                        <div>
                            <h3 style={{color: "green"}}>You've Matched with {matchPrivates.name}!</h3>
                            {
                                matchPrivates.image
                                &&
                                <div>
                                    <div align="center">
                                        <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
                                        <span style={{fontSize: '5rem'}}>🤝</span>
                                        <img src={matchPrivates.image} alt="profile" style={{borderRadius: "50%"}} />
                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={90}
                                            colors={['#089000', '#F7B801', '#A30000', '#A30000']}
                                            colorsTime={[90, 60, 30, 0]}
                                            size={100}
                                            onComplete={() => {
                                                alert("Please don't make your match wait!")
                                                return {shouldRepeat: true, delay: 1.5}
                                            }}
                                        >
                                            {({remainingTime}) => remainingTime}
                                        </CountdownCircleTimer>
                                    </div>
                                </div>
                            }
                        </div>
                        <p>
                            Meet now at the ATM inside of {transactionTerms.location}. Say "CashClan" while asking for {matchPrivates.name} who {match.mode === 'buying' && 'will buy'} {match.mode === 'selling' && 'will sell'} ${mode === 'buying' && transactionTerms.amount - transactionTerms.cost}{mode === 'selling' && transactionTerms.amount - transactionTerms.profit} cash {match.mode === 'buying' && 'from you'} {match.mode === 'selling' && 'to you'} through Venmo for ${transactionTerms.amount} (a {transactionTerms.premium}% {mode === 'buying' ? 'cost' : 'profit'}).
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
                </div>
            }
        </>
    )
}

export default Transaction