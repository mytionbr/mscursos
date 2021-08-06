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
import { createCurso, detailsCurso, updateCurso } from "../../../../actions/cursoActions";
import { useHistory } from "react-router-dom";
import {
  CURSO_UPDATE_RESET,
} from "../../../../constants/cursoConstants";

function UpdateFormCurso(props) {
  const classes = useStyles();

  const cursoId = props.match.params.id;
  const history = useHistory();

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const cursoDetails = useSelector((state) => state.cursoDetails);
  const { loading, error, data: curso } = cursoDetails;

  const cursoUpdate = useSelector((state) => state.cursoUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = cursoUpdate;

  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = categoriaList;

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CURSO_UPDATE_RESET });
      history.push("/professor/app/cursos");
    }
    if (!curso || curso.curso_id !== cursoId || successUpdate) {
      dispatch({ type: CURSO_UPDATE_RESET });
      dispatch(detailsCurso(cursoId));
    } else {
      setNome(curso.nome);
      setCategoria(curso.categoria_id);
      setDescricao(curso.descricao);
    }
  }, [curso, cursoId, dispatch, history, successUpdate]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handlerChangeNome = (event) => {
    const value = event.target.value;
    setNome(value);
  };

  const handlerChangeDescricao = (event) => {
    const value = event.target.value;
    setDescricao(value);
  };

  const handlerChangeCategoria = (event) => {
    const value = event.target.value;
    setCategoria(value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateCurso({
        curso_id: cursoId,
        nome: nome,
        descricao: descricao,
        categoria_id: categoria,
      })
    );
    history.push("/professor/app/cursos");
  };

  return (
    <Card {...props}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
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
          {loadingCategorias ? (
            <LoadingBox />
          ) : errorCategorias ? (
            <MessageBox type="error">{errorCategorias}</MessageBox>
          ) : (
            <FormControl
              color="secondary"
              variant="filled"
              className={classes.formControl}
            >
              <Typography variant="h4">ID: {curso.curso_id}</Typography>
              <InputLabel id="categorias">Categoria</InputLabel>
              <Select
                labelId="categorias"
                id="categorias"
                value={categoria}
                onChange={handlerChangeCategoria}
              >
                {categorias.map((item) => (
                  <MenuItem value={item.categoria_id}>{item.nome}</MenuItem>
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
      )}
    </Card>
  );
}

export default UpdateFormCurso;
