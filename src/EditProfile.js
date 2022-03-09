import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'
import {Link, useNavigate} from "react-router-dom";
import MemberTransactions from './MemberTransactions'

const EditProfile = () => {

    const {member} = useMemberContext()
    const [state, setState] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (member) {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(member)
            }
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`, requestOptions)
                .then((obj) => obj.json())
                .then(json => setState(json))
        }
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
        fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
            .finally(navigate("/"))
    }

    return (
        <div>
            <h1 align="center">CashClan</h1>
            <div align="center">
                <img src={member && member.image} alt="profile" style={{borderRadius: "50%"}} />
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
                    name="phone"
                    value={state && state.phone}
                    placeholder="Your Phone"
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <Link to="/"><button>Cancel</button></Link>
                <button type="submit">Update Your Member Profile</button>
            </form>
            < MemberTransactions />
        </div>
    )
}

export default EditProfile