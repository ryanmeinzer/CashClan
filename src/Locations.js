import React, {useState, useEffect} from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ListSubheader from '@mui/material/ListSubheader'
import FormHelperText from '@mui/material/FormHelperText'
// import Airtable from 'airtable'
// import axios from 'axios'

const Locations = ({state, hasError, handleChange}) => {

    // const [locations, setLocations] = useState(null)

    // useEffect(() => {
    //     //create a new Airtable object in React
    //     new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appAgYJXeLHg9tDEU')
    //     //base endpoint to call with each request
    //     axios.defaults.baseURL = 'https://api.airtable.com/v0/appAgYJXeLHg9tDEU/locations/'
    //     //content type to send with all POST requests
    //     axios.defaults.headers.post['Content-Type'] = 'application/json'
    //     //authenticate to the base with the API key
    //     axios.defaults.headers['Authorization'] = `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`

    //     const getLocations = async () => {
    //         return axios.get('/')
    //             .then(res => setLocations(
    //                 res.data.records.map(item => item.fields.Name).sort()
    //             ))
    //             .catch(error => error)
    //     }

    //     getLocations()

    // }, [locations])

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
                {/* <ListSubheader>San Francisco</ListSubheader>
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
                } */}
                <ListSubheader>Mission District</ListSubheader>
                <MenuItem value="Beauty Bar">Beauty Bar</MenuItem>
                <MenuItem value="Bender's Bar & Grill">Bender's Bar & Grill</MenuItem>
                <MenuItem value="Blondie's Bar">Blondie's Bar</MenuItem>
                <MenuItem value="Bond Bar">Bond Bar</MenuItem>
                <MenuItem value="Casanova Lounge">Casanova Lounge</MenuItem>
                <MenuItem value="Casements Bar">Casements Bar</MenuItem>
                <MenuItem value="City Club">City Club</MenuItem>
                <MenuItem value="Delirium">Delirium</MenuItem>
                <MenuItem value="Doc's Clock">Doc's Clock</MenuItem>
                <MenuItem value="El Rio">El Rio</MenuItem>
                <MenuItem value="El Techo">El Techo</MenuItem>
                <MenuItem value="Gestalt">Gestalt</MenuItem>
                <MenuItem value="Kilowatt">Kilowatt</MenuItem>
                <MenuItem value="Latin American Club">Latin American Club</MenuItem>
                <MenuItem value="Make-Out Room">Make-Out Room</MenuItem>
                <MenuItem value="Mision Bar">Mission Bar</MenuItem>
                <MenuItem value="Slate">Slate</MenuItem>
                <MenuItem value="Teeth">Teeth</MenuItem>
                <MenuItem value="The 500 Club">The 500 Club</MenuItem>
                <MenuItem value="The Chapel">The Chapel</MenuItem>
                <MenuItem value="The Royal Cuckoo">The Royal Cuckoo</MenuItem>
                <MenuItem value="The Sycamore">The Sycamore</MenuItem>
                <MenuItem value="The Valencia Room">The Valencia Room</MenuItem>
                <MenuItem value="Zeitgeist">Zeitgeist</MenuItem>
            </Select>
            {hasError && <FormHelperText>This is required</FormHelperText>}
        </FormControl>
    )
}

export default Locations