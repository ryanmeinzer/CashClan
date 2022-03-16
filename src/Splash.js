import SignUp from './SignUp'
import {Link} from "react-router-dom"
import MenuAppBar from './MenuAppBar'
import Hero from './Hero'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

const Splash = (props) => {
    return (
        <Box>
            <Container>
                <MenuAppBar />
            </Container>
            <Container>
                <Hero />
            </Container >
            <div align="center">
                <SignUp refresh={props.refreshMembersUponSignUp} />
            </div>
            <br />
            <br />
            <br />
            <div align="center">
                <Link to="/about">learn more</Link>
            </div>
        </Box>
    )
}

export default Splash