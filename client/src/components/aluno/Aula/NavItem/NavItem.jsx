import { Box, Button, ListItem } from '@material-ui/core'
import React, { useState } from 'react'
import {  NavLink, useLocation } from 'react-router-dom'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import useStyles from './styles'

function Navitem({href,title,visualization, ...rest}) {
    const location = useLocation()

    const active = location.pathname === href

    const [hover,setHover] = useState(false)
 
    const classes = useStyles()
    
    return (
        <ListItem
            disableGutters
            className={classes.listItem}
            {...rest}
        >  
         
            <Button
                component={NavLink}
                className={classes.button}
                to={href}
            >
                 <span  style={{
                    borderLeft: `0.5rem solid ${active ? '#506198' : '#212121'}`,
                    height: '2.5rem'
                }}>'</span>
                <Box style={{margin:'0.3rem'}}/>
                <span
                    style={{
                        color: !visualization ? '#fff': '#4ed687', 
                    }}
                    className={classes.title}
                >
                    {title}
                </span>
                <Box style={{flexGrow: 1}}/>
                {
                    visualization && (
                        <CheckBoxIcon 
                            className={classes.icon}
                            />
                    )
                }
            </Button>
        </ListItem>
    )
}

export default Navitem
