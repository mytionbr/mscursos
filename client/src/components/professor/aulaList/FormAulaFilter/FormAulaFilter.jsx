import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

import { findAulas } from '../../../../actions/aulaActions'

function FormAulaFilter({ onModalClose, curso,nome, setNome}) {
  const classes = useStyles()

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { value } = e.target;
    setNome(value);
  };

  const handleClear = () => {
      dispatch(
        findAulas({
          nome: "",
          curso: curso,
        })
      );
    setNome("");   
    onModalClose()
  };

  const handleSubmit = () => {
    if (curso) {
      dispatch(
        findAulas({
          nome: nome || "",
          curso: curso || curso.curso_id,
        })
      );
    }else {
      alert('Selecione um curso')
    }
    
    onModalClose()
  };

  return (
        <div className={classes.form}>
          <Typography variant="h6">Filtre por uma aula</Typography>
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handleInput}
            value={nome}
          />

          <Button
            type="submit"
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            Filtrar
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            type="large"
            fullWidth
            onClick={handleClear}
          >
            Limpar
          </Button>
        </div>
    )
}

export default FormAulaFilter
