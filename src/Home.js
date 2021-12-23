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
            <SignUp refresh={refreshMembersUponSignUp} />
            {member &&
                <Profile />
            }
            <Logout />
            <Publish />
            <Members members={members} />
            <Transactions transactions={transactions} />
        </>
    )
}

export default Home