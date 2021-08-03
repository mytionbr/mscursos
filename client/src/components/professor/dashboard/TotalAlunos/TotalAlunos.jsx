import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { green } from '@material-ui/core/colors';
function TotalAlunos(props) {
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
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                    >
                        Meus Alunos
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        12
                    </Typography>
                
                    <Grid item>
                        <Avatar
                            style={{
                                backgroundColor: green[600],
                                height: 56,
                                width: 56
                            }}
                        >
                            <PeopleOutlineIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TotalAlunos
