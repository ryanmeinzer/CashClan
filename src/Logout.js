import {GoogleLogout} from 'react-google-login'
import {useMemberContext} from './providers/member'

function Logout() {

    const {isLoggedIn} = useMemberContext()
    const {setIsLoggedIn} = useMemberContext()
    const {setMember} = useMemberContext()

    const responseGoogle = (res) => {
        console.log(res)
        setIsLoggedIn(false)
        setMember(null)
    }

    return (
        isLoggedIn &&
        <GoogleLogout
            // clientId="495182513894-qpo5gbo9ppe0gucfq6oq0vrkr4mmlpvb.apps.googleusercontent.com"
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    )
}

export default Logout