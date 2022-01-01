import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'
import Matches from './Matches'
import Locations from './Locations'

const Publish = () => {

    const [state, setState] = useState({active: '', mode: null, amount: 10, premium: 1, location: ''})
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
                        {active: json.active, mode: json.mode, amount: json.amount, premium: json.premium, location: json.location}
                        :
                        {active: json.active, mode: null, amount: 10, premium: 1, location: ''}
                ))
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
            // if inactive, set mode & location to null and amount to 0 for extra BE clarity
            body: JSON.stringify(value ? {active: value} : {active: value, mode: null, amount: 0, premium: 0, location: null})
        }
        //! use googleId instead of id, but it is unsecure
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({active: value, mode: null, amount: 10, premium: 1, location: ''}))
            .catch(error => error)
    }

    const handleCancel = () => {
        setState({...state, mode: null, amount: 10, premium: 1, location: ''})
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
        <>
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
                    <label
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    >Buy Cash</label>
                    <input
                        name="mode"
                        type="radio"
                        value="selling"
                        onChange={handleChange}
                        disabled={state.active}
                        checked={state.mode === 'selling'}
                        required
                    />
                    <label
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    >Sell Cash</label>
                    <br />
                    <input
                        type="range"
                        name="amount"
                        min={10}
                        max={300}
                        step={5}
                        value={state.amount}
                        onChange={handleChange}
                        disabled={state.active}
                        required
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    />
                    <span
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    >
                        {state.mode === 'buying' && 'buying at least '}
                        {state.mode === 'selling' && 'selling up to '}
                        ${state.amount}
                    </span>
                    <br />
                    <input
                        type="range"
                        name="premium"
                        min={1}
                        max={10}
                        step={1}
                        value={state.premium}
                        onChange={handleChange}
                        disabled={state.active}
                        required
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    />
                    <span
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                    >
                        {state.mode === 'buying' && 'willing to pay up to a '}
                        {state.mode === 'selling' && 'must earn at least a '}
                        {state.premium}%
                        {state.mode === 'buying' && ' cost'}
                        {state.mode === 'selling' && ' profit'}
                    </span>
                    <br />
                    <Locations state={state} handleChange={handleChange} />
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
                {state.mode === 'buying'
                    && <p
                        style={{
                            color: (!state.active ? 'green' : 'lightGray')
                        }}
                    ><em>You'll save at least ${(5 - (state.amount * (state.premium / 100))).toFixed(2)} using CashClan instead of the ATM.</em>
                    </p>
                }
                {state.mode === 'selling'
                    && <p
                        style={{
                            color: (!state.active ? 'green' : 'lightGray')
                        }}
                    ><em>You'll make at least ${(state.amount * (state.premium / 100)).toFixed(2)} using CashClan.</em>
                    </p>
                }
            </div>
            {
                state.active
                && <div align="left"><Matches offer={state} /></div>
            }
        </>
    )
}

export default Publish