import { Button, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import useStyles from './styles'
function EndProcess() {
    const classes = useStyles()
    return (
        <Paper className={classes.paper}>
            <DoneOutlineIcon className={classes.icon} />
            <Typography variant='h4' gutterBottom>
                Compra finalizada com sucesso!
            </Typography>
             <Button
                className={classes.button}
                component={Link}
                variant="contained" 
                color="secondary" 
                to={'/aluno/app'}
        >
            Acesse a plataforma
        </Button>
        </Paper>
    )
}

export default EndProcess
