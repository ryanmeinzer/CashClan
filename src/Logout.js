import {GoogleLogout} from 'react-google-login'
import {useMemberContext} from './providers/member'
import MenuItem from '@mui/material/MenuItem'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function Logout(props) {

    const {isLoggedIn} = useMemberContext()
    const {setIsLoggedIn} = useMemberContext()
    const {setMember} = useMemberContext()

    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    const responseGoogle = (res) => {
        console.log(res)
        setIsLoggedIn(false)
        setMember(null)
        props.handleClose()
    }

    return (
        isLoggedIn &&
        <GoogleLogout
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID_TEST}
            // ! swap above with below when developing locally
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                isMd
                    ?
                    <MenuItem
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >Log Out</MenuItem>
                    :
                    <option
                        // style={{
                        //     padding: '10px',
                        //     fontWeight: 400,
                        //     fontSize: '1rem',
                        //     lineHeight: 1.5,
                        //     letterSpacing: '0.00938em'
                        // }}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                        Log Out
                    </option>  
            )}
            onLogoutSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default Logout