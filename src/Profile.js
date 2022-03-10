import {useMemberContext} from './providers/member'

const Profile = () => {

    const {member} = useMemberContext()

    return (
        member &&
        <div style={{display: 'inline-block'}}>
                <h1 align="center">CashClan</h1>
                <img src={member.image} alt="profile" style={{borderRadius: "50%"}} />
        </div>
    )
}

export default Profile