import React from 'react'
import {useGoogleLogin} from 'react-google-login'

// refresh token
import {refreshTokenSetup} from './utils/refreshToken'

const clientId =
    '495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com'

function Login() {
    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj)
        alert(
            `Logged in successfully. Welcome to the CashClan, ${res.profileObj.name}.`
        )
        refreshTokenSetup(res)
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', res)
        alert(
            `Failed to login. Bummer.`
        )
    }

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