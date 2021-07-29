import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategoria } from '../../actions/categoriaActions'
import useStyles from './styles'

function FilterForm() {
    const classes = useStyles()
    
    const dispatch = useDispatch()
    const categoriaList = useSelector((state) => state.categoriaList)
    const { loading, error, categorias } = categoriaList
    
    useEffect(()=>{
        dispatch(listCategoria())
    },[dispatch])


    const Categorias = () => {
        console.log(categorias)
        return (
            <div>
            {categorias.map((c =>
                <p>{c.nome}</p>
            ))}
            </div>
        )
    }

    return (
        <Paper elevation={2} className={classes.paper} position="static">
            <form className={classes.form} autoComplete="off" noValidate>
                <Typography variant="h6">
                    Filtre por um curso
                </Typography>
                <TextField 
                    name="nome"
                    variant="outlined"
                    label="Nome"
                    color="secondary"
                    fullWidth    
                />
               {loading 
                    ? ('carregando')
                    : error 
                    ? ({error})
                    : <Categorias />
                }
                   
              
                <Button className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth>Filtrar</Button>
                <Button className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth>Limpar</Button>
            </form>
        </Paper>
    )
}

export default FilterForm
