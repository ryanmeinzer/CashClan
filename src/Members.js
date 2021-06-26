const Members = (props) => {

    return (
        <>
            <h1>Members:</h1>
            <ul>
                {props.members.map(member =>
                    <li>{member.name}</li>
                )}
            </ul>
        </>
    )
}

export default Members