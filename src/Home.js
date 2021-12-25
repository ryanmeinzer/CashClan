import Publish from './Publish'
import SignUp from './SignUp'
import Profile from './Profile'
import Logout from './Logout'
import {useMemberContext} from './providers/member'
import {Link} from "react-router-dom";

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
                    <div>
                        <Profile />
                    </div>
                    <div>
                        <Logout />
                    </div>
                    <div>
                        <Publish />
                    </div>
                    <div>
                        <Link to="/members">Members</Link>
                    </div>
                    <div>
                        <Link to="/transactions">Transactions</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Home