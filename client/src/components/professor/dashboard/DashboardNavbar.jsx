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
            <Toolbar
                  style={{
                    backgroundColor: '#506198'
                }}
            >
                <Link to='/'>
                    Mscursos
                </Link>
                <Box style={{flexGrow: 1}}/>
                <Hidden mdDown>
                   <IconButton color="inherit">
                        <InputIcon />
                   </IconButton>
                </Hidden>
                <Hidden mdUp>
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
