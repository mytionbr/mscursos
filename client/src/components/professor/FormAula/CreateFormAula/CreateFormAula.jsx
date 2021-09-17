import {
  Box,
  Button,
  Card,
  FormControl,
  Input,
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
import { useHistory } from 'react-router-dom'
import { AULA_CREATE_RESET } from "../../../../constants/aulaConstantes";
import { createAula } from "../../../../actions/aulaActions";
import MDEditor from "@uiw/react-md-editor";
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
  const [duracao, setDuracao] = useState(0)
  const [conteudo, setConteudo] = useState('')
  const [video, setVideo] = useState(null)
  
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

  const handlerChangeVideo = (event) => {
    const value = event.target.files[0];
    setVideo(value);
  };

  const handlerChangeDuracao = (event) => {
    const re = /^[0-9\b]+$/;
    const value = event.target.value;
    if (value === '' || re.test(value)) {
      setDuracao(value);
    }   
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(createAula(
        {
            nome: nome,
            descricao: descricao, 
            curso_id: curso,
            duracao: duracao,
            conteudo: conteudo,
            video:video
        }))
  };

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
              onChange={handlerChangeCurso}
            >
              {cursos.map((item) => (
                <MenuItem value={item.curso_id}>{item.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}{
          !curso ? (
            <MessageBox type="info">
              Selecione um curso
            </MessageBox>
          ) : (
            <>
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
          name="descricao"
          variant="outlined"
          multiline
          rows={4}
          label="Descrição"
          color="secondary"
          fullWidth
          onChange={handlerChangeDescricao}
          value={descricao}
        />

        <TextField
          name="duracao"
          variant="outlined"
          multiline
          label="Duração"
          color="secondary"
          fullWidth
          onChange={handlerChangeDuracao}
          value={duracao}
          placeholder={'Ex: 10 min'}
          helperText="O valor está em minutos"
          type='number'
        />
        <InputLabel id="cursos">Conteudo da aula</InputLabel>
        <MDEditor
          value={conteudo}
          onChange={setConteudo}
      />

      <InputLabel style={{marginLeft:'0.8rem'}} id="video">Video</InputLabel>
      <Input type="file" name="video" onChange={handlerChangeVideo}  />

        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          onClick={handlerSubmit}
          fullWidth
        >
          Salvar
        </Button>
          </>
          )
        }
        
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
