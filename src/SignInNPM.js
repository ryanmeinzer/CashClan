import GoogleLogin from 'react-google-login'

const responseGoogle = (response) => {
    console.log(response)
}

const SignInNPM = () => {
    return (
        <GoogleLogin
            clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
        />
    )
}

export default SignInNPM