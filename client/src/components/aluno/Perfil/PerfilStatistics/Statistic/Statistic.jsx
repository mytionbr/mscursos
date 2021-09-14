import { Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
function Statistic({icon, info, description}) {
    const classes = useStyles()
    return (
        <div className={classes.rootContainer}>
            {icon}
            <Typography variant="h6">
                {info}
            </Typography>
            <Typography variant="body1">
                {description}
            </Typography>

        </div>
    )
}

export default Statistic
