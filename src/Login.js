import {GoogleLogin} from 'react-google-login'
// refresh token
import {refreshTokenSetup} from './utils/refreshToken'

function Login() {

    const responseGoogle = (res) => {
        console.log(res)
    }

    const initialState = {
        name: '',
        email: '',
        phone: '',
        venmo: '',
        selling: true,
        buying: true,
        amount: 0,
        location: ''
        // location: '37.794374248633815, -122.400108679331'
    }

    const findOrCreateMember = (googleId, name, email) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...initialState, googleId: googleId, name: name, email: email})
        }
        fetch('http://localhost:3000/members', requestOptions)
            .then(response => response.json())
            .catch(error => error)
    }

    const onSuccess = (res) => {
        // console.log('inside Login - onSuccess response:', res)
        alert(
            `Welcome back to the CashClan, ${res.profileObj.name}.`
        )
        findOrCreateMember(res.profileObj.googleId, res.profileObj.name, res.profileObj.email)
        refreshTokenSetup(res)
    }

    return (
        <GoogleLogin
            clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}

export default Login