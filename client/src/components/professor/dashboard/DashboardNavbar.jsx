import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';

function DashboardNavbar({onMobileNavOpen,handleSignout, ...rest}) {
   
    return (
        <AppBar
            elevation={0}
            {...rest}
           
        >
            <Toolbar
                  style={{
                    backgroundColor: '#506198',
                    color:'#fff'
                }}
            >
                <Link to='/'
                    style={{
                        color:'#fff',
                        textDecoration:'none',
                        fontSize:'2rem'
                    }}
                >
                    Mscursos
                </Link>
                <Box style={{flexGrow: 1}}/>
                <Hidden mdDown>
                   <IconButton 
                        color="inherit"
                        onClick={handleSignout}>
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
