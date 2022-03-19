import React, {useEffect} from 'react'
import Hero from './components/Hero'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Partners from './components/Partners'
import HowItWorks from './components/HowItWorks'
import Divider from '@mui/material/Divider'
import Who from './components/Who'
import Footer from './components/Footer'
import AOS from 'aos'
import "aos/dist/aos.css"

const Splash = (props) => {

    useEffect(() => {
        AOS.init({
            once: true,
            delay: 25,
            duration: 500,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <Box sx={{mt: 6}}>
            <Container>
                <Hero refresh={props.refresh} />
            </Container >
            <Box maxWidth={'100%'} bgcolor={'primary.dark'} minHeight={'12rem'} sx={{display: 'flex', alignItems: 'center', mt: 4}} >
                <Container >
                    <Partners />
                </Container>
            </Box>
            <Container sx={{mt: 8}} >
                <HowItWorks />
            </Container>
            <Divider sx={{mt: 8, mb: 8}} />
            <Container>
                <Who refresh={props.refresh} />
            </Container>
            <Divider sx={{mt: 8, mb: 4}} />
            <Container>
                <Footer />
            </Container>
        </Box>
    )
}

export default Splash