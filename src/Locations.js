const Locations = ({state, handleChange}) => {
    return (
        <select
            name="location"
            value={state.location}
            onChange={handleChange}
            disabled={state.active}
            required
        // defaultValue=""
        >
            <option value=''>-- Select Nearest Location --</option>
            <optgroup label="Polk District">
                <option value="Greens Sports Bar">Greens Sports Bar</option>
                <option value="The Buccaneer">The Buccaneer</option>
                <option value="Nick's Crispy Tacos">Nick's Crispy Tacos</option>
                <option value="Shanghai Kelly's">Shanghai Kelly's</option>
                <option value="The Cinch Saloon">The Cinch Saloon</option>
                <option value="McTeague's Saloon">McTeague's Saloon</option>
                <option value="Mayes">Mayes</option>
                <option value="Lush Lounge">Lush Lounge</option>
                <option value="R Bar">R Bar</option>
                <option value="Decodance">Decodance</option>
                <option value="Jackalope">Jackalope</option>
                <option value="Edinburgh Castle Pub">Edinburh Castle Pub</option>
            </optgroup>
            <optgroup label="Mission District">
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
            <optgroup label="Haight District">
                <option value="Toranado">Toranado</option>
                <option value="Noc Noc">Noc Noc</option>
                <option value="Molotov's">Molotov's</option>
                <option value="Danny Coyle's">Danny Coyle's</option>
                <option value="The Page">The Page</option>
                <option value="Madrone Art Bar">Madrone Art Bar</option>
                <option value="Trax">Trax</option>
                <option value="Club Deluxe">Club Deluxe</option>
                <option value="Hobson's Choice">Hobson's Choice</option>
                <option value="Zam Zam">Zam Zam</option>
                <option value="Milk Bar">Milk Bar</option>
            </optgroup>
        </select>
    )
}

export default Locations