// import Transaction from './Transaction'

const Matches = ({members, offer, memberImage}) => {

    const matches = members.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location)

    function sortedMatches() {
        if (offer.mode === 'buying') {
            return matches.sort(function (a, b) {return a.premium - b.premium})
        } else if (offer.mode === 'selling') {
            return matches.sort(function (a, b) {return b.premium - a.premium})
        }
    }

    const topMatch = sortedMatches()[0]

    function transactionAmount() {
        if (offer.mode === 'buying') {
            let averagedPremiums = topMatch && (offer.premium + topMatch.premium) / 2
            let fee = offer.amount * (averagedPremiums / 100)
            // setPendingTransaction({seller: topMatch.id})
            return `${Math.round(offer.amount + fee)} (a ${Math.round(averagedPremiums)}% cost)`
        } else if (offer.mode === 'selling') {
            let averagedPremiums = topMatch && (topMatch.premium + offer.premium) / 2
            let fee = topMatch && topMatch.amount * (averagedPremiums / 100)
            return `${Math.round(topMatch && topMatch.amount + fee)} (a ${Math.round(averagedPremiums)}% profit)`
        }
    }

    return (
        <>
            {matches.length > 0
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
                    <p>Meet now at the ATM inside of {offer.location}. Say "CashClan" while asking for {topMatch.name} who {topMatch.mode === 'buying' && 'will buy'} {topMatch.mode === 'selling' && 'will sell'} ${offer.mode === 'buying' && offer.amount}{offer.mode === 'selling' && topMatch.amount} cash {topMatch.mode === 'buying' && 'from you'} {topMatch.mode === 'selling' && 'to you'} through Venmo for ${topMatch && transactionAmount()}.</p>  
                </div>
                : <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
            }
            {/* <Transaction /> */}
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
    )
}

export default Matches