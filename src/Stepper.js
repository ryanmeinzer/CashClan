import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import SendToMobileIcon from '@mui/icons-material/SendToMobile'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import HandshakeIcon from '@mui/icons-material/Handshake'
import Avatar from '@mui/material/Avatar'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import {FontAwesomeIcon} from 'react-fontawesome'

const Stepper = ({state, hasMatch}) => {
    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    mt: 4,
                    mb: 4
                }}
            >
                <Box
                    component={Avatar}
                    bgcolor={state.active ? 'primary.dark' : 'text.disabled'}
                    variant="rounded"
                >
                    <SendToMobileIcon />
                </Box>
                <Box
                    alignSelf={'center'}
                >
                    <ArrowForwardIcon sx={{color: state.active ? 'primary.dark' : 'text.disabled'}} />
                </Box>
                <Box
                    component={Avatar}
                    bgcolor={hasMatch ? 'primary.dark' : 'text.disabled'}
                    variant="rounded"
                >
                    <ConnectWithoutContactIcon />
                </Box>
                <Box
                    alignSelf={'center'}
                >
                    <ArrowForwardIcon sx={{color: hasMatch ? 'primary.dark' : 'text.disabled'}} />
                </Box>
                <Box
                    component={Avatar}
                    bgcolor={'text.disabled'}
                    variant="rounded"
                >
                    <HandshakeIcon />
                </Box>
            </Stack>
        </Box>
    )
}

export default Stepper