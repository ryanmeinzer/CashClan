import {GoogleLogout} from 'react-google-login'

function Logout() {

    const responseGoogle = (res) => {
        console.log(res)
    }

    return (
        <GoogleLogout
            clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default Logout