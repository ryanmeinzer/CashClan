import React, {useEffect, useState} from 'react'
import Meet from './Meet'

const Matches = ({offer}) => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch('https://cashclan-backend.herokuapp.com/members')
            .then((obj) => obj.json())
            .then(json => setMembers(json))
    }, [])

    const MatchesSorted = () => {
        const matches = members.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location)

        function sortedMatches() {
            if (offer.mode === 'buying') {
                return matches.sort(function (a, b) {return a.premium - b.premium})
            } else if (offer.mode === 'selling') {
                return matches.sort(function (a, b) {return b.premium - a.premium})
            }
        }

        return (
            <>
                {matches.length > 0
                    ? <h3 style={{color: "green"}}>You've Matched!</h3>
                    : <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
                }
                <ul>
                    {sortedMatches().map(member =>
                        <li key={member.id}>{member.name} {member.mode === 'buying' && 'will buy at least'} {member.mode === 'selling' && 'will sell up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.mode === 'buying' && 'from you'} {member.mode === 'selling' && 'to you'} for a {member.premium !== 0 && member.premium !== null && `${member.premium}%`} {member.mode === 'buying' && 'cost'} {member.mode === 'selling' && 'profit'} {member.location && `at ${member.location}`}</li>
                    )}
                </ul>
                {matches.length > 0
                    && <Meet location={offer.location} active={offer.active} />
                }
            </>
        )
    }

    return (
        <MatchesSorted />
    )
}

export default Matches