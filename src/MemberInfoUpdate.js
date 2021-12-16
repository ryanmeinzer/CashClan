import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const MemberInfoUpdate = (props) => {

    //ToDo - pass in staste of member
    const [state, setState] = useState({name: 'Ryan Meinzer', phone: '5555555555', venmo: 'ryanmeinzer', selling: false, buying: true})
    const {member} = useMemberContext()

    useEffect(() => {
        console.log('inside MemberInfoUpdate:', member)
    })

    const handleChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        setState({...state, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state)
        }
        // use googleId instead of id, but it is unsecure
        fetch(`http://localhost:3000/members/${member}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            .then(setState(state))
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
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="phone"
                    value={state.phone}
                    placeholder="Your Phone"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="venmo"
                    value={state.venmo}
                    placeholder="Your Venmo Handle"
                    onChange={handleChange}
                />
                <label> Selling cash?
                    <input
                        type="checkbox"
                        name="selling"
                        checked={state.selling}
                        placeholder="selling cash?"
                        onChange={handleChange}
                    />
                </label>
                <label> Buying cash?
                    <input
                        type="checkbox"
                        name="buying"
                        checked={state.buying}
                        placeholder="buying cash?"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save Your Member Profile</button>
            </form>
        </div>
    )
}

export default MemberInfoUpdate