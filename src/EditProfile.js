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
        // ! use googleId instead of id, but it is unsecure
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            // .then(setState(state))
            .then(refreshMembersUponFormSubmit)
            .finally(navigate("/"))
    }

    return (
        <div>
            <h1 align="center">CashClan 🤑</h1>
            <h3 align="center">The Human ATM Network</h3>
            <div align="center">
                <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
            </div>
            <br />
            <form onSubmit={handleSubmit} align="center">
                <input
                    type="text"
                    name="name"
                    value={state && state.name}
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    // type="tel"
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="phone"
                    value={state && state.phone}
                    placeholder="Your Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="venmo"
                    value={state && state.venmo}
                    placeholder="Your Venmo Handle"
                    onChange={handleChange}
                    required
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