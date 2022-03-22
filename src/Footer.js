import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Logo from './images/cashclan_logo.png'
import Link from '@mui/material/Link'

const Footer = () => (
  <Box>
    <Typography
      align={'center'}
      gutterBottom
    >
      <img src={Logo} alt="Logo" style={{maxWidth: '2rem'}} />
    </Typography>
    <Typography
      align={'center'}
      variant={'subtitle2'}
      color="textSecondary"
      gutterBottom
    >
      &copy; CashClan 2022. All rights reserved. We take <Link href="/privacy" color="inherit">
        {'your privacy'}
      </Link> seriously.
    </Typography>
  </Box>
)

export default Footer
