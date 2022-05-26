import React, {useState, useEffect} from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import NativeSelect from '@mui/material/NativeSelect'
import ListSubheader from '@mui/material/ListSubheader'
import FormHelperText from '@mui/material/FormHelperText'
import Airtable from 'airtable'
import axios from 'axios'
import Divider from '@mui/material/Divider'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const Locations = ({state, hasError, handleChange}) => {

    const [locations, setLocations] = useState(null)
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    useEffect(() => {
        //create a new Airtable object in React
        new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appAgYJXeLHg9tDEU')
        //base endpoint to call with each request
        axios.defaults.baseURL = 'https://api.airtable.com/v0/appAgYJXeLHg9tDEU/locations/'
        //content type to send with all POST requests
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        //authenticate to the base with the API key
        axios.defaults.headers['Authorization'] = `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`

        const getLocations = async () => {
            return axios.get('/')
                .then(res => setLocations(
                    res.data.records.map(item => item.fields.Name).sort()
                ))
                .catch(error => error)
        }

        getLocations()

    }, [locations])

    return (
        <FormControl error={hasError} sx={{mt: 3, mb: 3}}>
            <InputLabel
                id="location-select-label"
                sx={{
                    display: state.mode === '' ? 'none' : 'block',
                    fontSize: '1.5rem',
                    mt: -.5
                }}
            >{state.location === '' ? 'Select Nearest Location *' : 'meeting at'}</InputLabel>
            {/* // ToDo - consider conditionally using NativeSelect/Select for Mobile/Desktop for optimal UI (to prevent mobile drop-down flicker) */}
            {/* {
                isMd
                    ? */}
                    <Select
                        labelId="location-select-label"
                        id="location-select"
                        label={state.location === '' ? 'Select Nearest Location *' : 'meeting at'}
                        name="location"
                        value={state.location}
                        onChange={handleChange}
                        disabled={state.active || state.mode === ''}
                        required
                        sx={{
                            display: state.mode === '' ? 'none' : 'block',
                            color: "text.secondary",
                            fontSize: '1.5rem',
                        }}
                    >
                        <ListSubheader value=''>San Francisco</ListSubheader>
                        <Divider sx={{margin: '.5rem 0 .5rem 0'}} />
                        {
                            locations
                                ?
                                locations.map(
                                    location =>
                                        <MenuItem key={location} value={location}>{location}
                                        </MenuItem>
                                )
                                :
                                <MenuItem value={'...Loading...'}>...Loading...</MenuItem>
                        }
                    </Select>
            {/* // ToDo - consider conditionally using NativeSelect/Select for Mobile/Desktop for optimal UI (to prevent mobile drop-down flicker) */}
            {/* :
                    <NativeSelect
                        inputProps={{
                            name: 'location',
                            id: 'location-select'
                        }}
                        value={state.location}
                        onChange={handleChange}
                        required
                        sx={{
                            display: state.mode === '' ? 'none' : 'block',
                            color: "text.secondary",
                            fontSize: '1.5rem',
                        }}
                    >
                        <optgroup label="San Francisco">
                            <option value={''} disabled hidden></option>
                            {
                                locations
                                    ?
                                    locations.map(
                                        location =>
                                            <option key={location} value={location}>{location}
                                            </option>
                                    )
                                    :
                                    <option value={'...Loading...'}>...Loading...</option>
                            }
                        </optgroup>
                    </NativeSelect>
            } */}
            {hasError && <FormHelperText>This is required</FormHelperText>}
        </FormControl>
    )
}

export default Locations