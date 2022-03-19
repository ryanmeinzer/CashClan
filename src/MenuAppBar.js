import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
// ToDo - uncomment below once re - enabling Profile / Transactions page
// import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import {useMemberContext} from './providers/member'
import SignUp from './SignUp'
import Logout from './Logout'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import PopupState, {bindTrigger, bindMenu} from 'material-ui-popup-state'
import Logo from './images/cashclan_logo.png'

const MenuAppBar = (props) => {

    function HideOnScroll({children}) {
        const trigger = useScrollTrigger()
        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        )
    }

    const {member} = useMemberContext()
    const {isLoggedIn} = useMemberContext()

    return (
        <Box sx={{flexGrow: 1}}>
            <HideOnScroll >
                <AppBar position="fixed" sx={{backgroundColor: "#ffffff"}}>
                <Toolbar>
                        <Box
                            component="div"
                            sx={{flexGrow: 1}}
                        >
                            <img src={Logo} alt="Logo" style={{maxWidth: '2rem'}} />
                        </Box>
                    {member && isLoggedIn
                        ?
                        (<div>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <div>
                                            <Avatar alt="profile picture" src={member.image} {...bindTrigger(popupState)} />
                                            <Menu {...bindMenu(popupState)}>
                                                {/* // ToDo - uncomment below once re-enabling Profile/Transactions page */}
                                                {/* <MenuItem onClick={popupState.close}>Profile</MenuItem> */}
                                                <Logout onClick={popupState.close} handleClose={popupState.close} />
                                            </Menu>
                                        </div>
                                    )}
                                </PopupState>
                        </div>)
                        :
                        (<div>
                            <SignUp refresh={props.refresh} menuAppBarOrigin={true} />
                        </div>)
                    }
                </Toolbar>
            </AppBar>
            </HideOnScroll>
        </Box>
    )
}

export default MenuAppBar