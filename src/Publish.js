import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const Publish = () => {

    const [state, setState] = useState({active: '', mode: null, amount: 10, location: ''})
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
                        {active: json.active, mode: json.mode, amount: json.amount, location: json.location}
                        :
                        {active: json.active, mode: null, amount: 10, location: ''}
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
            body: JSON.stringify(value ? {active: value} : {active: value, mode: null, amount: 0, location: null})
        }
        //! use googleId instead of id, but it is unsecure
        fetch(`http://localhost:3000/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({active: value, mode: null, amount: 10, location: ''}))
            .catch(error => error)
    }

    const handleCancel = () => {
        setState({...state, mode: null, amount: 10, location: ''})
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
                <select
                    name="location"
                    value={state.location}
                    onChange={handleChange}
                    disabled={state.active}
                    required
                >
                    <option selected value=''>-- Select Nearest Location --</option>
                    <optgroup label="Polk">
                        <option value="Greens Sports Bar">Greens Sports Bar</option>
                        <option value="The Buccaneer">The Buccaneer</option>
                        <option value="Shanghai Kelly's">Shanghai Kelly's</option>
                        <option value="Bell Tower">Bell Tower</option>
                        <option value="The Cinch Saloon">The Cinch Saloon</option>
                        <option value="Harper & Rye">Harper & Rye</option>
                        <option value="Kozy Kar">Kozy Kar</option>
                        <option value="Hi-Lo Club">Hi-Lo Club</option>
                        <option value="McTeague's Saloon">McTeague's Saloon</option>
                        <option value="Lush Lounge">Lush Lounge</option>
                        <option value="R Bar">R Bar</option>
                        <option value="Jackalope">Jackalope</option>
                        <option value="Edinburgh Castle Pub">Edinburh Castle Pub</option>
                    </optgroup>
                    <optgroup label="Mission">
                        <option value="Double Dutch">Double Dutch</option>
                        <option value="Blondie's Bar">Blondie's Bar</option>
                        <option value="Bond Bar">Bond Bar</option>
                        <option value="Casanova Lounge">Casanova Lounge</option>
                        <option value="Slate">Slate</option>
                        <option value="The 500 Club">The 500 Club</option>
                        <option value="The Valencia Room">The Valencia Room</option>
                        <option value="The Sycamore">The Sycamore</option>
                        <option value="Beauty Bar">Beauty Bar</option>
                        <option value="The Beehive">The Beehive</option>
                        <option value="Teeth">Teeth</option>
                        <option value="Doc's Clock">Doc's Clock</option>
                        <option value="El Techo">El Techo</option>
                        <option value="Latin American Club">Latin American Club</option>
                        <option value="Make-Out Room">Make-Out Room</option>
                        <option value="Mision Bar">Mision Bar</option>
                        <option value="Evil Eye">Evil Eye</option>
                        <option value="El Rio">El Rio</option>
                    </optgroup>
                    <optgroup label="Haight">
                        <option value="Nickie's">Nickie's</option>
                        <option value="Toranado">Toranado</option>
                        <option value="Noc Noc">Noc Noc</option>
                        <option value="Danny Coyle's">Danny Coyle's</option>
                        <option value="The Page">The Page</option>
                        <option value="Madrone Art Bar">Madrone Art Bar</option>
                        <option value="Magnolia Brewing">Magnolia Brewing</option>
                        <option value="Trax">Trax</option>
                        <option value="Club Deluxe">Club Deluxe</option>
                        <option value="Gold Cane Cocktail Lounge">Gold Cane Cocktail Lounge</option>
                        <option value="Hobson's Choice">Hobson's Choice</option>
                        <option value="Zam Zam">Zam Zam</option>
                        <option value="Milk Bar">Milk Bar</option>
                        <option value="The Kezar Pub">The Kezar Pub</option>
                    </optgroup>
                </select>
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