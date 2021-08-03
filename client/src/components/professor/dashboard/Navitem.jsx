import { Button, ListItem } from '@material-ui/core'
import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'

function Navitem({href, icon: Icon, title, ...rest}) {
    const location = useLocation()

    const active = href ? !!matchPath({
        path: href,
        end: false
    }, location.pathname) : false
    
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
                    color: 'text.secondary',
                    fontWeight: 'medium',
                    justifyContent: 'flex-start',
                    letterSpacing: 0,
                    textTransform: 'none',
                    width: '100%',
                    ...(active && {
                        color: '#506198'
                    }),
                    '& svg':{
                      
                    }
                }}
                to={href}
            >
                {
                    Icon && (
                        <Icon 
                            
                            style={{
                                marginRight:'0.3rem',
                                color:'#757575',
                                fontSize: '1.6rem'
                            }}
                            />
                    )
                }
                <span
                    style={{
                        color:'#757575',
                        fontSize: '1.2rem'
                    }}
                >
                    {title}
                </span>
            </Button>
        </ListItem>
    )
}

export default Navitem
