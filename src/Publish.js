import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'
import Matches from './Matches'
import Locations from './Locations'

const Publish = ({members, transactions}) => {

    const [state, setState] = useState({active: '', mode: null, amount: 10, premium: 1, location: ''})
    const {member} = useMemberContext()
    const [memberId, setMemberId] = useState()
    const [deletePendingTransaction, setDeletePendingTransaction] = useState(false)

    useEffect(() => {
        member &&
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`)
                .then((obj) => obj.json())
                .then(json => setState(
                    json.active && json.active
                        ?
                        {active: json.active, mode: json.mode, amount: json.amount, premium: json.premium, location: json.location}
                        :
                        {active: false, mode: null, amount: 10, premium: 1, location: ''}
                ))
    }, [member])

    useEffect(() => {
        member &&
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`)
                .then((obj) => obj.json())
                .then(json => setMemberId(json.id))
    }, [member])

    // ToDo - implement below or another props-based approach to refreshing for new matches
    // const memberActive = members.find(member => member.id === memberId)?.active
    // console.log('memberActive:', memberActive)

    // useEffect(() => {
    //     !memberActive && handleActiveChange(false)
    // }, [memberActive])

    const handleChange = (event) => {
        const target = event.target
        let value = target.value === 'true' ? true : target.value === 'false' ? false : target.value
        let name = target.name
        if (name === 'amount' || name === 'premium') {value = parseInt(value)}
        setState({...state, [name]: value})
        name === 'active' && handleActiveChange(value)
    }

    // delete user's pending transaction if setting to inactive (if unpublishing)
    useEffect(() => {
        if (deletePendingTransaction) {
            fetch('https://cashclan-backend.herokuapp.com/transactions')
                .then((obj) => obj.json())
                .then(json => json.find(transaction => transaction.status === 'pending' && (transaction.seller_id === memberId || transaction.buyer_id === memberId)))
                .then(transaction => {
                    transaction &&
                        fetch(`https://cashclan-backend.herokuapp.com/transactions/${transaction?.id}`, {
                        method: 'DELETE'
                    })
                        .then((response) => response.json())
                        .catch(error => error)
                })
                .catch(error => error)
        }
    })

    const handleActiveChange = (value, googleId) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            // if inactive, set mode & location to null and amount to 0 for extra BE clarity
            body: JSON.stringify(value ? {active: value} : {active: value, mode: null, amount: 0, premium: 0, location: null})
        }
        //! use googleId instead of id, but it is unsecure
        googleId
            ? fetch(`https://cashclan-backend.herokuapp.com/members/${googleId}`, requestOptions)
            : fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`, requestOptions)
            .then(response => response.json())
            .then(!value && setState({active: value, mode: null, amount: 10, premium: 1, location: ''}))
                .then(!value && setDeletePendingTransaction(true))
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
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.googleId}`, requestOptions)
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
                            (
                                <>
                                    You are actively publishing your below offer to the CashClan.
                                    <p>
                                        {state.mode === 'buying' && 'You will buy at least'} {state.mode === 'selling' && 'You will sell up to'} ${state.amount !== 0 && state.amount !== null && `${state.amount}`} {state.mode === 'buying' && 'and will pay up to a '} {state.mode === 'selling' && 'and must make at least a '} {state.premium !== 0 && state.premium !== null && `${state.premium}%`} {state.mode === 'buying' && 'cost'} {state.mode === 'selling' && 'profit'} {state.location && `at ${state.location}.`}
                                    </p>
                                </>
                            )
                            :
                            <>
                                <p>You are not active. Publish an offer to the CashClan below.</p>
                            </>
                    }
                </div>
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
                        disabled={state.active || state.mode === null}
                        required
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                        hidden={!state.mode}
                    />
                    <span
                        style={{
                            color: (!state.active && state.mode !== null ? 'black' : 'lightGray')
                        }}
                        hidden={!state.mode}
                    >
                        {state.mode === 'buying' && 'will buy at least '}
                        {state.mode === 'selling' && 'will sell up to '}
                        ${state.amount}
                    </span>
                    <br />
                    <input
                        type="range"
                        name="premium"
                        min={1}
                        max={10}
                        step={1}
                        value={parseInt(state.premium)}
                        onChange={handleChange}
                        disabled={state.active || state.mode === null}
                        required
                        style={{
                            color: (!state.active ? 'black' : 'lightGray')
                        }}
                        hidden={!state.mode}
                    />
                    <span
                        style={{
                            color: (!state.active && state.mode !== null ? 'black' : 'lightGray')
                        }}
                        hidden={!state.mode}
                    >
                        {state.mode === 'buying' && 'will pay up to a '}
                        {state.mode === 'selling' && 'must make at least a '}
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
                                    disabled={state.active || state.mode === null}
                                    hidden={!state.mode}
                                > Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={state.active || state.mode === null}
                                    hidden={!state.mode}
                                > Publish to the CashClan
                                </button>
                            </>
                    }
                </form>
                {state.mode === 'buying'
                    && <p
                        style={{
                            color: (!state.active ? 'green' : 'lightGray')
                        }}
                    ><em>You'll save at least ${(5 - (state.amount * (state.premium / 100))).toFixed(2)} buying at least ${state.amount} cash for up to a {state.premium}% cost through Venmo from a CashClan member instead of the ATM.</em>
                    </p>
                }
                {state.mode === 'selling'
                    && <p
                        style={{
                            color: (!state.active ? 'green' : 'lightGray')
                        }}
                    ><em>You'll make at least ${(state.amount * (state.premium / 100)).toFixed(2)} ({state.premium}% profit) selling up to ${state.amount} of your cash through Venmo to a CashClan member.</em>
                    </p>
                }
            </div>
            {
                state.active
                && <div align="left"><Matches members={members} offer={state} memberId={memberId} memberImage={member.image} handleActiveChange={handleActiveChange} transactions={transactions} /></div>
            }
        </>
    )
}

export default Publish