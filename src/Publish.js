import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const Publish = () => {

    const [state, setState] = useState({active: '', mode: null, amount: 10})
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
                        {active: json.active, mode: null, amount: 10}
                ))
        // console.log(state.mode)
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
        //! use googleId instead of id, but it is unsecure
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({active: value, mode: null, amount: 10}))
            .catch(error => error)
    }

    const handleCancel = () => {
        setState({...state, mode: null, amount: 10})
    }

    const handleSubmit = (event) => {
        if (state.mode) {
            event.preventDefault()
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...state, active: true})
            }
            //! use googleId instead of id, but it is unsecure
            fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
                .then(response => response.json())
                .then(setState({...state, active: true}))
                .catch(error => error)
        } else {
            event.preventDefault()
            alert('To Publish, please choose to Buy or Sell Cash.')
        }
    }

    return (
        <div align="center">
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
            <form
                onSubmit={handleSubmit}
            >
                <input
                    name="mode"
                    type="radio"
                    value="buying"
                    onChange={handleChange}
                    disabled={state.active}
                    checked={state.mode === 'buying'}
                    required
                />
                <label>Buy Cash</label>
                <input
                    name="mode"
                    type="radio"
                    value="selling"
                    onChange={handleChange}
                    disabled={state.active}
                    checked={state.mode === 'selling'}
                    required
                />
                <label>Sell Cash</label>
                <br />
                <input
                    type="range"
                    name="amount"
                    min={10}
                    max={300}
                    value={state.amount}
                    onChange={handleChange}
                    disabled={state.active}
                    required
                />${state.amount}
                <br />
                <br />
                {
                    state.active
                        ?
                        <button
                            name="active"
                            type="button"
                            value={false}
                            onClick={handleChange}
                        > Unpublish or Update
                        </button>
                        :
                        <>
                            <button
                                type="reset"
                                // have to do extra work to reset range input
                                onClick={handleCancel}
                            > Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={state.active}
                            >
                                Publish to the CashClan
                            </button>
                        </>
                }
            </form>
        </div>
    )
}

export default Publish