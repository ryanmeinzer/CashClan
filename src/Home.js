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
            {member
                ?
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
                    <br />
                    <div align="center">
                        <Link refresh={refreshMembersUponSignUp} to="/about">learn more</Link>
                    </div>
                </div>
                :
                <div>
                    <h1 align="center">CashClan</h1>
                    <p align="center" style={{fontSize: "3rem"}}>🏧 🙅 🏦</p>
                    <h3 align="center">The Cash Exchange (IRL P2P DeFi)</h3>
                    <p align="center" style={{fontSize: "3rem"}}>💵 🤝 <img src="https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg" alt="venmo logo" style={{width: "2.25rem"}} /></p>
                    <div align="center">
                        <SignUp refresh={refreshMembersUponSignUp} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div align="center">
                        <Link refresh={refreshMembersUponSignUp} to="/about">learn more</Link>
                    </div>
                </div>
            }
        </>
    )
}

export default Home