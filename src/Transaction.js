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
            .then(window.location.href = 'https://cashclan.com/')
            .catch(error => error)
        // BE is also setting both parties statuses to inactive after transaction is complete for hard refresh logic in Matches.js; load new page from browser with new history entry if member confirms transaction
        // window.location.href = 'https://cashclan.com/'
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
                                            <span style={{position: "relative"}}>
                                                <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
                                                <span style={{position: "absolute", top: -75, right: 0}}>✅</span>
                                            </span>
                                            <span style={{fontSize: '5rem'}}> 🤝 </span>
                                            <span style={{position: "relative"}}>
                                                <img src={matchPrivates.image} alt="profile" style={{borderRadius: "50%"}} />
                                                <span style={{position: "absolute", top: -75, right: 0}}>✅</span>
                                            </span>
                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={90}
                                            colors={['#089000', '#F7B801', '#A30000', '#A30000']}
                                            colorsTime={[90, 60, 30, 0]}
                                            size={100}
                                                onComplete={() => {
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
                    <button type="submit" onClick={handleSubmit}>Transaction Completed</button>
                </div>
            }
        </>
    )
}

export default Transaction