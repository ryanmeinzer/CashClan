import React, {useState} from "react"

const NewGiver = () => {

    const initialState = {
        name: '',
        phone: '',
        venmo: '',
        location: '37.794374248633815, -122.400108679331',
        amount: 0
    }

    const [state, setState] = useState(initialState)

    const handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state)
        }
        fetch('http://localhost:3000/givers', requestOptions)
            .then(response => response.json())
            .catch(error => error)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    placeholder="Your Name"
                    onChange={handleChange} required
                />
                <input
                    type="number"
                    name="phone"
                    value={state.phone}
                    placeholder="Your Phone"
                    onChange={handleChange} required
                />
                <input
                    type="text"
                    name="venmo"
                    value={state.venmo}
                    placeholder="Your Venmo"
                    onChange={handleChange} required
                />
                <button type="submit">Save Your Giver Profile</button>
            </form>
        </div>
    )
}

export default NewGiver