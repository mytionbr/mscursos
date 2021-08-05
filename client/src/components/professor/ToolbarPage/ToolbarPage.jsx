import { Box, Breadcrumbs, Button, Card, Link, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
import {Link as LinkRoute} from 'react-router-dom'

function ToolbarPage({btns,links,title,...rest}) {
    const classes = useStyles()

    return (
        <Box {...rest}>
            <Box>
                <Breadcrumbs>
                {
                    links.map(link=>
                        <Link color="inherit">
                            <LinkRoute to={link.href}> 
                                {link.name}
                            </LinkRoute>
                        </Link>
                    )
                }
                </Breadcrumbs>
            </Box>
            <Box className={classes.boxContainer}>
                <Box>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                </Box>

                <Box>
                    {btns.map(btn=>
                         <Button 
                            className={classes.buttonAddCurso}  
                            variant="contained">
                            {btn.name}
                        </Button>    
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default ToolbarPage
