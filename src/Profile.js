import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const Profile = (props) => {

    //ToDo - pass in state of member from BE
    const [state, setState] = useState({name: 'Joe Schmoe', phone: '5555555555', venmo: 'joeshmoe'})
    const {member} = useMemberContext()

    useEffect(() => {
        console.log('inside Profile - member:', member)
        console.log('inside Profile - state:', state)
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
        // fetch(`http://localhost:3000/members/225`, requestOptions)
        // ToDo - swap above with below
        fetch(`http://localhost:3000/members/${member}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            // .then(setState(state))
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
                <button type="submit">Update Your Member Profile</button>
            </form>
        </div>
    )
}

export default Profile