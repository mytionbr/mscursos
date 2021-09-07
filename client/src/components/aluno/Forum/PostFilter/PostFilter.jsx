import {
  Grid,
  Paper
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
import { findPosts } from "../../../../actions/postActions";

function PostFilter() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const cursoAsCategoria = useSelector((state) => state.cursoAsCategoria);
  const { loading: cursosLoading, error: cursosError, data: cursosData } = cursoAsCategoria;

  const categoriaList = useSelector((state) => state.categoriaList)
  const { loading: categoriaLoading, error: categoriaError, categorias: categoriasData } = categoriaList

  const TODOS = "TODOS";
  const SEM_RESPOSTA = "SEM_RESPOSTA";
  const SOLUCIONADOS = "SOLUCIONADOS";

  const [categorias, setCategorias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [curso, setCurso] = useState(null);
  const [titulo, setTitulo] = useState(null)
  const [opcao, setOpcao] = useState(TODOS);
  
  const handleChangeCategoria = (event) => {
    const value = event.target.value;
    setCategoria(value);
  };

  const handleChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleSelectOption = (value) => {
    setOpcao(value);
  };

  const handleSearch = (event)=>{
      event.preventDefault()
      
      dispatch(
        findPosts({
          titulo: titulo || "",
          categoria: categoria || "",
          curso:curso || "",
          opcao: opcao || "",       
        }))
  }

  useEffect(()=>{
    if(categoriasData && !categorias){
      const categoriaObjects = categoriasData.map(c=>({
        name: c.nome,
        value: c.categoria_id
      }))
      setCategorias(categoriaObjects)
    }
    if(categoria && !curso){
      dispatch(findCursosAsCategory(categoria.value))
    }
    if(cursosData && !cursos){
      const cursosbjects = cursosData.map(c=>({
        name: c.nome,
        value: c.curso_id
      }))
      setCursos(cursosbjects)
    }
  },[categoria, categorias, categoriasData, curso, cursos, cursosData, dispatch])

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
                state={opcao}
                handleClick={() => handleSelectOption(TODOS)}
              />
            </Grid>
            <Grid item>
              <ButtonOption
                title={"Sem resposta"}
                value={SEM_RESPOSTA}
                state={opcao}
                handleClick={() => handleSelectOption(SEM_RESPOSTA)}
              />
            </Grid>
            <Grid item>
              <ButtonOption
                title={"Solucionados"}
                value={SOLUCIONADOS}
                state={opcao}
                handleClick={() => handleSelectOption(SOLUCIONADOS)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
            <InputFilter handleSearch={handleSearch} setState={setTitulo} state={titulo} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostFilter;
