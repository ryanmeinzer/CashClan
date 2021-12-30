const Members = (props) => {

    return (
        <>
            <h1>Members:</h1>
            <ul>
                {props.members.map(member =>
                    <li key={member.id}>{member.name} {member.mode && member.mode} {member.amount !== 0 && `$${member.amount}`} {member.location && `at ${member.location}`}</li>
                )}
            </ul>
        </>
    )
}

export default Members