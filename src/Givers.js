const Givers = (props) => {

    return (
        <>
            <h1>Givers:</h1>
            <ul>
                {props.givers.map(giver =>
                    <li>{giver.name}</li>
                )}
            </ul>
        </>
    )
}

export default Givers