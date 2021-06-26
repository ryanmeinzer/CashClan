import React, {useEffect, useState} from 'react'

const Getters = () => {

    const [getters, setGetters] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/getters')
            .then((obj) => obj.json())
            .then(json => setGetters(json))
    }, [])

    // console.log(getters)

    return (
        <>
            <h1>Getters:</h1>
            <ul>
                {getters.map(getter =>
                    <li>{getter.name}</li>
                )}
            </ul>
        </>
    )
}

export default Getters