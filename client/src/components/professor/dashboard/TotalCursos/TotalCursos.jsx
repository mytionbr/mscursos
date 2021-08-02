import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { blue } from '@material-ui/core/colors'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

function TotalCursos(props) {
    return (
        <Card
            sx={{height: '100%'}}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h3"
                    >
                        Meus Cursos
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        12
                    </Typography>
                
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: blue[600],
                                height: 56,
                                width: 56
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
