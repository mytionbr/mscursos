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
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h4"
                        >
                            Meus Alunos
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
                                backgroundColor: green[600],
                                height: '4rem',
                                width: '4rem'
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
