import React, {useState, useEffect} from "react"
import {useMemberContext} from './providers/member'
import Matches from './Matches'
import Locations from './Locations'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Publish = () => {

    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    const [state, setState] = useState({active: false, mode: '', amount: 60, premium: 5, location: ''})
    const {member} = useMemberContext()
    const [hasError, setHasError] = useState(false)

    console.log('inside Publish - state: ', state)

    useEffect(() => {
        member
            && fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`)
                .then((obj) => obj.json())
                .then(json => setState(
                    json.active === true
                        ?
                        {active: json.active, mode: json.mode, amount: json.amount, premium: json.premium, location: json.location}
                        :
                        {active: false, mode: '', amount: 60, premium: 5, location: ''}
                ))
    }, [member])

    const handleChange = (event) => {
        const target = event.target
        let value = target.value === 'true' ? true : target.value === 'false' ? false : target.value
        let name = target.name
        if (name === 'amount' || name === 'premium') {value = parseInt(value)}
        setState({...state, [name]: value})
        name === 'active' && handleActiveChange(value)
    }

    useEffect(() => {
        state.location !== '' && setHasError(false)
    }, [state])

    // BE is deleting member's pending transaction(s) if they unpublish their offer
    const handleActiveChange = (value) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            // if inactive, set mode & location to '' and amount & premium to 0 on BE for extra clarity
            body: JSON.stringify(value === true ? {...state, active: true} : {active: false, mode: '', amount: 0, premium: 0, location: ''})
        }
        fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`, requestOptions)
            .then(response => response.json())
            .catch(error => error)
        value === false && setState({active: false, mode: '', amount: 60, premium: 5, location: ''})
    }

    const handleCancel = () => {
        setState({active: false, mode: '', amount: 60, premium: 5, location: ''})
        setHasError(false)
    }

    const handleSubmit = (event) => {
        if (state.location !== '') {
            event.preventDefault()
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...state, active: true})
            }
            fetch(`https://cashclan-backend.herokuapp.com/members/${member.id}`, requestOptions)
                .then(response => response.json())
                .catch(error => error)
            setState({...state, active: true})
        } else {
            setHasError(true)
        }
    }

    return (
        <>
            <div align="center">
                <div>
                    {
                        state.active
                            ?
                            <Box sx={{mb: 2}}>
                                <Typography color="text.secondary" fontSize='1.5rem' align={'center'} component="p">You are actively publishing your offer to the CashClan.</Typography>
                            </Box>
                            :
                            <Box sx={{mt: 6, mb: 2, display: state.mode !== '' && 'none'}}>
                                <Typography color="text.secondary" fontSize='1.5rem' align={'center'} component="p">You are not active. Publish an offer to the CashClan below.</Typography>
                            </Box>
                    }
                </div>
                {/* native form control unnecessary */}
                {/* <form onSubmit={handleSubmit}> */}
                <FormControl
                    sx={{
                        width: "90%",
                        display: state.active && 'none'
                    }}
                >
                    <RadioGroup
                        row
                        sx={{
                            justifyContent: "center",
                            '& .MuiFormControlLabel-label': {
                                fontSize: '1.5rem',
                            },
                            mb: 4
                        }}
                        name="mode"
                        value={state.mode}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="buying"
                            control={<Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: '1.5rem',
                                    },
                                }}
                            />}
                            label="Buy Cash"
                            checked={state.mode === 'buying'}
                            disabled={state.active}
                            sx={{color: "text.secondary"}}
                        />
                        <FormControlLabel
                            value="selling"
                            control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: '1.5rem',
                                }
                            }}
                            />}
                            label="Sell Cash"
                            checked={state.mode === 'selling'}
                            disabled={state.active}
                            sx={{color: "text.secondary"}}
                        />
                    </RadioGroup>
                    <Typography
                        align="left"
                        gutterBottom={true}
                        sx={{
                            color: "text.secondary", fontSize: '1.5rem',
                            display: state.mode === '' ? 'none' : 'block'
                        }}

                    >
                        {state.mode === 'buying' && 'I will buy '}
                        {state.mode === 'selling' && 'I will sell up to '}
                        ${state.amount}
                    </Typography>
                    <Slider
                        name="amount"
                        min={20}
                        max={300}
                        step={20}
                        value={state.amount}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$${value}`}
                        disabled={state.active || state.mode === ''}
                        color="primary"
                        sx={{display: state.mode === '' ? 'none' : 'block', mt: 2, mb: 2}}
                    />
                    <Typography
                        align="left"
                        gutterBottom={true}
                        sx={{
                            color: "text.secondary", fontSize: '1.5rem',
                            display: state.mode === '' ? 'none' : 'block',
                            mt: 2
                        }}
                    >
                        {state.mode === 'buying' && 'and will pay up to a '}
                        {state.mode === 'selling' && 'and must make at least a '}
                        {state.premium}%
                        {state.mode === 'buying' && ' cost'}
                        {state.mode === 'selling' && ' profit'}
                    </Typography>
                    <Slider
                        name="premium"
                        min={1}
                        max={10}
                        step={1}
                        marks
                        value={parseInt(state.premium)}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        disabled={state.active || state.mode === ''}
                        color="primary"
                        sx={{display: state.mode === '' ? 'none' : 'block', mt: 2, mb: 2}}
                    />
                    <Locations state={state} hasError={hasError} handleChange={handleChange} />
                </FormControl>
                {
                    state.active
                        ?
                        <Box width="90%">
                            <Button
                                type="submit"
                                name="active"
                                value={false}
                                onClick={handleChange}
                                variant="contained"
                                color="secondary"
                                sx={{mt: 2, mb: 2}}
                                fullWidth={!isMd}
                            >Unpublish or Update Offer</Button>
                        </Box>
                        :
                        <>
                            <Box width="90%">
                                <Button
                                // reset range input
                                    type="reset"
                                    onClick={handleCancel}
                                    disabled={state.active || state.mode === ''}
                                    sx={{
                                        display: state.mode === '' ? 'none' : 'block',
                                        mt: 2,
                                        mb: 2
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    fullWidth={!isMd}
                                >Cancel</Button>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={state.active || state.mode === ''}
                                    sx={{
                                        display: state.mode === '' ? 'none' : 'block',
                                        mt: 2,
                                        mb: 2
                                    }}
                                    variant="contained"
                                    color="primary"
                                    fullWidth={!isMd}
                                >Publish to the CashClan</Button>
                            </Box>
                        </>
                }
                {/* FormControl unnecessary as buttons are explicit; native form control also unnecessary */}
                {/* </FormControl> */}
                {/* </form> */}
                {state.mode === 'buying'
                    &&
                    <Typography color="primary.dark" variant="h6" fontStyle="italic" sx={{mt: 4}} width="90%">
                        You'll {(state.amount * (state.premium / 100)) < 5.50 ? 'save' : 'spend'} {Math.abs((5.50 - (state.amount * (state.premium / 100))) / 5.50 * 100).toFixed()}% {(state.amount * (state.premium / 100)) > 5.50 && 'more'} compared to the $5.50 average total ATM + bank fees by buying ${state.amount} cash through Venmo from a CashClan member{state.location && ` at ${state.location}`}.
                    </Typography>
                }
                {state.mode === 'selling'
                    &&
                    <Typography color="primary.dark" variant="h6" fontStyle="italic" sx={{mt: 4}} width="90%">
                        You'll earn {Math.abs(state.premium - .5)}% {state.premium > .5 ? 'more' : 'less'} than the 0.5% average bank rate in the USA by selling up to ${state.amount} of your cash through Venmo to a CashClan member{state.location && ` at ${state.location}`}.
                    </Typography>
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