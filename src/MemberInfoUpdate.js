import React, { useState } from "react"

const MemberInfoUpdate = (props) => {

    const initialState = {
        name: '',
        phone: '',
        venmo: '',
        selling: true,
        buying: true,
        amount: 0,
        location: '37.794374248633815, -122.400108679331'
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

    const handleSubmit = (event) => {
        // console.log(id)
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state)
        }
        // need to include id after members/ to update
        fetch(`http://localhost:3000/members`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            .then(alert(`Thanks for joining the clan ${state.name}!`))
            .then(setState(initialState))
            .finally(props.refresh)
    }

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit} align="center">
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
                    placeholder="Your Venmo Handle"
                    onChange={handleChange} required
                />
                <button type="submit">Save Your Member Profile</button>
            </form>
        </div>
    )
}

export default MemberInfoUpdate