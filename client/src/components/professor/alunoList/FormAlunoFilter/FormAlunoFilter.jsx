import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles'

import { findAlunos } from '../../../../actions/alunoActions'

function FormAlunoFilter({ onModalClose, currentCurso, nome, setNome, email, setEmail}) {
  const classes = useStyles()

  const dispatch = useDispatch();

  const handleInputName = (e) => {
    const { value } = e.target;
    setNome(value);
  };

  const handleInputEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleClear = () => {
      dispatch(
        findAlunos({
          curso: currentCurso,
          nome: '',
          email:'',
        })
      );
    setNome("");   
    setEmail("");   
    onModalClose()
  };

  const handleSubmit = () => {
    if (currentCurso) {
      dispatch(
        findAlunos({
          nome: nome || "",
          email: email || "",
          curso: currentCurso || currentCurso.curso_id,
        })
      );
    }else {
      alert('Selecione um curso')
    }
    
    onModalClose()
  };

  return (
        <div className={classes.form}>
          <Typography variant="h6">Filtre por um aluno</Typography>
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handleInputName}
            value={nome}
          />
           <TextField
            name="email"
            variant="outlined"
            label="Email"
            color="secondary"
            fullWidth
            onChange={handleInputEmail}
            value={email}
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

export default FormAlunoFilter
