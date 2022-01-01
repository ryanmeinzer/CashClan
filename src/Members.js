const Members = (props) => {

    return (
        <>
            <h1>Members:</h1>
            <ul>
                {props.members.map(member =>
                    <li key={member.id}>{member.name} {member.mode === 'buying' && 'is buying at least'} {member.mode === 'selling' && 'is selling up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.mode === 'buying' && 'and is willing to pay up to a '} {member.mode === 'selling' && 'and must earn at least a '} {member.premium !== 0 && member.premium !== null && `${member.premium}%`} {member.mode === 'buying' && 'cost'} {member.mode === 'selling' && 'profit'} {member.location && `at ${member.location}`}</li>
                )}
            </ul>
        </>
    )
}

export default Members