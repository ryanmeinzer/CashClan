import React from 'react'
import Box from '@mui/material/Box'
import VenmoLogo from '../images/venmo_logo.svg'
import ApplePayLogo from '../images/apple_pay_logo.svg'
import ZelleLogo from '../images/zelle_logo.svg'
import ChimeLogo from '../images/chime_logo.svg'
import SquareCashAppLogo from '../images/square_cash_app_logo.svg'

const Partners = () => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent='center' >
      {[
        VenmoLogo,
        ApplePayLogo,
        ZelleLogo,
        ChimeLogo,
        SquareCashAppLogo
      ].map((item, i) => (
        <Box
          maxWidth={100}
          marginLeft={2}
          marginRight={2}
          marginTop={1}
          marginBottom={1}
          key={i}
        >
          <Box
            component="img"
            height={'100%'}
            width={'100%'}
            src={item}
            alt="..."
            sx={{
              filter: 'brightness(0) invert(1)',
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default Partners
