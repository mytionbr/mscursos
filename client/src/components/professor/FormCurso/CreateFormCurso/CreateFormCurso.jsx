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
import { listCategoria } from "../../../../actions/categoriaActions";
import MessageBox from '../../../core/MessageBox/MessageBox';
import LoadingBox from '../../../core/LoadingBox/LoadingBox';

import useStyles from "./styles";
import { createCurso } from "../../../../actions/cursoActions";
import { useHistory } from 'react-router-dom'
import { CURSO_CREATE_RESET } from "../../../../constants/cursoConstants";

import MDEditor from '@uiw/react-md-editor';

function CreateFormCurso(props) {
  const classes = useStyles();

  const history = useHistory()

  const dispatch = useDispatch();
  const categoriaList = useSelector((state) => state.categoriaList);
  const cursoCreated = useSelector((state) => state.cursoCreate);
  const { loading, error, success } = cursoCreated;

  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = categoriaList;

  useEffect(() => {
    dispatch(listCategoria());
  }, [dispatch]);

  useEffect(()=>{
    if (success) {
        dispatch({type:CURSO_CREATE_RESET})
        history.push('/professor/app/cursos')
    }
  },[dispatch, history, success])

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
    dispatch(createCurso(
        {
            nome: nome,
            descricao: descricao, 
            categoria_id: categoria,
            resumo: resumo
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
        
        {loadingCategorias ? (
          <LoadingBox />
        ) : errorCategorias ? (
          <MessageBox type="error">{errorCategorias}</MessageBox>
        ) : (
          <FormControl  color="secondary" variant="filled" className={classes.formControl}>
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

export default CreateFormCurso;
