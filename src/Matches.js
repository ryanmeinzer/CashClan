import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'

const Matches = ({members, offer, memberImage, handleActiveChange, member_id, transactions}) => {

    const [transactionTerms, setTransactionTerms] = useState()

    // const [pendingTransaction, setPendingTransaction] = useState()
    // console.log('pendingTransaction', pendingTransaction)

    // const pendingTransactions = transactions.filter(transaction => member_id === (transaction.seller_id || transaction.buyer_id) && transaction.status === 'pending')
    // console.log('pending transactions: ', transactions.filter(transaction => member_id === (transaction.seller_id || transaction.buyer_id) && transaction.status === 'pending'))

    // const membersLastPendingTransaction = transactions.filter(transaction => member_id === (transaction.seller_id || transaction.buyer_id) && transaction.status === 'pending')[pendingTransactions.length - 1]
    // console.log('membersLastPendingTransaction', membersLastPendingTransaction)

    // const pendingTransactionMemberMode = membersLastPendingTransaction.buyer_confirmed ? 'selling' : 'buying'
    // // const pendingTransactionMemberMode = offer.mode
    // console.log('pendingTransactionMemberMode', pendingTransactionMemberMode)

    // const pendingTransactionMatch = members.find(member => pendingTransactionMemberMode === 'selling' ? member.id === membersLastPendingTransaction.buyer_id : member.id === membersLastPendingTransaction.seller_id)
    // console.log('pendingTransactionMatch:', pendingTransactionMatch)

    // useEffect(() => {
    //     transactions.filter(transaction => member_id === (transaction.seller_id || transaction.buyer_id) && transaction.status === 'pending') && setPendingTransaction(true)
    // }, [member_id, transactions])

    const matches = members.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location)

    function sortedMatches() {
        if (offer.mode === 'buying') {
            return matches.sort(function (a, b) {return a.premium - b.premium})
        } else if (offer.mode === 'selling') {
            return matches.sort(function (a, b) {return b.premium - a.premium})
        }
    }

    const topMatch = sortedMatches()[0]

    console.log('inside Matches - members:', members)
    console.log('inside Matches - matches:', matches)
    console.log('inside Matches - topMatch:', topMatch)

    useEffect(() => {
        if (topMatch) {
            if (offer.mode === 'buying') {
                let averagedPremiums = topMatch && (offer.premium + topMatch.premium) / 2
                let cost = offer.amount * (averagedPremiums / 100)
                setTransactionTerms({
                    amount: Math.round(offer.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost.toFixed(2),
                    profit: cost.toFixed(2),
                    savings: (4.44 - cost.toFixed(2)).toFixed(2),
                    buyer_offer_amount: offer.amount,
                    buyer_offer_premium: offer.premium,
                    seller_offer_amount: topMatch.amount,
                    seller_offer_premium: topMatch.premium,
                })
                return `${Math.round(offer.amount + cost)} (a ${Math.round(averagedPremiums)}% cost)`
            } else if (offer.mode === 'selling') {
                let averagedPremiums = topMatch && (topMatch.premium + offer.premium) / 2
                let cost = topMatch && topMatch.amount * (averagedPremiums / 100)
                setTransactionTerms({
                    amount: Math.round(topMatch.amount + cost),
                    premium: Math.round(averagedPremiums),
                    cost: cost.toFixed(2),
                    profit: cost.toFixed(2),
                    savings: (4.44 - cost.toFixed(2)).toFixed(2),
                    buyer_offer_amount: topMatch && topMatch.amount,
                    buyer_offer_premium: topMatch && topMatch.premium,
                    seller_offer_amount: offer.amount,
                    seller_offer_premium: offer.premium,
                })
                return `${Math.round(topMatch && topMatch.amount + cost)} (a ${Math.round(averagedPremiums)}% profit)`
            }
        }
    }, [topMatch, offer.mode, offer.premium, offer.amount])

    return (
        <>
            {
                // pendingTransaction
                // ?
                // <div>
                //     <div>
                //         <h3 style={{color: "green"}}>You've Matched and have a pending transaction with {pendingTransactionMatch.name}!</h3>
                //         {
                //             pendingTransactionMatch.image
                //             &&
                //             <span>
                //                 <img src={memberImage} alt="profile" style={{borderRadius: "50%"}} />
                //                 <span style={{fontSize: '5rem'}}>🤝</span>
                //                 <img src={pendingTransactionMatch.image} alt="profile" style={{borderRadius: "50%"}} />
                //             </span>
                //         }
                //     </div>
                //     <p>
                //         Meet now at the ATM inside of {membersLastPendingTransaction.location}. Say "CashClan" while asking for {pendingTransactionMatch.name} who {pendingTransactionMatch.mode === 'buying' && 'will buy'} {pendingTransactionMatch.mode === 'selling' && 'will sell'} $[fill in] cash {pendingTransactionMatch.mode === 'buying' && 'from you'} {pendingTransactionMatch.mode === 'selling' && 'to you'} through Venmo for ${membersLastPendingTransaction.amount}.
                //         {transactionTerms &&
                //             <Transaction
                //                 seller_id={offer.mode === 'selling' ? member_id : pendingTransactionMatch.id} handleActiveChange={handleActiveChange}
                //                 buyer_id={offer.mode === 'buying' ? member_id : pendingTransactionMatch.id}
                //                 mode={offer.mode}
                //                 transactionTerms={transactionTerms}
                //                 location={offer.location}
                //             />
                //         }
                //     </p>
                // </div>
                // :
                <>
                    {
                        matches.length > 0
                            ? <div>
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
                                    Meet now at the ATM inside of {offer.location}. Say "CashClan" while asking for {topMatch.name} who {topMatch.mode === 'buying' && 'will buy'} {topMatch.mode === 'selling' && 'will sell'} ${offer.mode === 'buying' && offer.amount}{offer.mode === 'selling' && topMatch.amount} cash {topMatch.mode === 'buying' && 'from you'} {topMatch.mode === 'selling' && 'to you'} through Venmo for ${transactionTerms?.amount}.
                                    {transactionTerms &&
                                        <Transaction
                                            seller_id={offer.mode === 'selling' ? member_id : topMatch.id} handleActiveChange={handleActiveChange}
                                            buyer_id={offer.mode === 'buying' ? member_id : topMatch.id}
                                            mode={offer.mode}
                                            transactionTerms={transactionTerms}
                                            location={offer.location}
                                        />
                                    }
                                </p>
                            </div>
                            :
                            <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
                    }
                    {
                        matches.length > 1
                        && <div style={{color: 'lightGray'}}>
                            <h4>All Matches (you're meeting with your best):</h4>
                            <ul>
                                {sortedMatches().map(member =>
                                    <li key={member.id}>{member.name} {member.mode === 'buying' && 'will buy at least'} {member.mode === 'selling' && 'will sell up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.mode === 'buying' && 'from you'} {member.mode === 'selling' && 'to you'} for a {member.premium !== 0 && member.premium !== null && `${member.premium}%`} {member.mode === 'buying' && 'cost'} {member.mode === 'selling' && 'profit'} {member.location && `at ${member.location}`}</li>
                                )}
                            </ul>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Matches