import {GoogleLogout} from 'react-google-login'
import {useMemberContext} from './providers/member'
import MenuItem from '@mui/material/MenuItem'

function Logout(props) {

    const {isLoggedIn} = useMemberContext()
    const {setIsLoggedIn} = useMemberContext()
    const {setMember} = useMemberContext()

    const responseGoogle = (res) => {
        console.log(res)
        setIsLoggedIn(false)
        setMember(null)
        props.handleClose()
    }

    return (
        isLoggedIn &&
        <GoogleLogout
            // ! uncomment below when developing locally
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID_TEST}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                <MenuItem
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >Log Out</MenuItem>
            )}
            onLogoutSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default Logout