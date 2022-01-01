const Members = (props) => {

    return (
        <>
            <h1>Members:</h1>
            <ul>
                {props.members.map(member =>
                    <li key={member.id}>{member.name} {member.mode === 'buying' && 'is buying at least'} {member.mode === 'selling' && 'is selling up to'} {member.amount !== 0 && member.amount !== null && `$${member.amount}`} {member.location && `at ${member.location}`}</li>
                )}
            </ul>
        </>
    )
}

export default Members