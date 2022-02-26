import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'

const Matches = ({offer, memberImage, memberId}) => {

    const [members, setMembers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [transactionTerms, setTransactionTerms] = useState({})

    console.log('inside Matches - members:', members)
    console.log('inside Matches - transactions:', transactions)
    console.log('inside Matches - transactionTerms', transactionTerms)
    console.log('inside Matches - offer', offer)
    console.log('inside Matches - memberId:', memberId)

    // Pending Transaction (don't match)
    const pendingTransaction = transactions.find(transaction => transaction.status === 'pending' && (transaction.seller_id === memberId || transaction.buyer_id === memberId))
    console.log('inside Matches - pendingTransaction:', pendingTransaction)
    const pendingTransactionMatch = pendingTransaction && members.find(member => member.id !== memberId && member.id === (offer.mode === 'buying' ? pendingTransaction.seller_id : pendingTransaction.buyer_id))
    console.log('inside Matches - pendingTransactionMatch:', pendingTransactionMatch)

    // Match
    const activeMembers = members.filter(member => member.active === true && member.id !== memberId)
    console.log('inside Matches - activeMembers:', activeMembers)
    const pendingTransactions = transactions.filter(transaction => transaction.status === 'pending')
    console.log('inside Matches - pendingTransactions:', pendingTransactions)
    const activeNoPendingTransactionsMembers = activeMembers.filter(member => !pendingTransactions.find(transaction => transaction.seller_id === member.id || transaction.buyer_id === member.id))
    console.log('inside Matches - activeNoPendingTransactionsMembers:', activeNoPendingTransactionsMembers)
    // const nonmatchedMembers = activeNoPendingTransactionsMembers.filter(member => member.id !== memberId)
    // console.log('inside Matches - nonmatchedMembers:', nonmatchedMembers)
    const matches = activeNoPendingTransactionsMembers.filter(member =>
        offer.mode === 'buying'
            ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location
            : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location
    )
    console.log('inside Matches - matches:', matches)
    // ToDo - potentially make the below sorting algorithm smarter based on net cost/profit
    function sortedMatches() {
        if (offer.mode === 'buying') {
            return matches.sort(function (a, b) {return a.premium - b.premium})
        } else if (offer.mode === 'selling') {
            return matches.sort(function (a, b) {return b.premium - a.premium})
        }
    }
    console.log('inside Matches - sortedMatches:', sortedMatches())
    const topMatch = sortedMatches()[0]
    console.log('inside Matches - topMatch:', topMatch)
    const match = pendingTransaction ? pendingTransactionMatch : topMatch
    console.log('inside Matches - match:', match)

    // ToDo - implement logic to scan for new matches post-offer publishing
    useEffect(() => {
        fetch('https://cashclan-backend.herokuapp.com/members')
            .then((obj) => obj.json())
            .then(json => setMembers(json))
        fetch('https://cashclan-backend.herokuapp.com/transactions')
            .then((obj) => obj.json())
            .then(json => setTransactions(json))
    }, [])

    const [time, setTime] = useState(Date.now())
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 5000)
        // implement a hard refresh if match is inactive (covers them unpublishing or confirming the mutual transaction)
        // ToDo - QA with all six steps. 
        if (match) {
            fetch(`https://cashclan-backend.herokuapp.com/members/${match.googleId}`)
                .then((obj) => obj.json())
                .then(json => !json.active && window.location.reload(true))
                .catch(error => console.log('error:', error))
            // ToDo - implement a hard refresh if pendingTransaction still exists, as it'd be deleted if unmatched (covers instance of a new match). Validate this works and is even necessary given the above hard refresh logic. 
            // ToDo - QA with all six steps. 
        } else if (pendingTransaction) {
            fetch(`https://cashclan-backend.herokuapp.com/transactions/${pendingTransaction.id}`)
                .then((obj) => obj.json())
                .then(json => !json && window.location.reload(true))
                .catch(error => console.log('error:', error))
        }
        return () => {
            clearInterval(interval)
        }
    }, [time, match, pendingTransaction])

    useEffect(() => {
        if (pendingTransaction) {
            console.log('inside Matches -  if (pendingTransaction)')
            setTransactionTerms(pendingTransaction)
        } else if (match) {
            console.log('inside Matches -  if (match)')
            if (offer.mode === 'buying') {
                let averagedPremiums = (offer.premium + match.premium) / 2
                let cost = Math.round(offer.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(offer.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: Number((5 - cost).toFixed(2)),
                    buyer_offer_amount: offer.amount,
                    buyer_offer_premium: offer.premium,
                    seller_offer_amount: match.amount,
                    seller_offer_premium: match.premium,
                    seller_id: match.id,
                    buyer_id: memberId,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
                // return `${Math.round(offer.amount + cost)} (a ${Math.round(averagedPremiums)}% cost)`
            } else if (offer.mode === 'selling') {
                let averagedPremiums = (match.premium + offer.premium) / 2
                let cost = Math.round(match.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(match.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: Number((5 - cost).toFixed(2)),
                    buyer_offer_amount: match.amount,
                    buyer_offer_premium: match.premium,
                    seller_offer_amount: offer.amount,
                    seller_offer_premium: offer.premium,
                    seller_id: memberId,
                    buyer_id: match.id,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
            }
        } else {
            setTransactionTerms({})
        }
    }, [match, offer, pendingTransaction, memberId])
    console.log('inside Matches - transactionTerms:', transactionTerms)

    return (
        <>
            {
                match && transactionTerms
                    ?
                    <Transaction
                        // pendingTransaction={pendingTransaction}
                        mode={offer.mode}
                        transactionTerms={transactionTerms}
                        // location={offer.location}
                        // members={members}
                        memberImage={memberImage}
                        match={match}
                        sortedMatches={sortedMatches()}
                    />
                    :
                    <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
            }
        </>
    )
}

export default Matches