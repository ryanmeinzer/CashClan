import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'

const Matches = ({members, offer, memberImage, handleActiveChange, memberId, transactions}) => {

    const [transactionTerms, setTransactionTerms] = useState()

    const pendingTransaction = transactions.find(transaction => transaction.status === 'pending' && (transaction.seller_id === memberId || transaction.buyer_id === memberId))
    console.log('inside Matches - pendingTransaction:', pendingTransaction)

    const pendingTransactionMatch = pendingTransaction && members.find(member => member.id !== memberId && member.id === (offer.mode === 'buying' ? pendingTransaction.seller_id : pendingTransaction.buyer_id))
    console.log('inside Matches - pendingTransactionMatch:', pendingTransactionMatch)

    console.log('inside Matches - members:', members)
    console.log('inside Matches - transactions:', transactions)
    console.log('inside Matches - memberId:', memberId)

    const nonmatchedMembers = members.filter(member => member.id !== memberId && !transactions.find(transaction => transaction.status === 'pending' && (transaction.seller_id || transaction.buyer_id) === member.id))
    console.log('inside Matches - nonmatchedMembers:', nonmatchedMembers)

    const matches = nonmatchedMembers && nonmatchedMembers.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location)
    console.log('inside Matches - matches:', matches)

    function sortedMatches() {
        if (offer.mode === 'buying') {
            return matches.sort(function (a, b) {return a.premium - b.premium})
        } else if (offer.mode === 'selling') {
            return matches.sort(function (a, b) {return b.premium - a.premium})
        }
    }

    const topMatch = pendingTransaction ? pendingTransactionMatch : sortedMatches()[0]
    console.log('inside Matches - topMatch:', topMatch)

    useEffect(() => {
        if (pendingTransaction) {
            // const {id, created_at, updated_at, ...pendingTransactionWithoutId} = pendingTransaction
            // setTransactionTerms(pendingTransactionWithoutId)
            setTransactionTerms(pendingTransaction)
        } else if (topMatch) {
            if (offer.mode === 'buying') {
                let averagedPremiums = topMatch && (offer.premium + topMatch.premium) / 2
                let cost = Math.round(offer.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(offer.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: (4.44 - cost.toFixed(2)).toFixed(2),
                    buyer_offer_amount: offer.amount,
                    buyer_offer_premium: offer.premium,
                    seller_offer_amount: topMatch.amount,
                    seller_offer_premium: topMatch.premium,
                    seller_id: topMatch && topMatch.id,
                    buyer_id: memberId,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
                // return `${Math.round(offer.amount + cost)} (a ${Math.round(averagedPremiums)}% cost)`
            } else if (offer.mode === 'selling') {
                let averagedPremiums = topMatch && (topMatch.premium + offer.premium) / 2
                let cost = Math.round(topMatch && topMatch.amount * (averagedPremiums / 100))
                setTransactionTerms({
                    amount: Math.round(topMatch.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost,
                    profit: cost,
                    savings: (4.44 - cost.toFixed(2)).toFixed(2),
                    buyer_offer_amount: topMatch && topMatch.amount,
                    buyer_offer_premium: topMatch && topMatch.premium,
                    seller_offer_amount: offer.amount,
                    seller_offer_premium: offer.premium,
                    seller_id: memberId,
                    buyer_id: topMatch && topMatch.id,
                    location: offer.location,
                    buyer_confirmed: false,
                    seller_confirmed: false,
                })
                // return `${Math.round(topMatch && topMatch.amount + cost)} (a ${Math.round(averagedPremiums)}% profit)`
            }
        } else {
            setTransactionTerms()
        }
        // return setTransactionTerms(null)
    }, [topMatch, offer, pendingTransaction, memberId])

    console.log('inside Matches - transactionTerms:', transactionTerms)

    return (
        <>
            {
                topMatch && transactionTerms
                    ?
                    <Transaction
                        pendingTransaction={pendingTransaction}
                        mode={offer.mode}
                        transactionTerms={transactionTerms}
                        handleActiveChange={handleActiveChange}
                        // location={offer.location}
                        members={members}
                        memberImage={memberImage}
                        topMatch={topMatch}
                        sortedMatches={sortedMatches()}
                    />
                    :
                    <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
            }
        </>
    )
}

export default Matches