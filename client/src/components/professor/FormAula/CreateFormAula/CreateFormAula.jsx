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
import { createCurso, findCursosByProfessor } from "../../../../actions/cursoActions";
import { useHistory } from 'react-router-dom'
import { AULA_CREATE_RESET } from "../../../../constants/aulaConstantes";

function CreateFormAula(props) {
  const classes = useStyles();
  const history = useHistory()

  const dispatch = useDispatch();
  const aulaCreated = useSelector((state) => state.aulaCreate);
  const { loading, error, success } = aulaCreated;

  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const { 
    loading: loadingCursos, 
    error: errorCursos, 
    data: cursos } = cursoProfessor;

  useEffect(() => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);

  useEffect(()=>{
    if (success) {
        dispatch({type:AULA_CREATE_RESET})
        history.push('/professor/app/aulas')
    }
  },[dispatch, history, success])

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [curso, setCurso] = useState(null);

  const handlerChangeNome = (event) => {
    const value = event.target.value;
    setNome(value);
  };

  const handlerChangeDescricao = (event) => {
    const value = event.target.value;
    setDescricao(value);
  };

  const handlerChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createCurso(
        {
            nome: nome,
            descricao: descricao, 
            curso_id: curso
        }))
  };

  return (
    <Card {...props}>
      <Box className={classes.boxContainer}>
        <TextField
          name="nome"
          variant="outlined"
          label="Nome"
          color="secondary"
          fullWidth
          onChange={handlerChangeNome}
          value={nome}
        />
        <TextField
          name="nome"
          variant="outlined"
          multiline
          label="Descrição"
          color="secondary"
          fullWidth
          onChange={handlerChangeDescricao}
          value={descricao}
        />
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
              onChange={handlerChangeCurso}
            >
              {cursos.map((item) => (
                <MenuItem value={item.curso_id}>{item.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button
          type="submit"
          className={classes.button}
          variant="outlined"
          color="secundary"
          size="large"
          onClick={handlerSubmit}
          fullWidth
        >
          Salvar
        </Button>
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

export default CreateFormAula;
