import React, {useState} from 'react'

const Transaction = (props) => {

    const [transaction, setTransaction] = useState(null)

    const handleSubmit = (event) => {
        // event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({transaction})
        }
        fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            .then(setTransaction(transaction))
    }

    return (
        <button onClick={handleSubmit}>Transaction Completed</button>
    )
}

export default Transaction