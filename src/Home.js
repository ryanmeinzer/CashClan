import Publish from './Publish'
import {useMemberContext} from './providers/member'
import Splash from './Splash'
import MenuAppBar from './MenuAppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Footer from './Footer'
import Divider from '@mui/material/Divider'

const Home = ({refreshMembersUponSignUp}) => {

    const {member} = useMemberContext()

    return (
        <> 
            <Container>
                <MenuAppBar refresh={refreshMembersUponSignUp} />
                <Toolbar />
            </Container>
            {member
                ?
                <>
                    {/* // ToDo - move to new component, design and uncomment once finished */}
                    <div align="center" style={{margin: '7rem 0 0 0'}}>
                        <Publish />
                    </div>
                </>
                :
                <Box>
                    <Container>
                        <Splash refresh={refreshMembersUponSignUp} />
                    </Container>
                </Box>
            }
            <Divider sx={{mt: 6, mb: 4}} />
            <Container>
                <Footer />
            </Container>
        </>
    )
}

export default Home