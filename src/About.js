import SignUp from './SignUp'
import {useMemberContext} from './providers/member'
import {Link} from "react-router-dom"

const About = (props) => {

    const {member} = useMemberContext()

    return (
        <>
            <h1 align="center">CashClan</h1>
            {member &&
                <div style={{display: 'inline-block'}}>
                    <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
                    <div>
                        <Link to="/editprofile">Profile</Link>
                    </div>
                </div>
            }
            <div>
                <p><span style={{fontWeight: "bold"}}>ATMs and banks charge high fees (~$5.50 total)</span> to get one's cash. Save by buying cash through Venmo from a CashClan member - without banks.</p>
                <p><span style={{fontWeight: "bold"}}>'Cash-rich' people get hardly any interest (~0.5%) from banks</span> for their cash. Earn more by selling cash through Venmo to a CashClan member - without banks.</p>
                <p><span style={{fontWeight: "bold"}}>~5% of Americans are unbanked</span>, without means to buy digitally. Become empowered with digital currency by converting cash through Venmo - without banks.</p>
                <p><span style={{fontWeight: "bold"}}>'Cash-poor' people are charged a high ~20% premium</span> to get cash from their credit cards. Get 'cash-rich' for a fraction of the premium - without banks.</p>
            </div>
            {!member &&
                <div>
                    <br />
                    <br />
                    <div align="center">
                        <SignUp refresh={props.refreshMembersUponSignUp} />
                    </div>
                </div>
            }
            <br />
            <br />
            <br />
            <div align="center">
                <Link to="/">home</Link>
            </div>
        </>
    )
}

export default About