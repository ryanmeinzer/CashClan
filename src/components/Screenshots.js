import React from 'react'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import PublishScreenshot from '../images/publish-screenshot.png'
import MatchScreenshot from '../images/match-screenshot.png'

const Screenshots = () => {
  return (
    <Box>
      <Grid container spacing={4} sx={{justifyContent: "center"}}>
        <Grid item xs={12} sm={6} md={6} data-aos={'fade-right'} sx={{textAlign: '-webkit-center'}}>
          <CardMedia
            component="img"
            image={PublishScreenshot}
            sx={{
              maxWidth: '20rem',
              pointerEvents: "none"
            }}
            alt="Publish Screenshot"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} data-aos={'fade-left'} sx={{textAlign: '-webkit-center'}} >
          <CardMedia
            component="img"
            image={MatchScreenshot}
            sx={{
              maxWidth: '20rem',
              pointerEvents: "none"
            }}
            alt="Match Screenshot"
          />
        </Grid>
      </Grid>
    </Box >
  )
}

export default Screenshots
