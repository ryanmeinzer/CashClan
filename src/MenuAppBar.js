import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import {useMemberContext} from './providers/member'

const MenuAppBar = () => {

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
            <AppBar position="static" color="transparent" sx={{mb: 5}}>
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
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>)
                        :
                        (<div>
                            <Button variant="contained" color="primary" endIcon={<AccountCircle />}>LOG IN</Button>
                        </div>)
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MenuAppBar