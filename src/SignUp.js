import {GoogleLogin} from 'react-google-login'
import {refreshTokenSetup} from './utils/refreshToken'
import {useMemberContext} from './providers/member'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'

const SignUp = (props) => {

    const {setMember} = useMemberContext()
    const {isLoggedIn} = useMemberContext()
    const {setIsLoggedIn} = useMemberContext()

    const responseGoogle = (res) => {
        console.log('inside SignUp', res)
    }

    // securely authenticate & validate with BE via user ID token
    const findOrCreateMember = (tokenId) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tokenId: tokenId})
        }
        fetch('https://cashclan-backend.herokuapp.com/members', requestOptions)
            .then(response => response.json())
            .then(json => setMember({id: json.id, image: json.image}))
            .finally(props.refresh)
            .catch(error => error)
    }

    const onSuccess = (res) => {
        findOrCreateMember(res.tokenId)
        setIsLoggedIn(true)
        // refresh tokenId (every hour it expires) to access data and authenticate user
        refreshTokenSetup(res)
    }

    return (
        !isLoggedIn &&
        <GoogleLogin
            // ! uncomment below when developing locally
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID_TEST}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
                props.menuAppBarOrigin
                    ?
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<AccountCircle />}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >LOG IN</Button>
                    : props.heroOrigin
                        ?
                        <Box
                            component={Button}
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            fullWidth={!props.isMd}
                        >
                            Sign Up
                        </Box>
                        : null
            )}
            onSuccess={onSuccess}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            // keep user logged in after page refresh, unless they logout
            isSignedIn={true}
        />
    )
}

export default SignUp