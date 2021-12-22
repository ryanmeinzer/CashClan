import {Link} from "react-router-dom";

const Profile = () => {
    return (
        // ToDo - make div an inline block ie have it span not create new div / element
        <div>
            <div>[Profile Image Here]</div>
            <Link to="/editprofile">Profile</Link>
        </div>
    )
}

export default Profile