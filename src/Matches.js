import React, {useEffect, useState} from 'react'

const Matches = ({offer}) => {

    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/members')
            .then((obj) => obj.json())
            .then(json => setMembers(json))
    }, [])

    const Matches = () => {
        const matches = members.filter(member => offer.mode === 'buying' ? member.mode === 'selling' && member.amount > offer.amount && member.location === offer.location : member.mode === 'buying' && member.amount < offer.amount && member.location === offer.location)
        return (
            <>
                {matches.length > 0
                    ? <h3 style={{color: "green"}}>You've Matched!:</h3>
                    : <h3 style={{color: "red"}}>Your offer has no current matches in the CashClan.</h3>
                }
                <ul>
                    {matches.map(member =>
                        <li key={member.id}>{member.name} {member.mode && member.mode} {member.amount !== 0 && `$${member.amount}`} {member.location && `at ${member.location}`}</li>
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