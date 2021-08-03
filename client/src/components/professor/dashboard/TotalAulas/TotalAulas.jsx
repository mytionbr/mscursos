import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import React from 'react'
import ClassIcon from '@material-ui/icons/Class';

function TotalAulas(props) {
    return (
        <Card
            style={{height: '100%'}}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    style={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h4"
                        >
                            Minhas Aulas
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            12
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            style={{
                                backgroundColor: red[600],
                                height: '4rem',
                                width: '4rem'
                            }}
                        >
                            <ClassIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TotalAulas