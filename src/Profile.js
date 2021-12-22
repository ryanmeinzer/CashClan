import {Link} from "react-router-dom";
import {useMemberContext} from './providers/member'

const Profile = () => {

    const {member} = useMemberContext()

    return (
        member &&
        <div style={{display: 'inline-block'}}>
            <img src={member.image} alt="profile" />
            <div><Link to="/editprofile">Profile</Link></div>
        </div>
    )
}

export default Profile