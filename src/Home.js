import Publish from './Publish'
import Members from './Members'
import Transactions from './Transactions'
import SignUp from './SignUp'
import Profile from './Profile'
import Logout from './Logout'
import {useMemberContext} from './providers/member'

const Home = ({members, transactions, refreshMembersUponSignUp}) => {

    const {member} = useMemberContext()

    return (
        <>
            <h1 align="center">CashClan</h1>
            {/* <div style={{margin: 'auto', textAlign: 'center', border: '1px solid black'}}> */}
            <SignUp refresh={refreshMembersUponSignUp} />
            {member &&
                <Profile />
            }
            <Logout />
            {/* </div> */}
            <Publish />
            <Members members={members} />
            <Transactions transactions={transactions} />
        </>
    )
}

export default Home