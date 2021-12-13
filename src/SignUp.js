import { GoogleLogin } from 'react-google-login'

function SignUp() {

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
            `Welcome to the CashClan, ${res.profileObj.name}.`
        )
        findOrCreateMember(res.profileObj.googleId, res.profileObj.name, res.profileObj.email)
    }

    return (
        <GoogleLogin
            clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            buttonText="Sign Up with Google"
            onSuccess={onSuccess}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default SignUp