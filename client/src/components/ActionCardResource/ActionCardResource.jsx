import { Avatar, Box, Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import GamepadIcon from '@material-ui/icons/Gamepad';
import { indigo } from '@material-ui/core/colors';

function ActionCardResource({resource, ...rest}) {
    return (
       <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
        {...rest}
       >
           <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb:3
                    }}
                >
                    <Avatar
                         sx={{
                            backgroundColor: indigo[600],
                            height: 56,
                            width: 56
                        }}                      
                    >
                        <GamepadIcon />
                    </Avatar>
                </Box>
                <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    {resource.name}
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                >
                    {resource.description}
                </Typography>
           </CardContent>

       </Card>
    )
}

export default ActionCardResource
