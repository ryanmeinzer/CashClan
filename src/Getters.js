const Getters = (props) => {

    return (
        <>
            <h1>Getters:</h1>
            <ul>
                {props.getters.map(getter =>
                    <li>{getter.name}</li>
                )}
            </ul>
        </>
    )
}

export default Getters