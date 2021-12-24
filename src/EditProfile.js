import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'
import {Link, useNavigate} from "react-router-dom";

const EditProfile = ({refreshMembersUponFormSubmit}) => {

    const {member} = useMemberContext()
    const [state, setState] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        console.log('inside EditProfile - member:', member)
        console.log('inside EditProfile - state:', state)
    })

    useEffect(() => {
        member &&
            fetch(`http://localhost:3000/members/${member.googleId}`)
                .then((obj) => obj.json())
                .then(json => setState(json))
    }, [member])

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
        // fetch(`http://localhost:3000/members/233`, requestOptions)
        // ToDo - swap above with below
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            // .then(setState(state))
            .then(refreshMembersUponFormSubmit)
            .finally(navigate("/"))
    }

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit} align="center">
                <input
                    type="text"
                    name="name"
                    value={state && state.name}
                    placeholder="Your Name"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="phone"
                    value={state && state.phone}
                    placeholder="Your Phone"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="venmo"
                    value={state && state.venmo}
                    placeholder="Your Venmo Handle"
                    onChange={handleChange}
                />
                <br />
                <br />
                <Link to="/"><button>Cancel</button></Link>
                <button type="submit">Update Your Member Profile</button>
            </form>
        </div>
    )
}

export default EditProfile