import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SearchCursoCard from "./SearchCursoCard/SearchCursoCard";
import useStyles from "./styles";
function SearchCursoList() {
  const classes = useStyles();

  const cursoFind = useSelector((state) => state.cursoFind);
  const { data } = cursoFind;

  return (
    <Grid container spacing={2} direction="column">
      {data.cursos.map((curso) => (
        <Grid item>
          <SearchCursoCard
            name={curso.nome}
            categoriaId={curso.categoria_id}
            slug={curso.slug}
            description={curso.descricao}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchCursoList;
