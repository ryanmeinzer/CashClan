import GoogleLogout from 'react-google-login'

const logout = (response) => {
    console.log(response)
}

const SignOutNPM = () => {
    return (
        <GoogleLogout
            clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
        >
        </GoogleLogout>
    )
}

export default SignOutNPM