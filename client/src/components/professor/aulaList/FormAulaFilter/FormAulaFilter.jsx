import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

import { findAulas } from '../../../../actions/aulaActions'

function FormAulaFilter({ onModalClose, curso  }) {
  const classes = useStyles()

  const dispatch = useDispatch();

  const [nome, setNome] = useState("");

  const handlerInput = (e) => {
    const { value } = e.target;

    setNome(value);
  };



  const handlerClear = () => {
    if (curso){
      dispatch(
        findAulas({
          nome: "",
          curso: curso.curso_id,
        })
      );
      setNome("");
    } else {
      alert('Selecione um curso')
    }
   
    onModalClose()
  };

  const handlerSubmit = () => {
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
          <Typography variant="h6">Filtre por um curso</Typography>
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handlerInput}
            value={nome}
          />

          <Button
            type="submit"
            className={classes.button}
            variant="outlined"
            color="secundary"
            size="large"
            onClick={handlerSubmit}
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
            onClick={handlerClear}
          >
            Limpar
          </Button>
        </div>
    )
}

export default FormAulaFilter
