import Publish from './Publish'
import SignUp from './SignUp'
import Profile from './Profile'
import Logout from './Logout'
import {useMemberContext} from './providers/member'

const Home = ({refreshMembersUponSignUp}) => {

    const {member} = useMemberContext()

    return (
        <>
            <h1 align="center">CashClan 🤑</h1>
            <h3 align="center">The Human ATM Network</h3>
            <div align="center">
                <SignUp refresh={refreshMembersUponSignUp} />
            </div>
            {member &&
                <div>
                    <div align="center">
                        <Profile />
                    </div>
                    <br />
                    <div align="center">
                        <Logout />
                    </div>
                    <br />
                    <hr width="50%" />
                    <br />
                    <div align="center">
                        <Publish />
                    </div>
                </div>
            }
        </>
    )
}

export default Home