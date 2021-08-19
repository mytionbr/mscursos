import { Avatar, Card, CardContent, Grid, LinearProgress, Paper, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
function CursoCard(props) {
    const { name, percent,icon, action } = props

    const classes = useStyles()
    
    return (
        <Card className={classes.card}
        onClick={action}
        {...props}
        >
            <CardContent>
                <Grid className={classes.gridHeader}>
                    <Avatar className={classes.cardAvatar} >
                        {icon}
                    </Avatar>
                    <Typography color="textSecondary" gutterBottom variant="h4">
                         {name}
                    </Typography>
                </Grid>
                <Grid item className={classes.gridPercent}>
                    <Typography color="textSecondary" gutterBottom variant="h4">
                         {percent}%
                    </Typography>
                    <LinearProgress className={classes.percent} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CursoCard
