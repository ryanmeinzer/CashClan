import React, {useEffect, useState} from 'react'

const Givers = () => {

    const [givers, setGivers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/givers')
            .then((obj) => obj.json())
            .then(json => setGivers(json))
    }, [])

    // console.log(givers)

    return (
        <>
            <h1>Givers:</h1>
            <ul>
                {givers.map(giver =>
                    <li>{giver.name}</li>
                )}
            </ul>
        </>
    )
}

export default Givers