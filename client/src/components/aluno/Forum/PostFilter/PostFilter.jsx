import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Paper,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Selector from "./Selector/Selector";
import ButtonOption from "./ButtonOption/ButtonOption";
import InputFilter from "./InputFilter/InputFilter";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import { findCursosAsCategory } from "../../../../actions/cursoActions";

function PostFilter() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const postFind = useSelector((state) => state.postFind);
  const { loading, error, data } = postFind;

  const cursoAsCategoria = useSelector((state) => state.cursoAsCategoria);
  const { loading: cursosLoading, error: cursosError, data: cursosData } = cursoAsCategoria;

  const categoriaList = useSelector((state) => state.categoriaList)
  const { loading: categoriaLoading, error: categoriaError, categorias: categoriasData } = categoriaList

  const [categorias, setCategorias] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [categoria, setCategoria] = useState(null);
  const [curso, setCurso] = useState(null);

  const [title, setTitle] = useState(null)

  const TODOS = "TODOS";
  const SEM_RESPOSTA = "SEM_RESPOSTA";
  const SOLUCIONADOS = "SOLUCIONADOS";

  const [option, setOption] = useState(TODOS);

  const handleChangeCategoria = (event) => {
    const value = event.target.value;
    setCategoria(value);
  };

  const handleChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleSelectOption = (value) => {
    setOption(value);
  };

  const handleSearch = (event)=>{
      event.preventDefault()
      findPosts({
        titulo: title || "",
        categoria: categoria
          ? Array(...categoria)
          : [],
        curso: curso || '',
        opcao: option || ''
      })
  }

  useEffect(()=>{
    if(categoriasData){
      const categoriaObjects = categoriasData.map(c=>({
        name: c.nome,
        value: c.categoria_id
      }))
      setCategorias(categoriaObjects)
    }
    if(categoria){
      dispatch(findCursosAsCategory(categoria.value))
    }
  },[categoria, categoriasData, dispatch])

  return (
    <Paper className={classes.box}>
      <Grid container spacing={2}>
        <Grid container>
          <Grid container spacing={2}>
            <Grid item>
              {
                categoriaLoading ? (
                  <LoadingBox />
                ) : categoriaError ? (
                  <MessageBox type="error">
                    {categoriaError}
                  </MessageBox>
                ) : (
                    <Selector
                    items={categorias}
                    state={categoria}
                    setState={handleChangeCategoria}
                  />
                )
              }
              {categoria && (
                <Grid item>
                  {
                    cursosLoading ? (
                      <LoadingBox />
                    ) : cursosError ? (
                      <MessageBox type="error">
                        {cursosError}
                      </MessageBox>
                    ) : cursos && (
                      <Selector
                      items={cursos}
                      state={curso}
                      setState={handleChangeCurso}
                    />
                    )
                  }
                   </Grid>
                 
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonOption
                title={"Todos"}
                value={TODOS}
                state={option}
                handleClick={() => handleSelectOption(TODOS)}
              />
            </Grid>
            <Grid item>
              <ButtonOption
                title={"Sem resposta"}
                value={SEM_RESPOSTA}
                state={option}
                handleClick={() => handleSelectOption(SEM_RESPOSTA)}
              />
            </Grid>
            <Grid item>
              <ButtonOption
                title={"Solucionados"}
                value={SOLUCIONADOS}
                state={option}
                handleClick={() => handleSelectOption(SOLUCIONADOS)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
            <InputFilter handleSearch={handleSearch} setState={setTitle} state={title} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostFilter;
