import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const Publish = () => {

    const [state, setState] = useState({active: '', mode: null, amount: 0})
    const {member} = useMemberContext()

    useEffect(() => {
        console.log('inside Publish - member:', member)
        console.log('inside Publish - state:', state)
    })

    useEffect(() => {
        member &&
            fetch(`http://localhost:3000/members/${member.googleId}`)
                .then((obj) => obj.json())
                .then(json => setState(
                    json.active
                        ?
                        {active: json.active, mode: json.mode, amount: json.amount}
                        :
                        {active: json.active, mode: null, amount: 0}
                ))
                // .then(json => setState(json))
    }, [member])

    const handleChange = (event) => {
        const target = event.target
        const value = target.value === 'true' ? true : target.value === 'false' ? false : target.value
        const name = target.name
        setState({...state, [name]: value})
        name === 'active' && handleActiveChange(value)
    }

    const handleActiveChange = (value) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(value ? {active: value} : {active: value, mode: null, amount: 0})
        }
        // use googleId instead of id, but it is unsecure
        // fetch(`http://localhost:3000/members/233`, requestOptions)
        // ToDo - swap above with below
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({active: value, mode: null, amount: 0}))
            .catch(error => error)
    }

    const handleCancel = () => {
        setState({...state, mode: null, amount: 0})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...state, active: true})
        }
        // use googleId instead of id, but it is unsecure
        // fetch(`http://localhost:3000/members/233`, requestOptions)
        // ToDo - swap above with below
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(setState({...state, active: true}))
            .catch(error => error)
    }

    return (
        <div align="center">
            <br />
            <div>
                {
                    state.active
                        ?
                        'You are actively publishing your below offer to the CashClan.'
                        :
                        'You are not active. Publish an offer to the CashClan below.'
                }
            </div>
            <br />
            <button
                name="mode"
                value="buying"
                onClick={handleChange}
                style={{
                    backgroundColor: (state.mode === 'buying' && 'green'),
                    color: (state.mode === 'buying' && 'white')
                }}
                disabled={state.active}
            >
                Buy Cash
            </button>
            <button
                name="mode"
                value="selling"
                onClick={handleChange}
                style={{
                    backgroundColor: (state.mode === 'selling' && 'green'),
                    color: (state.mode === 'selling' && 'white')
                }}
                disabled={state.active}
            >
                Sell Cash
            </button>
            <br />
                <input
                    type="number"
                    name="amount"
                    value={state.amount}
                    placeholder="enter amount here"
                    onChange={handleChange}
                    disabled={state.active}
                />
            <br />
            <br />
            {
                state.active
                    ?
                    <button
                        name="active"
                        value={false}
                        onClick={handleChange}
                    > Unpublish or Update
                    </button>
                    :
                    <>
                        <button
                            onClick={handleCancel}
                        > Cancel
                        </button>
                        <button
                            // type="submit"
                            onClick={handleSubmit}
                            disabled={state.active}
                        >
                            Publish to the CashClan
                        </button>
                    </>
            }
        </div>
    )
}

export default Publish