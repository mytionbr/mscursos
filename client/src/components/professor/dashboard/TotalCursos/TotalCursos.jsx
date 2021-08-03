import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { blue } from '@material-ui/core/colors'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

function TotalCursos(props) {
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
                            Meus Cursos
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
                                backgroundColor: blue[600],
                                height: '4rem',
                                width: '4rem'   
                            }}
                        >
                            <CollectionsBookmarkIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TotalCursos
