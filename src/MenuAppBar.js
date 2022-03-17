import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
// import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import {useMemberContext} from './providers/member'
import SignUp from './SignUp'
import Logout from './Logout'

const MenuAppBar = (props) => {

    const {member} = useMemberContext()
    const {isLoggedIn} = useMemberContext()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="absolute" color="transparent">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                        🤑
                    </Typography>
                    {member && isLoggedIn
                        ?
                        (<div>
                            <Avatar alt="profile picture" src={member.image} onClick={handleMenu} />
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {/* // ToDo - uncomment below once re-enabling Profile/Transactions page */}
                                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                                <Logout handleClose={handleClose} />
                            </Menu>
                        </div>)
                        :
                        (<div>
                            <SignUp refresh={props.refresh} menuAppBarOrigin={true} />
                        </div>)
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MenuAppBar