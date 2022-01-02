import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'

const Meet = () => {

    const [state, setState] = useState({meeting: '', outfitTop: '', outfitBottom: '', outfitShoes: ''})
    const {member} = useMemberContext()

    useEffect(() => {
        console.log('inside Meet - member:', member)
        console.log('inside Meet - state:', state)
    })

    useEffect(() => {
        member &&
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`)
                .then((obj) => obj.json())
                .then(json => setState(
                    json.meeting
                        ?
                        {meeting: json.meeting, outfitTop: json.outfitTop, outfitBottom: json.outfitBottom, outfitShoes: json.outfitShoes}
                        :
                        {meeting: json.meeting, outfitTop: '', outfitBottom: '', outfitShoes: ''}
                ))
    }, [member])

    const handleChange = (event) => {
        const target = event.target
        const value = target.value === 'true' ? true : target.value === 'false' ? false : target.value
        const name = target.name
        setState({...state, [name]: value})
        name === 'meeting' && handleMeetingChange(value)
    }

    const handleMeetingChange = (value) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            // if inactive, set mode & location to null and amount to 0 for extra BE clarity
            body: JSON.stringify(value ? {meeting: value} : {meeting: value, outfitTop: null, outfitBottom: null, outfitShoes: null})
        }
        //! use googleId instead of id, but it is unsecure
        fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({meeting: value, outfitTop: '', outfitBottom: '', outfitShoes: ''}))
            .catch(error => error)
    }

    const handleCancel = () => {
        setState({...state, outfitTop: '', outfitBottom: '', outfitShoes: ''})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...state, meeting: true})
        }
        //! use googleId instead of id, but it is unsecure
        fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(setState({...state, meeting: true}))
            .catch(error => error)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <select
                    name={'outfitTop'}
                    value={state.outfitTop}
                    onChange={handleChange}
                    required
                >
                    <option value=''>-- Select Top Color (e.g. shirt) --</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                </select>
                <select
                    name={'outfitBottom'}
                    value={state.outfitBottom}
                    onChange={handleChange}
                    required
                >
                    <option value=''>-- Select Bottom Color (e.g. jeans) --</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                </select>
                <select
                    name={'outfitShoes'}
                    value={state.outfitShoes}
                    onChange={handleChange}
                    required
                >
                    <option value=''>-- Select Shoes Color --</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Red">Red</option>
                </select>
                {
                    state.meeting
                        ?
                        <button
                            name="meeting"
                            type="button"
                            value={false}
                            onClick={handleChange}
                        > Cancel Meeting
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
                            > Meet
                            </button>
                        </>
                }
            </form>
        </>
    )
}

export default Meet