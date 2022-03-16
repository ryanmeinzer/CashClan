import React, {useEffect, useRef} from 'react'
import Typed from 'typed.js'
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CreditCardsIllustration from './CreditCards'

const Hero = () => {
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
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              component={'h2'}
              sx={{
                fontWeight: 700,
              }}
            >
              Easily{' '}
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
                    fontWeight: 700,
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
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="textSecondary">
              No more high ATM fees. Way more interest. Welcome to the new era of CashClan - The Cash Exchange (IRL P2P DeFi).
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{xs: 'stretched', sm: 'flex-start'}}
          >
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={!isMd}
            >
              Sign Up
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          height={'100%'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          data-aos={isMd ? 'fade-left' : 'fade-up'}
        >
          <Box
            height={'100%'}
            width={'100%'}
            maxWidth={{xs: 500, md: '100%'}}
          >
            <CreditCardsIllustration width={'100%'} height={'100%'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Hero
