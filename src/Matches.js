import React, {useState, useEffect, useLayoutEffect} from 'react'
import Transaction from './Transaction'
import {useMemberContext} from './providers/member'
import _ from 'lodash'

const Matches = ({offer}) => {

    const {member} = useMemberContext()
    const [phoneObj, setPhoneObj] = useState({phone: ''})
    const [members, setMembers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [transactionTerms, setTransactionTerms] = useState({})

    // Pending Transaction (don't match)
    const pendingTransaction = transactions.find(transaction => transaction.status === 'pending' && (transaction.seller_id === member.id || transaction.buyer_id === member.id))
    const pendingTransactionMatch = pendingTransaction && members.find(member => member.id === (offer.mode === 'buying' ? pendingTransaction.seller_id : pendingTransaction.buyer_id))

    // Match
    const activeMembers = members.filter(member => member.active === true)
    const pendingTransactions = transactions.filter(transaction => transaction.status === 'pending')
    const activeNoPendingTransactionsMembers = activeMembers.filter(member => !pendingTransactions.find(transaction => transaction.seller_id === member.id || transaction.buyer_id === member.id))
    const matches = activeNoPendingTransactionsMembers.filter(member =>
        offer.mode === 'buying'
            ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location
            : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location
    )
    // ToDo - potentially make the below sorting algorithm smarter based on net cost/profit
    function sortedMatches() {
        if (offer.mode === 'buying') {
            return matches.sort(function (a, b) {return a.premium - b.premium})
        } else if (offer.mode === 'selling') {
            return matches.sort(function (a, b) {return b.premium - a.premium})
        }
    }
    const topMatch = sortedMatches()[0]
    const match = pendingTransaction ? pendingTransactionMatch : topMatch

    // load new page from browser with new history entry if member has left and returned to app/page
    const onVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
            window.location.href = 'https://cashclan.com/'
        }
    }
    useLayoutEffect(() => {
        document.addEventListener("visibilitychange", onVisibilityChange)
        return () => document.removeEventListener("visibilitychange", onVisibilityChange)
    }, [])

    // intermittently scan for new matches only if the member is viewing app/page
    const [time, setTime] = useState(Date.now())
    useEffect(() => {
        if (document.visibilityState === 'visible') {
            const interval = setInterval(() => setTime(Date.now()), 5000)
            fetch('https://cashclan-backend.herokuapp.com/members')
                .then((obj) => obj.json())
                .then(json => setMembers(json))
                .catch(error => console.log('error:', error))
            fetch('https://cashclan-backend.herokuapp.com/transactions')
                .then((obj) => obj.json())
                .then(json => setTransactions(json))
                .catch(error => console.log('error:', error))
            // hard refresh from server (vs. from cache) if match is inactive (covers them unpublishing or confirming the mutual transaction), unnecessary to load new page (and validate google ID token) from browser as member hasn't left and returned to app/page
            if (match) {
                fetch(`https://cashclan-backend.herokuapp.com/members/${match.id}`)
                    .then((obj) => obj.json())
                    .then(json => json && !json.active && window.location.reload(true))
                    .catch(error => console.log('error:', error))
            }
            return () => {
                clearInterval(interval)
            }
        }
        // eslint-disable-next-line
    }, [time])

    useEffect(() => {
        if (pendingTransaction) {
            setTransactionTerms(pendingTransaction)
        } else if (match) {
            if (offer.mode === 'buying') {
                let averagedPremiums = (offer.premium + match.premium) / 2
                let cost = Math.round(offer.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(offer.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: Number((5.50 - cost).toFixed(2)),
                    buyer_offer_amount: offer.amount,
                    buyer_offer_premium: offer.premium,
                    seller_offer_amount: match.amount,
                    seller_offer_premium: match.premium,
                    seller_id: match.id,
                    buyer_id: member.id,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
            } else if (offer.mode === 'selling') {
                let averagedPremiums = (match.premium + offer.premium) / 2
                let cost = Math.round(match.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(match.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: Number((5.50 - cost).toFixed(2)),
                    buyer_offer_amount: match.amount,
                    buyer_offer_premium: match.premium,
                    seller_offer_amount: offer.amount,
                    seller_offer_premium: offer.premium,
                    seller_id: member.id,
                    buyer_id: match.id,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
            }
        }
    }, [match, offer, pendingTransaction, member])

    const handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        setPhoneObj({...phoneObj, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(phoneObj)
        }
        fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`, requestOptions)
            .then(response => response.json())
            .finally(alert('Thanks for updating your phone!'), handleTogglePhoneForm())
            .catch(error => error)
    }

    const handleTogglePhoneForm = () => {
        const phoneFormDiv = document.getElementById("phoneForm")
        if (phoneFormDiv.style.display !== "none") {
            phoneFormDiv.style.display = "none"
        } else {
            phoneFormDiv.style.display = "block"
        }
        const phoneFormButtonDiv = document.getElementById("phoneFormButton")
        if (phoneFormButtonDiv.style.display !== "none") {
            phoneFormButtonDiv.style.display = "none"
        } else {
            phoneFormButtonDiv.style.display = "block"
        }
    }

    return (
        <>
            {
                match && !_.isEmpty(transactionTerms)
                    ?
                    <Transaction
                        mode={offer.mode}
                        transactionTerms={transactionTerms}
                        match={match}
                        sortedMatches={sortedMatches()}
                    />
                    :
                    <div>
                        <h3 style={{color: "red"}}>There aren't any matches with your offer, but we'll text you once there is!</h3>
                        <div id="phoneForm" style={{display: "none"}}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    name="phone"
                                    value={phoneObj.phone}
                                    placeholder="Your Phone"
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={handleTogglePhoneForm}>Cancel</button>
                                <button type="submit">Confirm Phone</button>
                            </form>
                        </div>
                        <button id="phoneFormButton" onClick={handleTogglePhoneForm} style={{display: "block"}} >Update Phone</button>
                    </div>
            }
        </>
    )
}

export default Matches