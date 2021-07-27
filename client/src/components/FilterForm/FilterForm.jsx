import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

function FilterForm() {
    const classes = useStyles()
    
    return (
        <Paper elevation={2} className={classes.paper}>
            <form className={classes.form} autoComplete="off" noValidate>
                <Typography variant="h6">
                    Filtre por um curso
                </Typography>
                <TextField 
                    name="nome"
                    variant="outlined"
                    label="Nome"
                    fullWidth    
                />
                <TextField 
                    name="categoria"
                    variant="outlined"
                    label="Categoria"
                    fullWidth    
                />
                <Button className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth>Filtrar</Button>
                <Button className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth>Limpar</Button>
            </form>
        </Paper>
    )
}

export default FilterForm
