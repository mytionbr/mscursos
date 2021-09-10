import { Box, Grid, Paper } from "@material-ui/core";
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
import { listCategoria } from "../../../../actions/categoriaActions";

function PostFilter() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const cursoAsCategoria = useSelector((state) => state.cursoAsCategoria);
  const {
    loading: cursosLoading,
    error: cursosError,
    data: cursosData,
    categoria: cursosCategoria,
  } = cursoAsCategoria;

  const categoriaList = useSelector((state) => state.categoriaList);
  const {
    loading: categoriaLoading,
    error: categoriaError,
    categorias: categoriaData,
  } = categoriaList;

  const TODOS = "TODOS";
  const SEM_RESPOSTA = "SEM_RESPOSTA";
  const SOLUCIONADOS = "SOLUCIONADOS";

  const [categorias, setCategorias] = useState(null);
  const [cursos, setCursos] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [curso, setCurso] = useState(null);
  const [titulo, setTitulo] = useState(null);
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

  const handleSearch = (event) => {
    event.preventDefault();

    dispatch(
      findPosts({
        titulo: titulo || "",
        categoria: categoria || "",
        curso: curso || "",
        opcao: opcao || "",
      })
    );
  };

  useEffect(() => {
    if (!categoriaData) {
      dispatch(listCategoria());
    }
    if (categoriaData && !categorias) {
      const categoriaObjects = categoriaData.map((c) => ({
        name: c.nome,
        value: c.categoria_id,
      }));

      setCategorias(categoriaObjects);
    }

    if ((categoria && !curso && !cursos) || categoria !== cursosCategoria) {
      dispatch(findCursosAsCategory(categoria));
    }
  }, [
    categoria,
    categorias,
    categoriaData,
    curso,
    cursos,
    cursosData,
    dispatch,
    cursosCategoria,
  ]);

  useEffect(() => {
    if (cursosData) {
      const cursosbjects = cursosData.map((c) => ({
        name: c.nome,
        value: c.curso_id,
      }));
      setCursos(cursosbjects);
    }
  }, [cursosData]);

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        <Box className={classes.container}>
          <Box>
            {categoriaLoading ? (
              <LoadingBox />
            ) : categoriaError ? (
              <MessageBox type="error">{categoriaError}</MessageBox>
            ) : (
              categorias && (
                <Selector
                  items={categorias}
                  state={categoria}
                  name="Categoria"
                  setState={handleChangeCategoria}
                />
              )
            )}
          </Box>
          {categoria && (
            <Box >
              {cursosLoading ? (
                <LoadingBox />
              ) : cursosError ? (
                <MessageBox type="error">{cursosError}</MessageBox>
              ) : (
                cursos && (
                  <Selector
                    items={cursos}
                    state={curso}
                    name={"Curso"}
                    setState={handleChangeCurso}
                  />
                )
              )}
            </Box>
          )}
        </Box>
        <Box className={[classes.container,classes.space]}>
          <Box item>
            <ButtonOption
              title={"Todos"}
              value={TODOS}
              state={opcao}
              handleClick={() => handleSelectOption(TODOS)}
            />
          </Box>
          <Box item>
            <ButtonOption
              title={"Sem resposta"}
              value={SEM_RESPOSTA}
              state={opcao}
              handleClick={() => handleSelectOption(SEM_RESPOSTA)}
            />
          </Box>
          <Box item>
            <ButtonOption
              title={"Solucionados"}
              value={SOLUCIONADOS}
              state={opcao}
              handleClick={() => handleSelectOption(SOLUCIONADOS)}
            />
          </Box>
        </Box>
      </Box>

      <Grid>
        <InputFilter
          handleSearch={handleSearch}
          setState={setTitulo}
          state={titulo}
        />
      </Grid>
    </Paper>
  );
}

export default PostFilter;
