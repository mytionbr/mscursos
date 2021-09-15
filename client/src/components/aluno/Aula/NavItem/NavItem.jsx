import { Box, Button, Collapse, ListItem } from '@material-ui/core'
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
                 <Collapse  appear={true} in={true} timeout={700}>
                    <span  style={{
                        borderLeft: `0.7rem solid ${active ? '#506198' : '#212121'}`,
                        fontSize: '1.2rem',
                    }}>'</span>
                </Collapse>
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
