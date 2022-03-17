import {Link} from "react-router-dom"
import Hero from './components/Hero'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {useTheme} from '@mui/material/styles'
import Partners from './components/Partners'

const Splash = (props) => {

    const theme = useTheme()

    return (
        <Box sx={{mt: 16}}>
            <Container>
                <Hero refresh={props.refresh} />
            </Container >
            <Box maxWidth={'100%'} bgcolor={theme.palette.primary.dark} height={'12rem'} sx={{display: 'flex', alignItems: 'center', mt: 4}} >
                <Container >
                    <Partners />
                </Container>
            </Box>
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