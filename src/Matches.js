import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'

const Matches = ({offer, memberImage, memberId}) => {

    const [members, setMembers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [transactionTerms, setTransactionTerms] = useState({})

    // Pending Transaction (don't match)
    const pendingTransaction = transactions.find(transaction => transaction.status === 'pending' && (transaction.seller_id === memberId || transaction.buyer_id === memberId))
    const pendingTransactionMatch = pendingTransaction && members.find(member => member.id !== memberId && member.id === (offer.mode === 'buying' ? pendingTransaction.seller_id : pendingTransaction.buyer_id))

    // Match
    const activeMembers = members.filter(member => member.active === true && member.id !== memberId)
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

    // intermittently scan for new matches
    const [time, setTime] = useState(Date.now())
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 5000)
        fetch('https://cashclan-backend.herokuapp.com/members')
            .then((obj) => obj.json())
            .then(json => setMembers(json))
            .catch(error => console.log('error:', error))
        fetch('https://cashclan-backend.herokuapp.com/transactions')
            .then((obj) => obj.json())
            .then(json => setTransactions(json))
            .catch(error => console.log('error:', error))
        // hard refresh if match is inactive (covers them unpublishing or confirming the mutual transaction)
        // ToDo - QA with all six steps.
        if (match) {
            fetch(`https://cashclan-backend.herokuapp.com/members/${match.googleId}`)
                .then((obj) => obj.json())
                .then(json => json && !json.active && window.location.reload(true))
                .catch(error => console.log('error:', error))
        }
        return () => {
            clearInterval(interval)
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