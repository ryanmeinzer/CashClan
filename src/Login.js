import {useGoogleLogin} from 'react-google-login'

// refresh token
import {refreshTokenSetup} from './utils/refreshToken'

const clientId =
    '495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com'

function Login() {

    const initialState = {
        name: '',
        phone: '',
        venmo: '',
        email: '',
        selling: true,
        buying: true,
        amount: 0,
        location: '37.794374248633815, -122.400108679331'
    }

    const createMember = (googleId, name, email) => {
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
        console.log('Login Success: currentUser:', res.profileObj)
        alert(
            `Logged in successfully. Welcome to the CashClan, ${res.profileObj.name}.`
        )
        createMember(res.profileObj.googleId, res.profileObj.name, res.profileObj.email)
        refreshTokenSetup(res)
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', res)
        alert(
            `Failed to login. Bummer.`
        )
    }

    // ToDo = verify backend with tokenId vs. googleId
    const {signIn} = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
        // responseType: 'code',
        // prompt: 'consent',
    })

    return (
        <button onClick={signIn} className="button">
            <img src="icons/google.svg" alt="google login" className="icon"></img>

            <span className="buttonText">Sign in with Google</span>
        </button>
    )
}

export default Login