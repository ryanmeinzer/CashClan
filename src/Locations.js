import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ListSubheader from '@mui/material/ListSubheader'
import FormHelperText from '@mui/material/FormHelperText'

const Locations = ({state, hasError, handleChange}) => {

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
                {/* // ToDo - uncomment below for go-to-market phase 2 */}
                {/* <ListSubheader>Polk District</ListSubheader>
                <MenuItem value="Greens Sports Bar">Greens Sports Bar</MenuItem>
                <MenuItem value="The Buccaneer">The Buccaneer</MenuItem>
                <MenuItem value="Nick's Crispy Tacos">Nick's Crispy Tacos</MenuItem>
                <MenuItem value="Shanghai Kelly's">Shanghai Kelly's</MenuItem>
                <MenuItem value="The Cinch Saloon">The Cinch Saloon</MenuItem>
                <MenuItem value="McTeague's Saloon">McTeague's Saloon</MenuItem>
                <MenuItem value="Mayes">Mayes</MenuItem>
                <MenuItem value="Lush Lounge">Lush Lounge</MenuItem>
                <MenuItem value="R Bar">R Bar</MenuItem>
                <MenuItem value="Decodance">Decodance</MenuItem>
                <MenuItem value="Jackalope">Jackalope</MenuItem>
                <MenuItem value="Edinburgh Castle Pub">Edinburgh Castle Pub</MenuItem> */}
                {/* // ToDo - uncomment below for go-to-market phase 3 */}
                {/* <ListSubheader>Haight District</ListSubheader>
                <MenuItem value="Toranado">Toranado</MenuItem>
                <MenuItem value="Noc Noc">Noc Noc</MenuItem>
                <MenuItem value="Molotov's">Molotov's</MenuItem>
                <MenuItem value="Danny Coyle's">Danny Coyle's</MenuItem>
                <MenuItem value="The Page">The Page</MenuItem>
                <MenuItem value="Madrone Art Bar">Madrone Art Bar</MenuItem>
                <MenuItem value="Trax">Trax</MenuItem>
                <MenuItem value="Club Deluxe">Club Deluxe</MenuItem>
                <MenuItem value="Hobson's Choice">Hobson's Choice</MenuItem>
                <MenuItem value="Zam Zam">Zam Zam</MenuItem>
                <MenuItem value="Milk Bar">Milk Bar</MenuItem> */}
            </Select>
            {hasError && <FormHelperText>This is required</FormHelperText>}
        </FormControl>
    )
}

export default Locations