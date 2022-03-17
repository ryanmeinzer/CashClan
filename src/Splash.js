import Hero from './components/Hero'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {useTheme} from '@mui/material/styles'
import Partners from './components/Partners'
import HowItWorks from './components/HowItWorks'

const Splash = (props) => {

    const theme = useTheme()

    return (
        <Box sx={{mt: 16}}>
            <Container>
                <Hero refresh={props.refresh} />
            </Container >
            <Box maxWidth={'100%'} bgcolor={theme.palette.primary.dark} minHeight={'12rem'} sx={{display: 'flex', alignItems: 'center', mt: 4}} >
                <Container >
                    <Partners />
                </Container>
            </Box>
            <Container sx={{mt: 8}} >
                <HowItWorks />
            </Container>
        </Box>
    )
}

export default Splash