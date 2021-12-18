<div>
    <div onChange={handleChange}>
        <input
            type="radio"
            value={true}
            name="active"
        /> Active
        <input
            type="radio"
            value={false}
            name="active"

            defaultChecked={true}
        /> Inactive
    </div>
    <input
        type="radio"
        name="mode"
        value={state.mode}
        defaultValue={"buying"}
        onChange={handleChange}
        disabled={!state.active}
    />
    <form onSubmit={handleSubmit} align="center">
        <label> Active?
            <input
                type="checkbox"
                name="active"
                checked={state.active}
                onChange={handleChange}
            />
        </label>
        <button type="submit">Publish to the CashClan</button>
    </form>
</div>