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
import MDEditor from '@uiw/react-md-editor';
import useStyles from "./styles";
import { detailsCurso, updateCurso } from "../../../../actions/cursoActions";
import { useHistory } from "react-router-dom";
import {
  CURSO_UPDATE_RESET,
} from "../../../../constants/cursoConstants";

function UpdateFormCurso({cursoId,...rest}) {
  const classes = useStyles();
  
  const history = useHistory();

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const cursoDetails = useSelector((state) => state.cursoDetails);
  const { loading, error,  curso } = cursoDetails;

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

  console.log(loading, error,  curso)
  console.log(categorias)

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CURSO_UPDATE_RESET });
      history.push("/professor/app/cursos");
    }
    if (!curso || curso.curso_id !== Number(cursoId) || successUpdate) {
      dispatch({ type: CURSO_UPDATE_RESET });
      dispatch(detailsCurso(cursoId));
    } else {
      setNome(curso.nome);
      setCategoria(curso.categoria_id);
      setDescricao(curso.descricao);
      setResumo(curso.resumo)
    }
  }, [curso, cursoId, dispatch, history, successUpdate]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resumo, setResumo] = useState("")

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
        resumo: resumo
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
           <TextField
              name="cursoId"
              variant="outlined"
              label="Id"
              color="secondary"
              fullWidth
              value={cursoId}
              inputProps={
                { readOnly: true, }
              }
            />  
          <TextField
            name="nome"
            variant="outlined"
            label="Nome"
            color="secondary"
            fullWidth
            onChange={handlerChangeNome}
            value={nome}
          />
          
          {loadingCategorias ? (
            <LoadingBox />
          ) : errorCategorias ? (
            <MessageBox type="error">{errorCategorias}</MessageBox>
          ) : categorias && (          
            <FormControl
              color="secondary"
              variant="filled"
              className={classes.formControl}
            >
             
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

      <InputLabel style={{marginLeft:'0.8rem'}} id="resumo">Resumo</InputLabel>
      <MDEditor
        value={resumo}
        onChange={setResumo}
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

export default UpdateFormCurso;
