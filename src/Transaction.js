import React, {useState, useEffect} from 'react'
import {useMemberContext} from './providers/member'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Transaction = ({mode, transactionTerms, match, isMd}) => {

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

    // Uphold default behavior of the submit DOM object event to refresh browser if member confirms transaction (ie do not use event.preventDefault()). BE is also setting both parties' statuses to inactive after transaction is complete for hard refresh logic if still inside Matches.js.
    const handleSubmit = () => {
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
            .catch(error => error)
    }

    return (
        <Box>
            {matchPrivates &&
                <Box>
                    <Box>
                        <Box>
                            <Typography fontSize='1.5rem' variant="subtitle1" color="text.secondary" component="p" sx={{mb: 4}}>You've Matched with <br />{matchPrivates.name}!</Typography>
                            {
                                matchPrivates.image
                                &&
                                <Box>
                                    <Box sx={{align: "center"}}>
                                        <Box sx={{mb: 2}}>
                                            <span style={{position: "relative"}}>
                                                <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
                                                <span style={{position: "absolute", top: -75, right: 0}}>✅</span>
                                            </span>
                                            <span style={{fontSize: '5rem'}}> 🤝 </span>
                                            <span style={{position: "relative"}}>
                                                <img src={matchPrivates.image} alt="profile" style={{borderRadius: "50%"}} />
                                                <span style={{position: "absolute", top: -75, right: 0}}>✅</span>
                                            </span>
                                            </Box>
                                        <CountdownCircleTimer
                                            isPlaying
                                            duration={90}
                                                colors={['#33cc70', '#ffb84d', '#A30000', '#A30000']}
                                            colorsTime={[90, 60, 30, 0]}
                                            size={100}
                                                onComplete={() => {
                                                    return {shouldRepeat: true}
                                            }}
                                        >
                                                {({remainingTime}) => <Typography color="text.secondary">{remainingTime}</Typography>}
                                        </CountdownCircleTimer>
                                        </Box>
                                    </Box>
                            }
                        </Box>
                        <Typography color="primary.dark" variant="h6" fontStyle="italic" sx={{mt: 4, mb: 3}}>
                            Meet now at the ATM inside of {transactionTerms.location}. Say "CashClan" while asking for {matchPrivates.name} who {match.mode === 'buying' && 'will buy'} {match.mode === 'selling' && 'will sell'} ${mode === 'buying' && transactionTerms.amount - transactionTerms.cost}{mode === 'selling' && transactionTerms.amount - transactionTerms.profit} cash {match.mode === 'buying' && 'from you'} {match.mode === 'selling' && 'to you'} through Venmo for ${transactionTerms.amount} (a {transactionTerms.premium}% {mode === 'buying' ? 'cost' : 'profit'}).
                        </Typography>
                    </Box>
                    <Button
                        fullWidth={!isMd}
                        type="submit"
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                    >Transaction Completed</Button>
                </Box>
            }
        </Box>
    )
}

export default Transaction