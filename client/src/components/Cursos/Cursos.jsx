import React, { useState } from "react";
import Curso from "./Curso/Curso";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch } from "react-redux";
import { findCursos } from "../../actions/cursoActions";
import MessageBox from "../core/MessageBox/MessageBox";
import { Container, Grid } from "@material-ui/core";
import scrollTo from "../../utils/scrollTo";

function Cursos({ data, localization = "" }) {
  const [state, setState] = useState(data.cursos);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePagination = (event, value) => {
    scrollTo()
    dispatch(
      findCursos({
        nome: data.params.nome || "",
        categorias: data.params.categoria
          ? Array(...data.params.categoria)
          : [],
        pagination: value,
      })
    );
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {state.length > 0 ? (
            state.map((curso, index) => (
              <Grid item className={classes.grid}>
                <Curso curso={curso} localization={localization} />
              </Grid>
            ))
          ) : (
            <MessageBox type="info">Nenhum curso encontrado</MessageBox>
          )}
        </Grid>
        <div className={classes.row}>
          <Pagination
            className={classes.pagination}
            page={data.page}
            count={data.totalPages}
            color="secondary"
            onChange={handlePagination}
          />
        </div>
      </Container>
    </>
  );
}

export default Cursos;
