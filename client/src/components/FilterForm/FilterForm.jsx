import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategoria } from '../../actions/categoriaActions'
import useStyles from './styles'
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoadingBox from '../core/LoadingBox/LoadingBox'
import MessageBox from '../core/MessageBox/MessageBox'


function FilterForm() {
    const classes = useStyles()
    
    const dispatch = useDispatch()
    const categoriaList = useSelector((state) => state.categoriaList)
    const { loading, error, categorias } = categoriaList
    
    const [ nome, setNome ] = useState('')
    const [ categoriasTags, setCategoriasTags ] = useState([])

    useEffect(()=>{
        dispatch(listCategoria())
    },[dispatch])

    
   

    const handlerInput = (e) =>{
        const { value } = e.target 

        setNome(value)
    }

    const handlerInputCategorias = (event,newValue) => {
        if(typeof newValue === 'string'){
            setCategoriasTags({categoria: newValue,})
        } else if (newValue && newValue.inputValue){
            setCategoriasTags({
                categoria: newValue.inputValue,
            })
        } else {
            setCategoriasTags(newValue)
        }
       
    }

    const handlerClear = ()=>{
        setNome('')
        setCategoriasTags([])
    }


    const Categorias = () => {
        
        return (
            <Autocomplete
            multiple
            limitTags={2}
            fullWidth
            options={categorias}
            getOptionLabel={(option) => option.nome}
            onChange={handlerInputCategorias}
            value={categoriasTags}
            renderInput={(params) => (
              <TextField {...params} color="secondary" variant="outlined" label="categorias" placeholder="categorias" />
            )}
          />
        )
    }

    return (
        <Paper elevation={2} className={classes.paper} position="static">
            <div className={classes.form}>
                <Typography variant="h6">
                    Filtre por um curso
                </Typography>
                <TextField 
                    name="nome"
                    variant="outlined"
                    label="Nome"
                    color="secondary"
                    fullWidth
                    onChange={handlerInput}  
                    value={nome}  
                />
               {loading 
                    ? <LoadingBox />
                    : error 
                    ? <MessageBox type="error">{error.message}</MessageBox>
                    : <Categorias />
                }
                   
              
                <Button type="submit" className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth>Filtrar</Button>
                <Button className={classes.button} variant="outlined" color="secundary" size="large" type="large" fullWidth onClick={handlerClear}>Limpar</Button>
            </div>
        </Paper>
    )
}

export default FilterForm
