import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategoria } from "../../../../actions/categoriaActions";
import { findCursosAsCategory } from "../../../../actions/cursoActions";
import { createPost } from "../../../../actions/postActions";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import MessageBox from "../../../core/MessageBox/MessageBox";
import Selector from "../PostFilter/Selector/Selector";
import useStyles from "./styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router";
import { POST_CREATE_RESET } from "../../../../constants/postConstantes";

function CreateFormPost() {
  const classes = useStyles();
  const history = useHistory()

  const dispatch = useDispatch();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [curso, setCurso] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [cursos, setCursos] = useState(null);

  const postCreate = useSelector((state)=> state.postCreate)
  const {loading, error, data} = postCreate

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

    if (
      (categoria && !curso && !cursos) ||
      (categoria && categoria !== cursosCategoria)
    ) {
      dispatch(findCursosAsCategory(categoria));
    }
  }, [
    categoria,
    categoriaData,
    categorias,
    curso,
    cursos,
    cursosCategoria,
    dispatch,
  ]);

  useEffect(()=>{
    if(data){
      dispatch({type: POST_CREATE_RESET})
      history.push('/aluno/app/forum')
    }
  },[data, dispatch, history])

  useEffect(() => {
    if (cursosData) {
      const cursosbjects = cursosData.map((c) => ({
        name: c.nome,
        value: c.curso_id,
      }));
      setCursos(cursosbjects);
    }
  }, [cursosData]);

  const handleChangeTitulo = (event) => {
    const value = event.target.value;
    setTitulo(value);
  };

  const handleChangeCategoria = (event) => {
    const value = event.target.value;
    setCategoria(value);
  };

  const handleChangeCurso = (event) => {
    const value = event.target.value;
    setCurso(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!titulo) {
      alert("Adicione um titulo para sua pergunta");
    } else if (!categoria) {
      alert("Adicione uma categoria");
    } else
      dispatch(
        createPost({
          titulo: titulo,
          conteudo: conteudo,
          curso: curso,
          categoria: categoria,
        })
      );
  };

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit} className={classes.boxContainer}>
          <Box>
            <InputLabel className={classes.inputLabel}>Titulo *</InputLabel>
            <FormHelperText>Adicione o titulo da sua pergunta</FormHelperText>
            <TextField
              name="titulo"
              variant="outlined"
              color="secondary"
              fullWidth
              onChange={handleChangeTitulo}
              value={titulo}
              required
            />
          </Box>
          <Box>
            <InputLabel className={classes.inputLabel}>Corpo</InputLabel>
            <FormHelperText>
              Adicione toda a informação necessária para que as pessoas
              compreendam a sua pergunta
            </FormHelperText>
            <MDEditor value={conteudo} onChange={setConteudo} />
          </Box>
          <Box>
            <InputLabel className={classes.inputLabel}>Tags</InputLabel>
            <FormHelperText>
              Adicione tags para indentificar a sua pergunta
            </FormHelperText>
            <Grid container xs={12}>
              <Grid item>
                {categoriaLoading ? (
                  <LoadingBox />
                ) : categoriaError ? (
                  <MessageBox type="error">{categoriaError}</MessageBox>
                ) : (
                  categorias && (
                    <Selector
                      items={categorias}
                      state={categoria}
                      name="Categoria *"
                      setState={handleChangeCategoria}
                    />
                  )
                )}
              </Grid>
              {categoria && (
                <Grid item>
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
                </Grid>
              )}
            </Grid>
          </Box>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Salvar
          </Button>
        </form>
        {
          loading ? (
            <LoadingBox />
          ) : error && (
            <MessageBox type='error'>
              {error}
            </MessageBox>
          ) 
        }
      </Card>
    </Container>
  );
}

export default CreateFormPost;
