import React from 'react'
import {useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import HandshakeIcon from '@mui/icons-material/Handshake'

const HowItWorks = () => {
  const theme = useTheme()

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          The Cash Exchange (IRL P2P DeFi)
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}
        >
          How it works
        </Box>
      </Box>
      <Grid container spacing={4}>
        {[
          {
            title: 'Submit your offer.',
            subtitle:
              "Let the CashClan know how much (aka the 'premium') you're willing to buy/sell cash for in-person, for digital payment/receipt by phone.",
            icon: (
              <SendToMobileIcon />
            ),
          },
          {
            title: 'Get matched.',
            subtitle:
              "Your offer will be optimally matched based on location and the best bang (savings or earnings) for your buck.",
            icon: (
              <ConnectWithoutContactIcon />
            ),
          },
          {
            title: 'Meet to exchange cash.',
            subtitle:
              "With verified names and pictures, securely get/give cash from/to your match for the specified digital payment/receipt.",
            icon: (
              <HandshakeIcon />
            ),
          },
        ].map((item, i) => (
          <Grid key={i} item xs={12} md={4} data-aos={'fade-up'}>
            <Box
              component={Avatar}
              marginBottom={2}
              variant="rounded"
              bgcolor={theme.palette.primary.dark}
            >
              <Box>{item.icon}</Box>
            </Box>
            <Typography variant="h6" align={'left'} gutterBottom>
              {item.title}
            </Typography>
            <Typography color="text.secondary" align={'left'} component="p">
              {item.subtitle}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default HowItWorks
