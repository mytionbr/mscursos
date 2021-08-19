import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
function CursoCardSimple(props) {
    const { name, icon, action } = props
    const classes = useStyles()
    return (
        <Grid item xs={3}>
            <Card className={classes.card}
        onClick={action}
        {...props}
        >
            <CardContent>
                <Grid className={classes.gridContainer}>
                    <Avatar className={classes.cardAvatar} >
                        {icon}
                    </Avatar>
                    <Typography color="textSecondary" gutterBottom variant="h4">
                         {name}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
        </Grid>
        
    )
}

export default CursoCardSimple
