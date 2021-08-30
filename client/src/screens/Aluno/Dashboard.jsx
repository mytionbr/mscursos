import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Helmet from "react-helmet";
import CursoCard from "../../components/aluno/dashboard/CursoCard/CursoCard";
import ListCursosDashboard from "../../components/aluno/dashboard/ListCursosDashboard/ListCursosDashboard";
import ListCursoSecondary from "../../components/aluno/dashboard/ListCursoSecondary/ListCursoSecondary";
import ToolbarPage from "../../components/aluno/dashboard/ToolbarPage/ToolbarPage";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/core/LoadingBox/LoadingBox";
import MessageBox from "../../components/core/MessageBox/MessageBox";
import { findCursos } from "../../actions/alunoActions";

function Dashboard() {
  const history = useHistory();

  const dispatch = useDispatch();
  const alunoFindCursos = useSelector((state) => state.alunoFindCursos);
  const { loading, error, data } = alunoFindCursos;

  const cursos = data || [];

  useEffect(() => {
    dispatch(findCursos());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | mscursos </title>
      </Helmet>
      <ToolbarPage title={"Dashboard"} />
      <Box
        style={{
          minHeight: "100%",
          padding: "2rem 0",
        }}
      >
        <Container>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox type="error">{error}</MessageBox>
          ) : cursos.length > 0 ? (
            <Grid container spacing={4} justifyContent={"space-between"}>
              <Grid item lg={5} sm={12} xl={5} xs={12}>
                <Typography align={"left"} gutterBottom variant="h5">
                  Curso atual:
                </Typography>
                <CursoCard
                  name={cursos[0].nome}
                  percent={cursos[0].progresso}
                  size="primary"
                  categoriaId={cursos[0].categoria_id}
                  slug={cursos[0].slug}
                />
              </Grid>
              <Grid
                item
                lg={6}
                sm={12}
                xl={6}
                xs={12}
                spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {cursos.length > 1 ? (
                  <>
                    <Typography align={"left"} gutterBottom variant="h5">
                      Últimos cursos:
                    </Typography>
                    <ListCursoSecondary
                      cursos={data.slice(1,5)}
                    />
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <ListCursosDashboard cursos={cursos} />
              </Grid>
            </Grid>
          ) : (
            <MessageBox type="info">
              O aluno ainda não se matriculou em nenhum curso
            </MessageBox>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
