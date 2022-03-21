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
                <Box mt={2}>
                    <Publish />
                </Box>
                :
                <Box>
                    <Container>
                        <Splash refresh={refreshMembersUponSignUp} />
                    </Container>
                </Box>
            }
            <Divider sx={{mt: 4, mb: 4}} />
            <Container>
                <Footer />
            </Container>
        </>
    )
}

export default Home