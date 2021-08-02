import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';

function DashboardNavbar({onMobileNavOpen, ...rest}) {
    
    return (
        <AppBar
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <Link to='/'>
                    Mscursos
                </Link>
                <Box sx={{flexGrow: 1}}/>
                <Hidden lgDown>
                   <IconButton color="inherit">
                        <InputIcon />
                   </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton 
                        color="inherit"
                        onClick={onMobileNavOpen}>
                            <MenuIcon />
                    </IconButton>
                   </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default DashboardNavbar
