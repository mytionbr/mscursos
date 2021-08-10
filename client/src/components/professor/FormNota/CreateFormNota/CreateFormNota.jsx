import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from '../../../core/MessageBox/MessageBox';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';

import useStyles from "./styles";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import { useHistory } from 'react-router-dom';
import { createNota, findAlunos } from "../../../../actions/alunoActions";
import { ALUNO_NOTA_CREATE_RESET } from "../../../../constants/alunoConstantes";
import Alert from "@material-ui/lab/Alert";

function CreateFormNota(props) {
  const classes = useStyles();
  const history = useHistory()

  const dispatch = useDispatch();
  const notaCreated = useSelector((state) => state.notaCreate);
  const { loading, error, success } = notaCreated;

  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { 
    loading: loadingCursos, 
    error: errorCursos, 
    data: cursos } = cursoProfessor;

  const alunosCurso = useSelector((state)=> state.alunoFind)
  const {
    loading: loadingAlunos,
    error: errorAlunos,
    data: alunos} = alunosCurso

  const [nota, setNota] = useState(0);
  const [aluno, setAluno] = useState(null);
  const [curso, setCurso] = useState(null);
  const [aprovado, setAprovado] = useState(false);

  useEffect(() => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);
  
 useEffect(()=> {
  if(curso && cursos){
    dispatch(
      findAlunos({
        curso: curso,
      })
    );
  }
 },[curso, cursos, dispatch])

  useEffect(()=>{
    if (success) {
        dispatch({type:ALUNO_NOTA_CREATE_RESET})
        history.push('/professor/app/alunos')
    }
  },[dispatch, history, success])
  
  const handleChangeNota = (event) => {
    const value = event.target.value;
    if(String(value).length  > 2 ){
      setNota(0);
    } else 
    if(Number(value) < 0 ){
      setNota(0);
    } else if (Number(value) > 10){
      setNota(10)
    } else {
      setNota(value);
    }

    
  };

  const handleChangeAluno = (event) => {
    const value = event.target.value;
    setAluno(value);
  };

  const handleChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleChangeAprovado = () => {
    const value = nota > 6;
    setAprovado(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(nota && curso && aluno){
      dispatch(createNota(
        {
            nota: nota,
            aluno: aluno,
            curso: curso
        }))
    }else {
      alert('campos não preenchidos corretamente!')
    }
   
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
     handleChangeAprovado()
    }
  }

  return (
    <Card {...props}>
      <Box className={classes.boxContainer}>
      {loadingCursos ? (
          <LoadingBox />
        ) : errorCursos ? (
          <MessageBox type="error">{errorCursos}</MessageBox>
        ) : (
          <FormControl  color="secondary" variant="filled" className={classes.formControl}>
            <InputLabel id="cursos">Curso</InputLabel>
            <Select
              labelId="cursos"
              id="cursos"
              value={curso}
              onChange={handleChangeCurso}
            >
              {cursos.map((item) => (
                <MenuItem value={item.curso_id}>{item.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {
        !curso ? (
          <MessageBox type="info">{'Selecione um curso'}</MessageBox>
        ) : loadingAlunos ? (
          <LoadingBox />
        ) : errorAlunos ? (
          <MessageBox type="error">{errorCursos}</MessageBox>
        ) : (
          <FormControl  color="secondary" variant="filled" className={classes.formControl}>
            <InputLabel id="alunos">Alunos</InputLabel>
            <Select
              labelId="alunos"
              id="alunos"
              value={aluno}
              onChange={handleChangeAluno}
            >
              {alunos.map((item) => (
                <MenuItem value={item.aluno_id}>{item.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {!curso ? (
          ''
        ) : !aluno ? (
          <MessageBox type="info">{'Selecione um aluno'}</MessageBox>
        ) : (
          <>
          <TextField
          name="nota"
          variant="outlined"
          label="Nota"
          color="secondary"
          fullWidth
          type="number"
          onChange={handleChangeNota}
          onBlur={handleChangeAprovado}
          value={nota}
          required
          onKeyDown={handleKeyDown}
        />

        <Alert icon={false} variant="filled" severity={aprovado ? "success" : "error"}>
          {aprovado ? 'Aprovado' : 'Reprovado'}
        </Alert>   

        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="secundary"
          size="large"
          onClick={handleSubmit}
          fullWidth
        >
          Salvar
        </Button>
        </>
        )}
        
        
        {
            loading ? (
                <LoadingBox />
            ) :
            error && (
                <MessageBox type="error">
                    {error}
                </MessageBox>
            )
        }
      </Box>
    </Card>
  );
}

export default CreateFormNota;
