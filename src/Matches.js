import React, {useEffect, useState} from 'react'

const Matches = ({offer}) => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch('https://cashclan-backend.herokuapp.com/members')
            .then((obj) => obj.json())
            .then(json => setMembers(json))
    }, [])

    const Matches = () => {
        const matches = members.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount >= offer.amount && member.premium <= offer.premium && member.location === offer.location : member.mode === 'buying' && member.amount <= offer.amount && member.premium >= offer.premium && member.location === offer.location)
        return (
            <>
                {matches.length > 0
                    ? <h3 style={{color: "green"}}>You've Matched!:</h3>
                    : <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
                }
                <ul>
                    {matches.map(member =>
                        // <li key={member.id}>{member.name} {member.mode === 'buying' && 'is buying at least'} {member.mode === 'selling' && 'is selling up to'} {member.amount !== 0 && `$${member.amount}`} {member.location && `at ${member.location}`}</li>
                        <li key={member.id}>{member.name} {member.mode === 'buying' && 'will buy at least'} {member.mode === 'selling' && 'will sell up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.mode === 'buying' && 'and will pay up to a '} {member.mode === 'selling' && 'and must earn at least a '} {member.premium !== 0 && member.premium !== null && `${member.premium}%`} {member.mode === 'buying' && 'cost'} {member.mode === 'selling' && 'profit'} {member.location && `at ${member.location}`}</li>
                    )}
                </ul>
            </>
        )
    }

    return (
        <Matches />
    )
}

export default Matches