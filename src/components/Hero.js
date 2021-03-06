import React, {useEffect, useRef} from 'react'
import Typed from 'typed.js'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import {ReactComponent as CashTransferSvg} from '../images/cash_transfer.svg'
import SignUp from '../SignUp'

const Hero = (props) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  })

  // Create reference to store the DOM element containing the animation
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed = useRef(null)
  useEffect(() => {
    const options = {
      strings: [
        'Save',
        'Earn',
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    }
    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options)
    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy()
    }
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box data-aos={'fade-right'} data-aos-anchor-placement="top-bottom" ml={isMd ? 4 : 0}>
          <Box mb={2}>
            <Typography
              variant="h2"
              component={'h2'}
              sx={{
                fontWeight: 700,
              }}
            >
              Let's{' '}
              <Typography
                variant="h2"
                component={'span'}
                color="secondary"
                sx={{
                  fontWeight: 700,
                }}
              >
                <Typography
                  variant="h2"
                  component={'span'}
                  color="secondary"
                  sx={{
                    fontWeight: 900,
                  }}
                >
                  <span ref={el} />
                </Typography>
              </Typography>
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
              }}
            >
              money together.
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="h6" component="p" color="textSecondary">
              Get cash from people, not ATMs. Give cash to people, not banks. By the people, for the people - the CashClan. 
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{xs: 'stretched', sm: 'flex-start'}}
          >
            <SignUp refresh={props.refresh} heroOrigin={true} isMd={isMd} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          height={'100%'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          data-aos={'fade-left'}
          mt={isMd ? -4 : -2}
          ml={isMd ? 6 : 0}
        >
          <Box
            height={'100%'}
            width={'100%'}
            maxWidth={{xs: 500, md: '100%'}}
          >
            <CashTransferSvg width={'100%'} height={'100%'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Hero
