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
import { listCategoria } from "../../../../actions/categoriaActions";
import MessageBox from "../../../core/MessageBox/MessageBox";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";

import useStyles from "./styles";
import { detailsCurso, findCursosByProfessor, updateCurso } from "../../../../actions/cursoActions";
import { useHistory } from "react-router-dom";
import {
  CURSO_UPDATE_RESET,
} from "../../../../constants/cursoConstants";
import { detailsAula } from "../../../../actions/aulaActions";

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
    cursos,
    loading: loadingCursos,
    error: errorCursos,
  } = cursoProfessor;

  useEffect(() => {
    dispatch(
      findCursosByProfessor({
        nome: "",
        categorias: [],
      })
    );
  }, [dispatch]);

  useEffect(() => {
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
    }
  }, [aula, aulaId, cursoId, dispatch, history, successUpdate]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [curso, setCurso] = useState("");

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
    dispatch(
      updateAula({
        aula_id: aulaId,
        nome: nome,
        descricao: descricao,
        curso_id: curso,
      })
    );
  };

  return (
    <Card {...rest}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
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
            errorUpdate && <MessageBox type="error">{error}</MessageBox>
          )}
        </Box>
         
      )
      }
    </Card>
  );
}

export default UpdateFormAula;
