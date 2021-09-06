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

function PostFilter() {
  const classes = useStyles();

  const [categorias, setCategorias] = useState([]);
  const [cursos, setCursos] = useState([]);

  const [categoria, setCategoria] = useState(null);
  const [curso, setCurso] = useState(null);

  const [search, setSearch] = useState(null)

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
  }

  return (
    <Paper className={classes.box}>
      <Grid container spacing={2}>
        <Grid container>
          <Grid container spacing={2}>
            <Grid item>
              <Selector
                items={categorias}
                state={categoria}
                setState={handleChangeCategoria}
              />
              {categoria && (
                <Grid item>
                  <Selector
                    items={cursos}
                    state={curso}
                    setState={handleChangeCurso}
                  />
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
            <InputFilter handleSearch={handleSearch} setState={setSearch} state={search} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PostFilter;
