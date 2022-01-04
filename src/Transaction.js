import React, {useState} from 'react'

const Transaction = ({seller, handleActiveChange}) => {

    const [transaction, setTransaction] = useState({seller_id: seller})

    console.log(transaction)

    // const handleSubmit = (event) => {
    //     // event.preventDefault()
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({transaction})
    //     }
    //     fetch(`https://cashclan-backend.herokuapp.com/transactions`, requestOptions)
    //         .then(response => response.json())
    //         .catch(error => error)
    //         .then(setTransaction(transaction))
    // }

    const tempFunc = () => {
        alert('placeholder for transaction confirmation')
        handleActiveChange(false)
    }

    return (
        <button onClick={tempFunc}>Transaction Completed</button>
    )
}

export default Transaction