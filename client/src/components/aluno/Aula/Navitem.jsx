import { Box, Button, ListItem } from '@material-ui/core'
import React from 'react'
import {  NavLink,Link, useLocation } from 'react-router-dom'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
function Navitem({href,title,visualization, ...rest}) {
    const location = useLocation()

    const active = location.pathname === href

    return (
        <ListItem
            disableGutters
            style={{
                display: 'flex',
                py: 0,
            }}
            {...rest}
        >  
            <Button
                component={NavLink}
                style={{
                    fontWeight: '600',
                    justifyContent: 'flex-start',
                    letterSpacing: 0,
                    textTransform: 'none',
                    width: '100%',
                    "&:hover":{
                        background:'#adb4be',
                    },
                    background: active ? '#506198' : '#2c2d2e',
                }}
                to={href}
            >
                <span
                    style={{
                        color: !visualization ? '#fff': '#1ab359',
                        fontSize: '1.2rem'
                    }}
                >
                    {title}
                </span>
                <Box style={{flexGrow: 1}}/>
                {
                    visualization && (
                        <CheckBoxIcon 
                            style={{
                                marginRight:'0.3rem',
                                color: '#1ab359',
                                fontSize: '1.6rem',
                            }}
                            />
                    )
                }
            </Button>
        </ListItem>
    )
}

export default Navitem
