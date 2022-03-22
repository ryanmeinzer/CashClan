import React, {useEffect} from 'react'
import Hero from './components/Hero'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Partners from './components/Partners'
import HowItWorks from './components/HowItWorks'
import Divider from '@mui/material/Divider'
import Who from './components/Who'
import AOS from 'aos'
import "aos/dist/aos.css"
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Screenshots from './components/Screenshots'

const Splash = (props) => {

    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    })

    useEffect(() => {
        AOS.init({
            once: true,
            delay: 50,
            duration: 500,
            easing: 'ease-in-out',
        })
    }, [])

    return (
        <Box sx={{mt: isMd ? 10 : 4}}>
            <Container sx={{mb: isMd ? 2 : 0}}>
                <Hero refresh={props.refresh} />
            </Container >
            <Box maxWidth={'100%'} bgcolor={'primary.dark'} minHeight={'12rem'} sx={{display: 'flex', alignItems: 'center'}} >
                <Container >
                    <Partners />
                </Container>
            </Box>
            <Container sx={{mt: 8}} >
                <HowItWorks />
            </Container>
            <Divider sx={{mt: 8, mb: 8}} />
            <Container sx={{textAlign: '-webkit-center'}}>
                <Screenshots />
            </Container>
            <Divider sx={{mt: 8, mb: 8}} />
            <Container>
                <Who refresh={props.refresh} />
            </Container>
        </Box>
    )
}

export default Splash