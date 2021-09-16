import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../core/MessageBox/MessageBox";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";

import useStyles from "./styles";
import { findCursosByProfessor } from "../../../../actions/cursoActions";
import { useHistory } from "react-router-dom";
import { detailsAula, updateAula } from "../../../../actions/aulaActions";
import { AULA_UPDATE_RESET } from "../../../../constants/aulaConstantes";
import MDEditor from "@uiw/react-md-editor";

function UpdateFormAula({aulaId,cursoId,...rest}) {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const cursoProfessor = useSelector((state) => state.cursoProfessor);
  const aulaDetails = useSelector((state) => state.aulaDetails);
  const { loading, error,  aula } = aulaDetails;

  const aulaUpdate = useSelector((state) => state.aulaUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = aulaUpdate;

  const {
    data,
    loading: loadingCursos,
    error: errorCursos,
  } = cursoProfessor;
  const cursos = data ? data : [];

  useEffect(() => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);

  useEffect(() => {
    console.log(aula,aulaId,successUpdate)
    if (successUpdate) {
      dispatch({ type: AULA_UPDATE_RESET });
      history.push("/professor/app/aulas");
    }
    if (!aula || aula.aula_id !== Number(aulaId) || successUpdate) {
      dispatch({ type: AULA_UPDATE_RESET });
      dispatch(detailsAula(aulaId,cursoId));
    } else {
      setNome(aula.nome);
      setCurso(aula.curso_id);
      setDescricao(aula.descricao);
      setDuracao(aula.duracao)
      setConteudo(aula.conteudo)
    }
  }, [aula, aulaId, cursoId, dispatch, history, successUpdate]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [curso, setCurso] = useState("");
  const [duracao, setDuracao] = useState(0);
  const [conteudo, setConteudo] = useState('')

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

  const handlerChangeDuracao = (event) => {
    const re = /^[0-9\b]+$/;
    const value = event.target.value;
    if (value === '' || re.test(value)) {
      setDuracao(value);
    }   
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateAula({
        aula_id: aulaId,
        nome: nome,
        descricao: descricao,
        curso_id: curso,
        duracao:duracao
      })
    );
  };

  return (
    <Card {...rest}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type="error">{error}</MessageBox>
      ) : (
        <Box className={classes.boxContainer}>
          <Typography variant="h6">AULA ID: {aulaId}</Typography>
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
            label="Descrição"
            color="secondary"
            fullWidth
            onChange={handlerChangeDescricao}
            value={descricao}
            rows={4}
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
          {loadingCursos ? (
            <LoadingBox />
          ) : errorCursos ? (
            <MessageBox type="error">{errorCursos}</MessageBox>
          ) : (          
            <FormControl
              color="secondary"
              variant="filled"
              className={classes.formControl}
            >
             
              <InputLabel id="cursos">Cursos</InputLabel>
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

          <MDEditor
            value={conteudo}
            onChange={setConteudo}
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
            Salvar
          </Button>
          {loadingUpdate ? (
            <LoadingBox />
          ) : (
            errorUpdate && <MessageBox type="error">{errorUpdate}</MessageBox>
          )}
        </Box>
         
      )
      }
    </Card>
  );
}

export default UpdateFormAula;
