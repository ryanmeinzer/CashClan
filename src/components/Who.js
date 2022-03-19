import React from 'react'
import {alpha, useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import SvgIcon from '@mui/material/SvgIcon'

const Who = () => {
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
          Bridging the old and the new
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          Who Uses CashClan
        </Box>
      </Box>
      <Grid container spacing={4} >
        {[
          {
            title: 'The Cash-Poor',
            subtitle:
              "These members are charged a high ~20% premium to get cash from their credit cards. They save and get 'Cash-Rich' for a fraction of that premium through CashClan.",
            icon: (
              <SvgIcon
                sx={{
                  width: 48,
                  height: 48,
                  viewBox: "0 0 24 24",
                  stroke: "curentColor"
                }}
              >
                <path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.39.08-.75.21-1.1.36l1.51 1.51c.32-.08.69-.13 1.09-.13zM5.47 3.92L4.06 5.33 7.5 8.77c0 2.08 1.56 3.22 3.91 3.91l3.51 3.51c-.34.49-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.83-.55 2.46-1.12l2.22 2.22 1.41-1.41L5.47 3.92z" />
              </SvgIcon>
            ),
          },
          {
            title: 'The Cash-Rich',
            subtitle:
              "These members get hardly any interest (~0.5%) from banks for their cash. They earn much more interest by selling their cash through CashClan.",
            icon: (
              <SvgIcon
                sx={{
                  width: 48,
                  height: 48,
                  viewBox: "0 0 24 24",
                  stroke: "curentColor"
                }}
              >
                <path d="M15,10c0-0.55,0.45-1,1-1s1,0.45,1,1c0,0.55-0.45,1-1,1S15,10.55,15,10z M8,9h5V7H8V9z M22,7.5v6.97l-2.82,0.94L17.5,21 L12,21v-2h-2v2l-5.5,0C4.5,21,2,12.54,2,9.5S4.46,4,7.5,4l5,0c0.91-1.21,2.36-2,4-2C17.33,2,18,2.67,18,3.5 c0,0.21-0.04,0.4-0.12,0.58c-0.14,0.34-0.26,0.73-0.32,1.15l2.27,2.27H22z M20,9.5h-1L15.5,6c0-0.65,0.09-1.29,0.26-1.91 C14.79,4.34,14,5.06,13.67,6L7.5,6C5.57,6,4,7.57,4,9.5c0,1.88,1.22,6.65,2.01,9.5L8,19v-2h6v2l2.01,0l1.55-5.15L20,13.03V9.5z" />
              </SvgIcon>
            ),
          },
          {
            title: 'The Unbanked',
            subtitle:
              "These members (~5% of Americans) have no means to buy digitally. They become empowered with digital currency by converting their cash through CashClan.",
            icon: (
              <SvgIcon
                sx={{
                  width: 48,
                  height: 48,
                  viewBox: "0 0 24 24",
                  stroke: "curentColor"
                }}
              >
                <path d="M6.83,4H20c1.11,0,2,0.89,2,2v12c0,0.34-0.08,0.66-0.23,0.94L20,17.17V12h-5.17l-4-4H20V6H8.83 L6.83,4z M20.49,23.31L17.17,20H4c-1.11,0-2-0.89-2-2L2.01,6c0-0.34,0.08-0.66,0.23-0.93L0.69,3.51L2.1,2.1l19.8,19.8L20.49,23.31z M4,6.83V8h1.17L4,6.83z M15.17,18l-6-6H4v6H15.17z" />
              </SvgIcon>
            ),
          },
          {
            title: 'The Rest of Us',
            subtitle:
              "We're tired of the high fees charged by ATMs and banks (~$5.50 total) to get our cash. We save by buying cash through CashClan.",
            icon: (
              <SvgIcon
                sx={{
                  width: 48,
                  height: 48,
                  viewBox: "0 0 24 24",
                  stroke: "curentColor"
                }}
              >
                <path d="M8 9v1.5h2.25V15h1.5v-4.5H14V9H8zM6 9H3c-.55 0-1 .45-1 1v5h1.5v-1.5h2V15H7v-5c0-.55-.45-1-1-1zm-.5 3h-2v-1.5h2V12zM21 9h-4.5c-.55 0-1 .45-1 1v5H17v-4.5h1V14h1.5v-3.51h1V15H22v-5c0-.55-.45-1-1-1z" />
              </SvgIcon>
            ),
          }
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={6} key={i}>
            <Box component={Card} boxShadow={3} borderRadius={4}>
              <Box
                component={CardContent}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                padding={{xs: 2, sm: 4, md: 6}}
                sx={{
                  '&:last-child': {
                    paddingBottom: {xs: 2, sm: 4, md: 6},
                  },
                }}
              >
                <Box
                  component={Avatar}
                  variant="rounded"
                  width={84}
                  height={84}
                  marginBottom={2}
                  bgcolor={alpha(theme.palette.secondary.main, 0.1)}
                  borderRadius={5}
                >
                  <Box color={theme.palette.secondary.main}>{item.icon}</Box>
                </Box>
                <Typography
                  variant={'h6'}
                  gutterBottom
                  fontWeight={500}
                  align={'center'}
                >
                  {item.title}
                </Typography>
                <Typography align={'center'} color="textSecondary">
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Who
